// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

const annotations = [
  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
  annotationProduct,
]

// Document types
import collection from './documents/collection'
import colorType from './documents/colorType'
import homePage from './documents/home'
import page from './documents/page'
import product from './documents/product'
import productVariant from './documents/productVariant'
import theme from './documents/theme'

const documents = [
  collection,
  colorType,
  homePage,
  page,
  product,
  productVariant,
  theme
]

// Links
import link from './links/link'
import collectionLink from './links/collectionLink'
import productLink from './links/productLink'
import pageLink from './links/pageLink'
import cta from './modules/cta'
import ctaList from './modules/ctaList'

const links = [
  link, 
  collectionLink, 
  pageLink, 
  productLink, 
  cta, 
  ctaList
]

// Singleton document types
import settings from './singletons/settings'

const singletons = [settings]

// Block content
import body from './blocks/body'
import richText from './blocks/richtext'

const blocks = [body, richText]

// Object types
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionSize from './objects/customProductOption/size'
import imageWithProductHotspots from './objects/imageWithProductHotspots'
import linkExternal from './objects/linkExternal'
import linkInternal from './objects/linkInternal'

import moduleAccordion from './objects/module/accordion'
import moduleCallout from './objects/module/callout'
import moduleCallToAction from './objects/module/callToAction'

import moduleImage from './objects/module/image'
import moduleImages from './objects/module/images'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import moduleStandardText from './objects/module/standardText'
import placeholderString from './objects/placeholderString'
import productHotspots from './objects/productHotspots'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import proxyString from './objects/proxyString'
import seo from './objects/seo'

import shopifyCollection from './objects/shopifyCollection'
import shopifyCollectionRule from './objects/shopifyCollectionRule'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'
import shopifyProductVariantOptionValue from './objects/shopifyProductVariantOptionValue'

const objects = [
  customProductOptionColor,
  customProductOptionSize,
  imageWithProductHotspots,
  linkExternal,
  linkInternal,
  moduleAccordion,
  moduleCallout,
  moduleCallToAction,
  moduleImage,
  moduleImages,

  moduleProduct,
  moduleProducts,

  moduleStandardText,
  placeholderString,
  productHotspots,
  productOption,
  productWithVariant,
  proxyString,
  
  seo,

  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,
  shopifyProductVariantOptionValue,
]

// site modules
import productComponentList from './modules/productComponentList'
import pageComponentList from './modules/pageComponentList'
import header from './modules/header'
import footer from './modules/footer'
import cart from './modules/cart'

const modules = [
  productComponentList,
  pageComponentList,
  header,
  footer,
  cart
]

export const schemaTypes = [
  ...annotations, 
  ...documents,
  ...singletons,
  ...objects,
  ...modules,
  ...blocks,
  ...links,
]
