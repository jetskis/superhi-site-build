import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

import { COLORS } from '../../../constants'

export default defineField({
  name: 'module.reviewHighlights',
  title: 'Review Highlights',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name:'bgColor',
      title: 'Background Color',
      type: 'color',
      options: {
        colorList: COLORS,
      }
    }),
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [
        {
          type: 'object',
          name: 'review',
          title: 'review',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string'
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string'
            },
            {
              name: 'body',
              title: 'Body',
              type: 'text'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      groups: 'groups',
      url: 'url',
    },
    prepare(selection) {
      // const {groups} = selection
      return {
        title: 'Reviews',
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
