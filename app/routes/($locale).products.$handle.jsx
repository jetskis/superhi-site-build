import { useEffect, Fragment } from 'react'
import { useLoaderData, Link, useLocation, useNavigation, useSearchParams, useMatches, useFetcher, useFetchers } from '@remix-run/react'
import { json } from 'react-router'
import {useKeenSlider} from 'keen-slider/react'

import { Menu } from '@headlessui/react'
import 'keen-slider/keen-slider.min.css'

import {
  SHOPIFY_PRODUCT_QUERY
} from '~/queries/product'

import {
  Money,
  ShopPayButton
} from '@shopify/hydrogen-react'

// import {ProductOptions} from '~/components'

import {
  ProductForm
} from '~/components/product/ProductForm'


const seo = ({data}) => ({
  title: 'Product Page - Superhi Luggage Store',
  description: 'best place to internet',
});

export const handle = {
  seo
};

export const loader = async ({ params, context, request }) => {
  const { handle } = params
  const searchParams = new URL(request.url).searchParams
  const selectedOptions = []

  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value })
  })

  console.log('search', searchParams)

  const { product } = await context.storefront.query(SHOPIFY_PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions
    }
  })
  if (!product?.id) {
    throw new Response(null, { status: 404 })
  }

  const selectedVariant = product.selectedVariant ?? product?.variants?.nodes[0]

  return json({
    handle,
    product,
    selectedVariant,
    analytics: {
      pageType: 'product'
    }
  })
}

function PrintJson({data}) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  )
}

export default function ProductHandle() {
  const { handle, product, selectedVariant, analytics } = useLoaderData()
  const { pathname, search }  = useLocation()
  const [ currentSearchParams ]  = useSearchParams()
  const navigation = useNavigation()
  
  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);
    if (!selectedVariant) {
      return defaultParams;
    }
    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }
    return defaultParams;
  })();


  const searchParams = navigation.location
  ? new URLSearchParams(navigation.location.search)
  : paramsWithDefaults;


  // FIXME: Render the product schema
  const schema = {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: product.title,
		// image: product.images[0].url,
		description: product.hero,
		sku: product.sku,
		mpn: product.sku,
		brand: {
			'@type': 'Thing',
			name: 'Super Luggage',
		},
		offers: {
			'@type': 'Offer',
			url: `https://superluggage.co/products/${product.slug}`,
			priceCurrency: 'USD',
			// price: selectedVariant.price,
			itemCondition: 'https://schema.org/NewCondition',
			availability: 'https://schema.org/InStock',
			seller: {
				'@type': 'Organization',
				name: 'Super Luggage',
			},
		},
	};

  return (
    <div>
			{/* <script type="application/ld+json">{`${JSON.stringify(schema)}`}</script> */}
      <div className='relative w-full'>
        <h2 className='absolute left-1/2 -translate-x-1/2 -top-[60px] text-mono-42'>{product.title}</h2>
        <div className='relative h-[calc(100vh-174px)]'>
          {product.media?.nodes?.length > 1 && (<ImageSlider images={product.media?.nodes} />)}
          <div className='w-[calc(100%-40px)] flex justify-between absolute bottom-12 left-4'>
            <button className='uppercase font-600 text-32'>Info</button>
            {/* <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} /> */}
            {/* <ProductOptions selectedVariant={selectedVariant} options={product.options} /> */}
            {/* <p>Selected Variant: {selectedVariant?.id}</p> */}
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              className="text-xl font-600 text-32"
            />
          </div>
        </div>
        <div className='w-full border-t-2 grid-cols-9 font-600 uppercase items-center border-b-2 grid text-mono-20'>
          <div className='col-span-3 relative text-20 text-center border-none' onChange={(e) => alert(e.currentTarget.value)}>
              
            {product.options.map(({ name, values }) => {
              const currentOptionValue = searchParams.get(name)
              return (
                <Menu>
                  <Menu.Button>{currentOptionValue ? currentOptionValue : `Select ${name}`}</Menu.Button>
                  <Menu.Items className='border left-1/2 -translate-x-1/2 bg-black absolute p-4'>
                    {values.map((value) => {
                      const optionParams = new URLSearchParams(search);
                      const isSelected = currentOptionValue === value
                      optionParams.set(name, value)
                      return (
                        /* Use the `active` state to conditionally style the active item. */
                        <Menu.Item key={value} as={Fragment}>
                          {({ active }) => (
                            <Link
                              preventScrollReset
                              to={`${pathname}?${optionParams.toString()}`}
                              className={`block ${
                                isSelected ? 'text-white' : 'text-primary-green'
                              }`}
                            >
                              {value}
                            </Link>
                          )}
                        </Menu.Item>
                      )}
                    )}
                  </Menu.Items>
                </Menu>
              )
            })}

</div>
          <ProductForm product={product} selectedVariant={selectedVariant} productAnalytics={analytics} variantId={selectedVariant?.id} />
        </div>
        
      </div>
      <div className='p-4'>
        <PrintJson data={product} />
      </div>
    </div>
  )
}

const ImageSlider = ({ images }) => {
  const [sliderRef, slider] = useKeenSlider({
		loop: true,
		drag: true,
		slides: {
			perView: 1.2,
		},
    breakpoints: {
			'(min-width: 800px)': {
				slides: {
					perView: 2
				},
			}
    },
		slideChanged(slider) {
			// setActiveSlideIndex(slider.track.details.rel);
		},
	})
  return (
    <div ref={sliderRef} className="keen-slider h-full absolute w-full">
      {images.map(({ image }) => {
        return (
          <div key={image.id} className="keen-slider__slide">
            <img src={image.url} className='w-full h-full object-contain' />
          </div>
        )
      })}
    </div>
  )
}