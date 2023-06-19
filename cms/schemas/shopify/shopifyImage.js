import React from 'react'
import { ShopifyImage } from '../../components/shopify/ShopifyImage'

export default {
  name: 'shopifyImage',
  title: 'Image',
  type: 'object',
  components: {
    input: ShopifyImage
  },
  fields: [
    {
      title: 'url',
      name: 'url',
      type: 'string',
    },
    {
      title: 'Alt Text',
      name: 'altText',
      type: 'string'
    },
    {
      title: 'height',
      name: 'height',
      type: 'number'
    },
    {
      title: 'width',
      name: 'width',
      type: 'number'
    },
    {
      title: 'GID',
      name: 'fileGid',
      type: 'string'
    }
  ],
  preview: {
    select: {
      title: 'altText',
      media: 'url'
    },
    prepare({ title, media }) {
      return {
        title,
        media: (<img src={media} alt={title} style={{ height: '80px', width: '80px', objectPosition: 'center', objectFit: 'cover' }} />)
      }
    }
  }
}