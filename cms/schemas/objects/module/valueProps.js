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
  name: 'module.valueProps',
  title: 'Value Props',
  type: 'object',
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    // Product hidden status
    defineField({
      name: 'values',
      title: 'Vale Props',
      type: 'array',
      group: 'editorial',
      of: [
        {
          name: 'value',
          type: 'object',
          title: 'Value Prop',
          fields: [
            {
              title: 'Icon',
              type: 'shopifyImage',
              name: 'image'
            },
            {
              title: 'Title',
              type: 'string',
              name: 'title',
            },
            {
              title: 'Description',
              type: 'string',
              name: 'description'
            }
          ]
        }
      ]
    }),
  ],
  preview: {
    select: {
      values: 'values'
    },
    prepare(selection) {
      const { values } = selection
      return {
        title: 'Value Props',
        subtitle: values[0]?.title
      }
    },
  },
})
