import React from 'react'
import {EditIcon, EyeOpenIcon} from '@sanity/icons'
/**
 * Desk structure overrides
 */

import colorThemes from './colorThemeStructure'
import home from './homeStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'colorTheme',
    'home',
    'media.tag',
		'productLanding',
    'page',
		'faq',
    'product',
    'productVariant',
		'header',
		'theme',
		'collaboration',
		'colorType',
		'colorFam',
		'productMap',
		'scheduledTheme',
		'footer',
		'cart',
    'settings',
  ].includes(id)
}

export const structure = (S, context) => {
  const pageMenuItem = S.listItem()
		.title('Pages')
		.schemaType('page')
		.child(
			S.documentTypeList('page')
				.title('Pages')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('page')
						.views([
							S.view.form().icon(EditIcon),
							// S.view
							// 	.component(IframePreview)
							// 	.options({
							// 		previewURL: PREVIEW_URL,
							// 		token: PREVIEW_TOKEN,
							// 	})
							// 	.title('Draft Preview')
							// 	.icon(EyeOpenIcon),
						]),
				),
		);
	
	const supportPageMenuItem = S.listItem()
		.title('Home Pages')
		.schemaType('home')
		.child(
			S.documentTypeList('home')
				.title('Home Pages')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('information')
						.views([
							S.view.form().icon(EditIcon),
							// S.view
							// 	.component(IframePreview)
							// 	.options({
							// 		previewURL: PREVIEW_URL,
							// 		token: PREVIEW_TOKEN,
							// 	})
							// 	.title('Draft Preview')
							// 	.icon(EyeOpenIcon),
						]),
				),
		);

	const allPageMenuItem = S.listItem()
		.title('Pages')
		.icon()
		.child(
			S.list()
				.title('Pages')
				.items([
					pageMenuItem,
					supportPageMenuItem,
					// S.documentListItem()
					// 	.id('notFound')
					// 	.title('404 Page')
					// 	.schemaType('notFound'),
				]),
		);
	
	const modules = S.listItem()
		.title('Modules')
		.icon()
		.child(
			S.list()
				.title('Modules')
				.items([
					S.listItem()
						.title('Headers')
						.schemaType('header')
						.child(S.documentTypeList('header').title('Headers')),
					S.listItem()
						.title('Footers')
						.schemaType('footer')
						.child(S.documentTypeList('footer').title('Footers')),
					S.listItem()
						.title('Carts')
						.schemaType('cart')
						.child(S.documentTypeList('cart').title('Carts')),
					S.listItem()
						.title('FAQs')
						.schemaType('faq')
						.child(S.documentTypeList('faq').title('FAQs')),
				]),
		);
	
	const collections = S.listItem()
		.title('Collections')
		.icon()
		.child(
			S.list()
				.title('Collections')
				.items([
					S.listItem()
						.title('Collections')
						.schemaType('collection')
						.child(S.documentTypeList('collection').title('Collections')),
					S.listItem()
						.title('Collaborations')
						.schemaType('collaboration')
						.child(S.documentTypeList('collaboration').title('Collaborations')),
				]),
		);

	const themes = S.listItem()
		.title('Themes')
		.child(
			S.list()
				.title('Themes')
				.items([
					S.listItem()
						.title('Themes')
						.schemaType('theme')
						.child(S.documentTypeList('theme').title('Themes')),
					S.listItem()
						.title('Scheduled Themes')
						.schemaType('scheduledTheme')
						.child(S.documentTypeList('scheduledTheme').title('Scheduled Themes')),
				]),
		);

	//
	// === Products ===
	//

	const variantsByProduct = S.listItem()
		.title('By Product')
		.icon()
		.child(
			S.documentList()
				.title('Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type && !defined(parents)')
				.params({type: 'product'})
				.child(productId =>
					S.documentList()
						.title('Variants')
						.menuItems(
							S.documentTypeList('productVariant').getMenuItems(),
						)
						.filter('_type == $type && productId == $productId')
						.params({
							type: 'productVariant',
							productId: Number(productId),
						}),
				),
		);

	const orphanedVariants = S.listItem()
		.title('Orphaned')
		.icon()
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter(
					'_type == $type && count(*[ _type == "product" && references(^._id)]) == 0 && !(_id in path("drafts.**"))',
				)
				.params({type: 'productVariant'}),
		);

	const allShopifyVariants = S.listItem()
		.title('All Variants')
		.icon()
		.child(
			S.documentList()
				.title('Variants')
				.menuItems(S.documentTypeList('productVariant').getMenuItems())
				.filter('_type == $type')
				.params({type: 'productVariant'}),
		);

	const variantsMenuItem = S.listItem()
		.title('Product Variants')
		.icon()
		.child(
			S.list()
				.title('Product Variants')
				.items([
					variantsByProduct,
					orphanedVariants,
					allShopifyVariants,
				]),
		);

	const productLandings = S.listItem()
		.title('Product Landings')
		.schemaType('productLanding')
		.child(
			S.documentTypeList('productLanding')
				.title('Product Landings')
				.child(documentId =>
					S.document()
						.documentId(documentId)
						.schemaType('productLanding')
						.views([
							S.view.form().icon(EditIcon),
							// S.view
							// 	.component(IframePreview)
							// 	.options({
							// 		previewURL: PREVIEW_URL,
							// 		token: PREVIEW_TOKEN,
							// 	})
							// 	.title('Draft Preview')
							// 	.icon(EyeOpenIcon),
						]),
				),
		);
	
		const productMapsMenuItem = S.listItem()
		.title('Product Maps')
		.icon()
		.child(
			S.documentList()
				.title('Product Maps')
				.menuItems(S.documentTypeList('productMap').getMenuItems())
				.filter('_type == $type')
				.params({type: 'productMap'}),
		);
	
	const colorFamilyMenuItems = S.listItem()
		.title('Color Families')
		.icon()
		.child(
			S.documentList()
				.title('Color Families')
				.menuItems(S.documentTypeList('colorFam').getMenuItems())
				.filter('_type == $type')
				.params({type: 'colorFam'}),
		);

	const colorTypeMenuItems = S.listItem()
		.title('Colors')
		.icon()
		.child(
			S.documentList()
				.title('Colors')
				.menuItems(S.documentTypeList('colorType').getMenuItems())
				.filter('_type == $type')
				.params({type: 'colorType'}),
		);

	const productsMenuItem = S.listItem()
		.title('Shopify Products')
		.icon()
		.child(
			S.documentList()
				.title('Shopify Products')
				.menuItems(S.documentTypeList('product').getMenuItems())
				.filter('_type == $type')
				.params({type: 'product'}),
		);

	// const productTags = S.listItem()
	// 	.title('Product Tags')
	// 	.schemaType('productTag')
	// 	.child(S.documentTypeList('productTag').title('Product Tags'));

	const productMenuItem = S.listItem()
		.title('Products')
		.icon()
		.child(
			S.list()
				.title('Products')
				.items([
					productLandings,
					productMapsMenuItem,
					S.divider(),
					productsMenuItem,
					variantsMenuItem,
					S.divider(),
					colorTypeMenuItems,
					colorFamilyMenuItems,
					// productTags,
				]),
		);

  return S.list()
    .title('Content')
    .items([
			allPageMenuItem,
      S.divider(),
      collections,
			productMenuItem,
      // products(S, context),
      S.divider(),
      colorThemes(S, context),
      S.divider(),
			modules,
			S.divider(),
			themes,
      settings(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
  }