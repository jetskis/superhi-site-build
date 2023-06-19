import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import { COLORS } from '../../../constants'

export default defineField({
  name: 'module.infoCarousel',
  title: 'Informational Carousel',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
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
            }
          ]
        }
      ]
    }),

    defineField({
      name: 'bgColor', 
      title: 'Background Color',
      type: 'color',
      options: {
        colorList: COLORS
      }
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
        subtitle: 'Informational Carousel'
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})

// Path: cms/schemas/objects/module/infoCarousel.js
