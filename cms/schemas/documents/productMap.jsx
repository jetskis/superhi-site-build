import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {defineField, defineType} from 'sanity'
import {getPriceRange} from '../../utils/getPriceRange'

const GROUPS = [
  {
    name: 'product',
    title: 'Product',
    default: true
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync',
    icon: ShopifyIcon,
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'productMap',
  title: 'Product Map',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: ProductHiddenInput,
      },
      group: GROUPS.map((group) => group.name),
      // hidden: ({parent}) => {
      //   const isActive = parent?.store?.status === 'active'
      //   const isDeleted = parent?.store?.isDeleted
      //   return !parent?.store || (isActive && !isDeleted)
      // },
    }),
    // Title (proxy)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'product'
    }),
    defineField({
      name: 'parentProduct',
      title: 'Product Style',
      description: 'This assignment happens automatically, but if you need to adjust it do so here.',
      type: 'reference',
      group: 'product',
      to: { type: 'productLanding' },
    }),
    defineField({
      name: 'products',
      title: 'Retail Products',
      description:
        'The site will only use the first reference, you can fetch the amazon/standard here to quickly switch the active product',
      type: 'array',
      group: 'product',
      of: [{type: 'reference', to: {type: 'product'}}],
    }),
    defineField({
      name: 'colorWay',
      title: 'Color Way',
      type: 'reference',
      group: 'product',
      to: { type: 'colorType' },
    }),
    defineField({
      name: 'shopifyImages',
      title: 'Shopify Images',
      type: 'array',
      group: 'shopifySync',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.shopify',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{field: 'store.title', direction: 'asc'}],
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{field: 'store.title', direction: 'desc'}],
    },
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'desc'}],
    },
    {
      name: 'priceAsc',
      title: 'Title (Lowest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'shopifyImages',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'title',
      variants: 'store.variants',
    },
    prepare(selection) {
      const {isDeleted, options, previewImageUrl, priceRange, status, title, variants} = selection

      const optionCount = options?.length
      const variantCount = variants?.length

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options',
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        description: description.join(' / '),
        // subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={true}
            isDeleted={false}
            type="product"
            url={previewImageUrl[0]}
            title={title}
          />
        ),
      }
    },
  },
})
