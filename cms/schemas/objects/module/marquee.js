import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

import { COLORS } from '../../../constants'

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
]

export default defineType({
  name: 'module.marquee',
  title: 'Marquee',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Product hidden status
    defineField({
      name: 'marquee',
      title: 'Marquee',
      type: 'array',
      group: 'editorial',
      of: [
        {
          type: 'string',
        }
      ]
    }),

    {
      name: 'bgColor',
      title: 'Background Color',
      description: 'Will use background color of adventure report if not set',
      type: 'color',
      group: 'theme',
      options: {
        colorList: COLORS
      },
    },
  ],
  preview: {
    select: {
      marquee: 'marquee'
    },
    prepare(selection) {
      const { marquee } = selection
      return {
        title: 'Marquee',
        subtitle: marquee[0]
      }
    },
  },
})
