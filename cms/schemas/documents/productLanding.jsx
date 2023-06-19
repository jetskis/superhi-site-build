import React from 'react'
import Emoji from 'a11y-react-emoji'

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🛬" />

export default {
	name: 'productLanding',
	title: 'Product Landing',
	icon: Icon,
	type: 'document',
	groups: [
		{name: 'main', title: 'Main'},
		{name: 'details', title: 'Details', default: true},
		{name: 'shop', title: 'Shop'},
		{name: 'images', title: 'Images'},
		{name: 'voting', title: 'Voting'},
		{name: 'seo', title: 'SEO'},
		{name: 'internal', title: 'Internal'},
	],
	fieldsets: [
		{ 
			name: 'details', 
			title: 'General Details',
			options: {
				collapsible: true, // Makes the whole fieldset collapsible
				collapsed: true,
			}
		},
		{ 
			name: 'spec', 
			title: 'Spec',
			options: {
				collapsible: true, // Makes the whole fieldset collapsible
				collapsed: true,
			}
		},
		{ 
			name: 'values', 
			title: 'Values',
			options: {
				collapsible: true, // Makes the whole fieldset collapsible
				collapsed: true,
			}
		},
	],
	fields: [
		//
		// === Main ===
		//

		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			group: 'main',
			validation: Rule => Rule.required(),
		},
		{
      name: 'productLink',
      title: 'Main Reference',
      description:
        'This sets the default slug for navigating to the core product, can be overrode below',
      type: 'reference',
      // hidden: true,
      to: [{type: 'productMap'}],
      group: 'main',
      validation: Rule => Rule.required(),
    },


		{
			name: 'addToCartOverride',
			title: 'Add to Cart Text Override',
			description: 'Ex: "Preorder Now"',
			type: 'string',
			group: 'main'
		},

		{
			name: 'staticBuild',
			type: 'boolean',
			title: 'Static Build',
			description:
				'If this is checked, it instructs the server to build a static copy of the page. Use this for high traffic pages and products.',
			group: 'main',
		},

		{
      name: 'items',
      title: 'Product Associations',
      type: 'array',
			group: 'main',
      of: [
        {
          type: 'reference',
          name: 'productMap',
          to: {type: 'productMap'},
        },
        {
          title: 'Divider Block',
          name: 'dividerBlock',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'string',
            },
            // {
            //   name: 'displaySetting',
            //   title: 'Display Setting',
            //   description: 'What site does this show up on?',
            //   type: 'string',
            //   options: {
            //     list: [
            //       {title: 'Both', value: 'both'},
            //       {title: 'Storefront Only', value: 'storefront'},
            //       {title: 'Wholesale Only', value: 'wholesale'},
            //     ],
            //     layout: 'dropdown',
            //   },
            //   initialValue: 'both',
            // },
          ],
        },
			]
		},


		{
			name: 'product',
			title: 'Product',
			type: 'reference',
			to: [{type: 'product'}],
			group: 'main',
			// validation: Rule => Rule.custom((field, context) => {

			// 	if (!field && context.document.fakeProduct === true) {
			// 		console.log('not required')
			// 		return true
			// 	} else {
			// 		console.log('required')
			// 		return true
			// 	}
			// 	}
			// ),
			hidden: ({document}) => document?.fakeProduct === true,
		},

		// {
		// 	name: 'invertHeaderColor',
		// 	type: 'boolean',
		// 	title: 'Invert Header Color',
		// 	description:
		// 		'Inverts the header at the top of the page. Use this for hero images with dark backgrounds.',
		// 	group: 'main',
		// },
		{
			name: 'productDescription',
			type: 'richText',
			title: 'Product Description',
			group: 'main'
		},
		{
			type: 'productComponentList',
			name: 'components',
			title: 'Components',
			group: 'main',
		},

		//
		// === details ===
		//

		{
			name: 'description',
			title: 'Description',
			description: 'Shows up on CLP pages when in style view',
			type: 'richText',
			group: 'details',
		},

		// {
		// 	name: 'shortDescription',
		// 	title: 'Short Description',
		// 	type: 'richText',
		// 	description:
		// 		'This should be a short description, used on product tiles.',
		// 	group: 'details',
		// },

		// {
		// 	name: 'showShortDescriptionInHero',
		// 	type: 'boolean',
		// 	title: 'Show Short Description in Hero',
		// 	group: 'details',
		// },

		// {
		// 	name: 'showTagsInHero',
		// 	type: 'boolean',
		// 	title: 'Show Tags in Hero',
		// 	group: 'details',
		// },

		// {
		// 	name: 'batchNote',
		// 	title: 'Batch Note',
		// 	type: 'richText',
		// 	group: 'details',
		// },

		// {
		// 	name: 'shippingNote',
		// 	title: 'Shipping Note',
		// 	type: 'richText',
		// 	group: 'details',
		// },

		{
			name: 'relatedProducts',
			title: 'Related Products',
			type: 'array',
			description: 'Use these to show the products in a bundle.',
			of: [
				{
					name: 'product',
					title: 'Product',
					type: 'reference',
					to: [{type: 'productLanding'}],
				},
			],
		},
		{
			name: 'details',
			type: 'object',
			title: 'Details',
			group: 'details',
			fieldset: 'details',
			description: 'This drawer extends to all the child products, in order to customize the details you can simply go into a nested product and override it, those products will still get the additional drawers unless you override those as well.',

			fields: [
				{
					name: 'title',
					title: 'Title',
					type: 'string',
				},
				{
					name: 'description',
					title: 'Description',
					type: 'richText',
				},
			]
		},
		{
			name: 'Specifications',
			type: 'array',
			title: 'Specifications',
			group: 'details',
			fieldset: 'spec',
			description: 'Shows up in the bundle Drawer',

			of: [
				{
					type: 'object',
					name: 'spec',
					title: 'Spec',
					fields: [
						{
							name: 'name',
							title: 'Name',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'string',
						},
					]
				}
			]
		},
		{
			name: 'valueProps',
			type: 'array',
			title: 'Value Props',
			group: 'details',
			fieldset: 'values',
			description: 'Shows up in a marquee on the PDP and in the bundle expanded drawer.',

			of: [
				{
					type: 'object',
					name: 'value',
					title: 'Value',
					fields: [
						{
							name: 'icon',
							title: 'Icon',
							type: 'shopifyImage',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'string',
						},
					]
				}
			]
		},
		{
			name: 'drawers',
			title: 'Additional Drawers',
			type: 'array',
			of: [
				{
					name: 'drawer',
					title: 'Drawer',
					type: 'object',
					fields: [
						{
							name: 'title',
							title: 'Title',
							type: 'string',
						},
						{
							name: 'description',
							title: 'Description',
							type: 'richText',
						},
					],
					preview: {
						select: {
							title: 'title',
						},
						prepare({title, media}) {
							return {
								title,
							}
						},
					},
				},
				{
					name: 'reviewHighlights',
					title: 'Review Highlights',
					type: 'object',
					fields: [
						{
							name: 'title',
							type: 'string',
							title: 'Drawer Title'
						},
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
							subtitle: 'reviews.0.title'
						},
						prepare({ subtitle }) {
							return {
								title: 'Review Highlights',
								subtitle
							}
						}
					}
				}
			],
			group: 'details',
		},

		//
		// === Shop ===
		//

		// {
		// 	name: 'variantDropdowns',
		// 	title: 'Variant Dropdowns',
		// 	type: 'array',
		// 	of: [
		// 		{
		// 			name: 'dropdown',
		// 			title: 'Dropdown',
		// 			type: 'object',
		// 			description:
		// 				'Add a variant select to change the selection UI of a given variant option. Default is a radio.',
		// 			icon: ColumnIcon,
		// 			fields: [
		// 				{
		// 					name: 'optionTitle',
		// 					title: 'Option Title',
		// 					type: 'string',
		// 					validation: Rule => Rule.required(),
		// 				},
		// 				{
		// 					name: 'optionType',
		// 					title: 'Option Type',
		// 					type: 'string',
		// 					initialValue: 'dropdown',
		// 					options: {
		// 						list: [
		// 							{title: 'Radio', value: 'radio'},
		// 							{title: 'Button', value: 'button'},
		// 						],
		// 						layout: 'radio',
		// 					},
		// 					validation: Rule => Rule.required(),
		// 				},
		// 				{
		// 					name: 'values',
		// 					title: 'Values',
		// 					type: 'array',
		// 					description:
		// 						'Add value detailsdata for each variant option.',
		// 					of: [
		// 						{
		// 							name: 'value',
		// 							title: 'Value',
		// 							type: 'object',
		// 							icon: ColumnIcon,
		// 							fields: [
		// 								{
		// 									name: 'valueTitle',
		// 									title: 'Value Title',
		// 									type: 'string',
		// 									validation: Rule => Rule.required(),
		// 								},
		// 								{
		// 									name: 'subtitle',
		// 									title: 'Subtitle',
		// 									type: 'string',
		// 									validation: Rule => Rule.required(),
		// 								},
		// 							],
		// 							preview: {
		// 								select: {
		// 									title: 'valueTitle',
		// 									subtitle: 'subtitle',
		// 								},
		// 								prepare({title, subtitle}) {
		// 									return {
		// 										title,
		// 										subtitle,
		// 										media: <ColumnIcon />,
		// 									}
		// 								},
		// 							},
		// 						},
		// 					],
		// 				},
		// 			],
		// 			preview: {
		// 				select: {
		// 					title: 'optionTitle',
		// 					subtitle: 'optionType',
		// 				},
		// 				prepare({title, subtitle}) {
		// 					return {
		// 						title,
		// 						subtitle,
		// 						media: <ColumnIcon />,
		// 					}
		// 				},
		// 			},
		// 		},
		// 	],
		// 	group: 'shop',
		// },

		// {
		// 	name: 'subscriptionOptions',
		// 	title: 'Subscription Options',
		// 	type: 'array',
		// 	description: 'Add value detailsdata for each subscription option.',
		// 	of: [
		// 		{
		// 			name: 'subscriptionOption',
		// 			title: 'Subscription Option',
		// 			type: 'object',
		// 			icon: ColumnIcon,
		// 			fields: [
		// 				{
		// 					name: 'title',
		// 					title: 'Title',
		// 					type: 'string',
		// 					validation: Rule => Rule.required(),
		// 				},
		// 				{
		// 					name: 'titleOverride',
		// 					title: 'Title Override',
		// 					type: 'string',
		// 					validation: Rule => Rule.required(),
		// 				},
		// 				{
		// 					name: 'subtitle',
		// 					title: 'Subtitle',
		// 					type: 'string',
		// 					validation: Rule => Rule.required(),
		// 				},
		// 			],
		// 			preview: {
		// 				select: {
		// 					title: 'title',
		// 					subtitle: 'subtitle',
		// 				},
		// 				prepare({title, subtitle}) {
		// 					return {
		// 						title,
		// 						subtitle,
		// 						media: <ColumnIcon />,
		// 					}
		// 				},
		// 			},
		// 		},
		// 	],
		// 	group: 'shop',
		// },

		//
		// === Images ===
		//
		{
			name: 'mainImage',
			title: 'Main Image (Tile)',
			description:
				'This should be a 2000x2000 PNG with a transparent background. Use the given product templates to build this.',
			type: 'shopifyImage',
			group: 'images',
			// validation: Rule => Rule.required(),
		},

		{
			name: 'productVideo',
			title: 'Product Video (Tile)',
			description:
				'This should be a 2000x2000 PNG with a transparent background. Use the given product templates to build this.',
			type: 'shopifyVideo',
			group: 'images',
		},

		{
			name: 'pairingImage',
			title: 'Pairing Image',
			description:
				'This should be a 2000x2000 PNG with a transparent background. Use the given product templates to build this.',
			type: 'shopifyImage',
			group: 'images',
		},

		// {
		// 	name: 'images',
		// 	title: 'Images (Hero Carousel)',
		// 	description:
		// 		'This should be a 2000x2000 PNG with a transparent background. These images will show up in order on the product detail page. Use the given product templates to build this.',
		// 	type: 'array',
		// 	of: [{type: 'imageAlt'}],
		// 	group: 'images',
		// 	validation: Rule => Rule.required(),
		// },

		// {
		// 	name: 'backgroundImage',
		// 	title: 'Background Image (Hero Carousel)',
		// 	description: 'This should be a 3000x2000 JPG.',
		// 	type: 'imageAlt',
		// 	group: 'images',
		// 	validation: Rule => Rule.required(),
		// },

		//
		// === SEO ===
		//
		{
			type: 'seo',
			name: 'seo',
			group: 'seo',
		},

		//
		// === Internal ===
		//

		{
			name: 'notes',
			title: 'Notes',
			type: 'richText',
			group: 'internal',
		},
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'slug.current',
			media: 'mainImage',
		},
		prepare({title, subtitle, media}) {
			return {
				title,
				subtitle,
				media: media || <Icon />,
			}
		},
	},
}
