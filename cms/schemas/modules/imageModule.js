import React from 'react';

import { ImageIcon } from '@sanity/icons'

export default {
	name: 'module.image',
	title: 'Image Module',
	icon: ImageIcon,
	type: 'object',
  groups: [
    {
      default: true,
      name: 'main',
      title: 'Main'
    },
    {
      name: 'layout',
      title: 'Layout'
    }
  ],
	fields: [
    
    {
      name: 'image',
      type: 'shopifyImage',
      title: 'Image',
      group: 'main'
    },
	],
	preview: {
		select: {
			title: 'vote.cmsTitle',
			media: 'image',
		},
		prepare: ({ title }) => {
      return {
        title: 'Image Module',
      }
    },
	},
};
