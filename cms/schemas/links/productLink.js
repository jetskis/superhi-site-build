import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="☕️" />;

export default {
	name: 'productLink',
	title: 'Product Link',
	icon: Icon,
	type: 'object',
	fields: [
		{
			name: 'productLanding',
			title: 'Product Landing',
			type: 'reference',
			to: [{type: 'productLanding'}],
			validation: Rule => Rule.required(),
		},
		{
			name: 'title',
			title: 'Title',
			description:
				'This is optional. It will default to the product title.',
			type: 'string',
		},
		{
			name: 'openInNewWindow',
			title: 'Open In New Window',
			type: 'boolean',
			layout: 'checkbox',
		},
	],
	preview: {
		select: {
			title: 'title',
			productTitle: 'productLanding.title',
		},
		prepare: ({title, productTitle}) => ({
			title: title || productTitle,
			media: <Icon />,
		}),
	},
};
