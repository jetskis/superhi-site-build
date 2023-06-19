import React from 'react';
import Emoji from 'a11y-react-emoji';

const Icon = () => <Emoji style={{fontSize: '1.5em'}} symbol="🚧" />;

export default {
	name: 'pageComponentList',
	title: 'Components',
	icon: Icon,
	type: 'array',
	of: [
		{ type: 'module.image' },
		{ type: 'module.faqs' },
		{ type: 'module.dynamicCrossShop' },
		{ type: 'module.collaborations' },
		{ type: 'module.standardText' },
		{ type: 'module.simpleHero' },
		{ type: 'module.infoCarousel' },
		{ type: 'module.reviewHighlights' },
		{ type: 'module.heroCarousel' },
		{ type: 'module.valueProps' },
    { type: 'module.marquee' },
    { type: 'module.columns' }
	],
};
