import React from 'react'
import { ShopifyVideo } from '../../components/shopify/ShopifyVideo'

export default {
  name: 'shopifyVideo',
  title: 'Image',
  type: 'object',
  components: {
    input: ShopifyVideo
  },
  fields: [
    {
      title: 'url',
      name: 'url',
      type: 'string',
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
        title: media,
        // media: (<img src={media} alt={title} style={{ height: '80px', width: '80px', objectPosition: 'center', objectFit: 'cover' }} />)
      }
    }
  }
}