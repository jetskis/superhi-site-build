import {json} from '@shopify/remix-oxygen'
import {createClient} from '@sanity/client'

const encoder = new TextEncoder()

export const loader = () => {
  return json({
    message: 'api route'
  })
}

export const action = async ({
  request,
  context
}) => {
  const rawBody = await request.text()
  if (request.method !== 'POST' || !rawBody) {
    return json({ error: 'Method not allowed' }, 405)
  }

	const hmac = request.headers.get('x-shopify-hmac-sha256') // Shopify HMAC
  const secretKey = encoder.encode(context.env.SHOPIFY_WEBHOOK_SIGNATURE)
  const signature = base64ToArrayBuffer(hmac)
  const payload = encoder.encode(rawBody)

  const key = await crypto.subtle.importKey(
    "raw",
    secretKey,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['verify']
  )

  const verified = await crypto.subtle.verify(
    {name: 'HMAC' },
    key,
    signature,
    payload
  )

  if (!verified) {
    return json({ error: 'bad verification' }, 200 )
  }

  const data = JSON.parse(rawBody)

  console.log('the product sync', data.id)
  
  const tagArray = data.tags.split(', ') || []
  const productId = tagArray.filter(item => {
    return /sanity-uniqueid/g.test(item)
  })[0]

  // FIXME: TURN THIS ON FUTURE
  // if (!productId) {
  //   json({ error: 'product missing sanity-id, skip' }, 200)
  // }

  // Define Sanity Client
  const client = createClient({
    projectId: context.env.SANITY_PROJECT_ID,
    dataset: context.env.SANITY_DATASET,
    token: context.env.SANITY_API_TOKEN,
    apiVersion: context.env.SANITY_API_VERSION,
    useCdn: false,
  })


  let tx = client.transaction() // Create the api transaction
  
  //
  // === Product Deletion ===
  //

  if (data.id && !data.title && !data.handle) {
    try {
      const product = {
        _type: 'product',
        _id: data.id.toString(),
        isDeleted: true,
      }

      tx = tx.createIfNotExists(product)
      tx = tx.patch(product._id, p => p.set(product))

      const result = await tx.commit()

      return json({ message: 'product was deleted, updating entry in sanity'}, 200)
    } catch (error) {
      console.log(error)

      return json({ message: 'an internal server error occurred'}, 200)
    }
  }

  console.log('the whole object', data)

  // Define the basic product object
  const product = {
    _type: 'product',
    _id: data.id.toString(),
    store: {
      title: data.title,
      price: data.variants[0].price,
      updatedAt: data.updated_at,
      createdAt: data.created_at,
      slug: {
        _type: 'slug',
        current: data.handle,
      },
      id: data.id,
      vendor: data.vendor,
      productType: data.product_type,
      status: data.status,
      gid: data.admin_graphql_api_id,
      compareAtPrice: data.variants[0].compare_at_price,
      descriptionHtml: data.body_html,
      cents: Number(data.variants[0].price) * 100,
      compareAtCents: Number(data.variants[0].compare_at_price) * 100,
      previewImageUrl: data.images[0]?.src,
      tags: data.tags ? data.tags.split(', ') : undefined,
      shopifyImages: data.images ? data.images.map(i => i.src) : [],
      options: data.options.map(({id, name, position, values}) => ({
        _id: id.toString(),
        _key: id.toString(),
        _type: 'productOption',
        name,
        position,
        values: values.map(value => ({
          _id: value,
          _key: value,
          _type: 'productVariantOptionValue',
          name: value,
        })),
      })),
    }
  }

  console.log('the product we created?', product)


  // FIXME
  //
  // ADD THE PRODUCT SYNC CHECK TO STOP CONSTANT REWRITES
  //
  //


  //
  // === Patch Product ===
  //

  console.log('product to patch via webhook', data.id)

  tx = tx.createIfNotExists(product)
  tx = tx.patch(product._id, p => p.set(product))

  console.log(`Updating/patching Product ${data.id} in Sanity`)

  //
  // === Patch Variants ===
  //

  const productVariants = data.variants.map(variant => ({
    _type: 'productVariant',
    _id: variant.id.toString(),
    store: {
      productGid: data.admin_graphql_api_id,
      id: variant.id,
      status: data.status,
      gid: variant.admin_graphql_api_id,
      title: variant.title,
      createdAt: variant.created_at,
      updatedAt: variant.updated_at,

      productTitle: data.title,
      sku: variant.sku,
      price: variant.price,
      cents: Number(variant.price) * 100,
      option1: variant.option1 ? variant.option1 : undefined,
      option2: variant.option2 ? variant.option2 : undefined,
      option3: variant.option3 ? variant.option3 : undefined,
      previewImageUrl: variant.src,
    }
  }))

  // Create Variant
  productVariants.forEach(variant => {
    tx = tx.createIfNotExists(variant)
    tx = tx.patch(variant._id, p => p.set(variant))
  })

  console.log(
    `Updating/patching Variants ${data.variants
      .map(v => v.id)
      .join(', ')} in Sanity`,
  )

  //
  // === Include variants on product document ===
  //

  tx = tx.patch(product._id, p =>
    p.set({
      variants: data.variants.map(variant => ({
        _type: 'reference',
        _ref: variant.id.toString(),
        _key: variant.id.toString(),
      })),
    }),
  )

  console.log(`Adding variant references to ${data.id} in Sanity`)

  try {
    // Grab the Tag data from Shopify
    const tagArray = data.tags.split(', ') || []
    const productId = tagArray.filter(item => {
      return /sanity-unique-id/g.test(item)
    })[0]
    const productStyle = tagArray.filter(item => {
      return /sanity-style/g.test(item)
    })[0]
    const productColor = tagArray.filter(item => {
      return /sanity-colorway-/g.test(item)
    })[0]
    const colorFam = tagArray.filter(item => {
      return /sanity-colorwayfam-/g.test(item)
    })[0]
    const material = tagArray.filter(item => {
      return /sanity-material-/g.test(item)
    })[0]


    // Handle the Colorway so we can assign that to the product

    if (productColor) {
      const color = {
        _type: 'colorType',
        _id: productColor.toString(),
        colorName: productColor.replace('sanity-colorway-', '').replace('-', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
      }
      tx = tx.createIfNotExists(color)
    }

    let colorWF

    if (colorFam) {
      colorWF = {
        _type: 'colorFam',
        _id: colorFam.toString().replace("'", ''),
        colorName: colorFam.replace('sanity-colorwayfam-', '').replace('-', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
      }
      tx = tx.createIfNotExists(colorWF)
    }


    //
    //  === Handle the Product Mapping
    //

    let productMap
    // Create the product mapping, associate the colorway + product created above
    if (productId) {
      let colorWay = null
      let colorFamily = null
      console.log('Create a product map and do all the various handlings:', productId)
      productMap = {
        _type: 'productMap',
        _id: productId.toString(),
        title: `Product Map - ${data.title}`
      }
      if (productColor) {
        colorWay = {
          _type: 'reference',
          _ref: productColor.toString()
        }
      }

      if (colorFam) {
        colorFamily = {
          _type: 'reference',
          _ref: colorWF._id
        }
      }
      const groqProducts = `products`
      console.log('before fetch?')
      // Need to do a lookup on existing product map...
      const existingMap = await client.fetch(`*[_type == "productMap" && _id == "${productId.toString()}"][0] {
        products,
        retailAvailable
      }`).catch(err => console.log('error', err))
      let productArray = []
      let newProduct = [{
        _type: 'reference',
        _ref: data.id.toString(),
        _key: data.id.toString()
      }]
      console.log('existing map?', existingMap)

      if (existingMap) {
        const productExists = existingMap.products.find(item => item._ref === data.id.toString())
        if (!productExists) {
          const oldProducts = existingMap.products || []
          productArray = [
            ...newProduct,
            ...oldProducts
          ]
        } else {
          productArray = [
            ...existingMap.products
          ]
        }
      } else {
        productArray = [
          ...newProduct
        ]
      }

      // Product is not on the sales channel, so lets remove it from the array
      // FIXME: Add Algolia??
      // if (!isProductSalesChannel) {
      //   remove(productArray, {'_ref': data.id.toString() }) // remove item from list

      //   const useIndex = ALGOLIA_INDEX[event.headers['x-shopify-shop-domain']]
      //   const updateIndex = algoliaClient.initIndex(useIndex)
      //   console.log('delete object', data.id.toString(), productId)
      //   updateIndex.deleteObject(productId).then(res => {
      //     console.log('deleted object from algolia', res)
      //   })
      // }

      let updateObject = {
        colorWay,
      }

      let siteObject = {}
      let IMAGE_OBJECT = {}

      // DIVIDE THIS FOR WHOLESALE HOOKUP!
      siteObject = {
        products: productArray,
      }

      /* If there are no images let's not push any data, this should prevent new products from erasing images */
      if (data.images && data.images.length > 0) {
        IMAGE_OBJECT = {
          shopifyImages: data.images ? data.images.map(i => i.src) : []
        }
      }

      updateObject = {
        ...updateObject,
        ...siteObject,
        ...IMAGE_OBJECT
      }

      if (colorFamily) {
        updateObject = {
          ...updateObject,
          colorFamily,
          "seo.initSeo": true // makes sure the seo object is defined
        }
      }

      if (material) {
        updateObject = {
          ...updateObject,
          material: material.replace('sanity-material-', '')
        }
      }

      console.log('the map', productMap)


      tx = tx.createIfNotExists(productMap)
      tx = tx.patch(productMap._id, p => p.set(updateObject))
    }

    // Create a product landing if one does not exist and map the product to it
    if (productStyle) {
      console.log('stlfffy???', productId, productStyle)
      const productLanding = {
        _type: 'productLanding',
        _id: productStyle.toString(),
        title: productStyle.replace('sanity-style-', '').replace('-', ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))),
        productLink: {
          _type: 'reference',
          _ref: productId.toString(),
          _key: productId.toString()
        }
      }

      tx = tx.createIfNotExists(productLanding)

      console.log('stuff?')
      const existingItems = await client.fetch(`*[_type == "productLanding" && _id == "${productStyle.toString()}"][0] {
        items,
        productLink
      }`)

      if (productId) {

        let itemsArray = []
        let newProductMap = [{
          _type: 'productMap',
          _ref: productId.toString(),
          _key: productId.toString()
        }]

        if (existingItems && existingItems.items) {
          // If a product should be rem
          const productExists = existingItems.items.find(item => item._ref === productId.toString())
          if (!productExists) {
            // If we can't find the current item Add it
            const oldItems = existingItems.items || []
            itemsArray = [
              ...newProductMap,
              ...oldItems
            ]
          } else {
            itemsArray = [
              ...existingItems.items
            ]
          }
        } else {
          itemsArray = [
            ...newProductMap
          ]
        }
        tx = tx.patch(productLanding._id, p => p.set({
          items: itemsArray,
        }))
        tx = tx.patch(productMap._id, p => p.set({
          parentProduct: {
            _type: 'reference',
            _ref: productLanding._id
          }
        }))
      }
    }

  } catch (err) {
    return json({ error: 'issue with product mapping + landing'}, 200)
  }

  const result = await tx.commit()
  console.log('result', result)

  return json({ message: result }, 200)
}

function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}