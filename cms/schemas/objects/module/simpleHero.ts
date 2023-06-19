import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'

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
  name: 'module.simpleHero',
  title: 'Simple Hero',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Product hidden status
    defineField({
      name: 'text',
      title: 'Text',
      type: 'richText',
      group: 'editorial'
    }),
    {
      name: 'marqueeText',
      type: 'boolean',
      group: 'editorial',
      title: 'Marquee the Text',
    },
    {
      name: 'image',
      title: 'Optional Image Background',
      type: 'shopifyImage',
      group: 'editorial',
    },
    {
      name: 'bgColor',
      title: 'Background Color',
      description: 'Will use background color of adventure report if not set',
      type: 'color',
      group: 'theme',
      options: {disableAlpha: true},
    },

    {
      name: 'heroSize',
      title: 'Hero Size',
      description: 'Medium is the default aspect ratio size, large is for bigger moments',
      type: 'string',
      group: 'theme',
      options: {
        layout: 'dropdown',
        list: ['small', 'medium', 'large'],
      },
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: 'Standard Hero',
      }
    },
  },
})
