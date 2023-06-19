import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🚧" />;

export default {
	name: 'productComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		{ type: 'module.faqs' },
		{ type: 'module.dynamicCrossShop' },
		{ type: 'module.collaboration' },
		{ type: 'module.image' },
		{ type: 'module.marquee' },
		{ type: 'module.reviews' }
	],
};
