import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {getExtension} from '@sanity/asset-utils'
import pluralize from 'pluralize-esm'
import CollectionHiddenInput from '../../components/inputs/CollectionHidden'
import ShopifyIcon from '../../components/icons/Shopify'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

import { COLORS } from '../../constants'

const GROUPS = [
  {
    name: 'theme',
    title: 'Theme',
  },
  {
    default: true,
    name: 'editorial',
    title: 'Editorial',
  },
  {
    name: 'products',
    title: 'Products'
  },
  {
    name: 'seo',
    title: 'SEO',
  },
]

export default defineType({
  name: 'collaboration',
  title: 'Collaboration',
  type: 'document',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Product hidden status
    defineField({
      name: 'hidden',
      type: 'string',
      components: {
        field: CollectionHiddenInput,
      },
      hidden: ({parent}) => {
        const isDeleted = parent?.store?.isDeleted
        return !isDeleted
      },
    }),
    // Title (proxy)
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'editorial',
    }),
    // Slug (proxy)
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'editorial',
      options: {source: 'title'},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'richText',
      group: 'editorial'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'shopifyImage',
      group: 'theme',
    }),
    // Vector
    defineField({
      name: 'vector',
      title: 'Vector artwork',
      type: 'shopifyImage',
      description: 'Displayed in collection links using color theme',
      options: {
        accept: 'image/svg+xml',
      },
      group: 'theme',
      validation: (Rule) =>
        Rule.custom((image) => {
          if (!image?.asset?._ref) {
            return true
          }

          const format = getExtension(image.asset._ref)

          if (format !== 'svg') {
            return 'Image must be an SVG'
          }
          return true
        }),
    }),
    defineField({
      name: 'bgColor',
      title: 'Background color',
      type: 'color',
      description: 'Displayed in collection links using color theme',
      group: 'theme',
      options: {
        colorList: COLORS,
      }
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        { type: 'reference', to: { type: 'productMap' }}
      ],
      group: 'products'
    }),
    // Show hero
    defineField({
      name: 'showHero',
      title: 'Show hero',
      type: 'boolean',
      description: 'If disabled, page title will be displayed instead',
      group: 'editorial',
    }),
    // // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.collection',
      hidden: ({document}) => !document?.showHero,
      group: 'editorial',
    }),
    // // Modules
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      description: 'Editorial modules to associate with this collection',
      of: [
        {type: 'module.callout'},
        {type: 'module.callToAction'},
        {type: 'module.image'},
        {type: 'module.instagram'},
      ],
      group: 'editorial',
    }),
    // SEO
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
  ],
  preview: {
    select: {
      imageUrl: 'store.imageUrl',
      isDeleted: 'store.isDeleted',
      rules: 'store.rules',
      title: 'title',
    },
    prepare(selection) {
      const {imageUrl, isDeleted, rules, title} = selection
      const ruleCount = rules?.length || 0

      return {
        media: (
          <ShopifyDocumentStatus
            isDeleted={isDeleted}
            type="collection"
            url={imageUrl}
            title={title}
          />
        ),
        subtitle: ruleCount > 0 ? `Automated (${pluralize('rule', ruleCount, true)})` : 'Manual',
        title,
      }
    },
  },
})
