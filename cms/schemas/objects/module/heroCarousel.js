import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import { COLORS } from '../../../constants'

export default defineField({
  name: 'module.heroCarousel',
  title: 'Hero Carousel',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'shopifyImage'
            },
            {
              name: 'body',
              title: 'Body',
              type: 'richText'
            },
            {
              name: 'cta',
              type: 'cta',
              title: 'CTA'
            },
            defineField({
              name: 'bgColor', 
              title: 'Background Color',
              type: 'color',
              options: {
                colorList: COLORS
              }
            }),
            defineField({
              name: 'textColor', 
              title: 'Text Color',
              type: 'color',
              options: {
                colorList: COLORS
              }
            }),
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title,
        subtitle: 'Hero Carousel'
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})


