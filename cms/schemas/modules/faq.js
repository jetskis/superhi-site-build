import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="👟" />;
const ColumnIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="▶️" />;
const NewsletterIcon = () => <Emoji style={{fontSize: '1.5em'}} symbol="💌" />;

export default {
	name: 'faq',
	title: 'FAQ',
	icon: Icon,
	type: 'document',
	groups: [
		{
			default: true,
			title: 'General',
			name: 'general'
		},
	],
	fields: [
		{
			name: 'question',
			title: 'Question',
			type: 'string',
			group: 'general',
			validation: Rule => Rule.required(),
		},
		{
			name: 'answer',
			title: 'Answer',
			type: 'richText',
			group: 'general',
			validation: Rule => Rule.required(),
		},
	],
	preview: {
		select: {
			title: 'question',
		},
		prepare: selection => ({
			...selection,
			media: <Icon />,
		}),
	},
};
