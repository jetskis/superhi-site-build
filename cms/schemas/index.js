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
import colorTheme from './documents/colorTheme'
import colorType from './documents/colorType'
import colorFam from './documents/colorFam'
import homePage from './documents/home'
import page from './documents/page'
import productLanding from './documents/productLanding'
import product from './documents/product'
import productVariant from './documents/productVariant'
import scheduledTheme from './documents/scheduledTheme'
import theme from './documents/theme'

const documents = [
  collection,
  colorTheme,
  colorType,
  colorFam,
  homePage,
  page,
  productLanding,
  product,
  productVariant,
  scheduledTheme,
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
import heroCollection from './objects/hero/collection'
import heroHome from './objects/hero/home'
import heroPage from './objects/hero/page'
import moduleAccordion from './objects/module/accordion'
import moduleCallout from './objects/module/callout'
import moduleCallToAction from './objects/module/callToAction'
import moduleCollaboration from './objects/module/collaboration'
import moduleCollaborations from './objects/module/collaborations'
import moduleCollection from './objects/module/collection'
import moduleColumns from './objects/module/columns'
import moduleDynamicCrossShop from './objects/module/dynamicCrossShop'
import moduleGrid from './objects/module/grid'
import moduleHeroCarousel from './objects/module/heroCarousel'
// import moduleImage from './objects/module/image'
import moduleImages from './objects/module/images'
import moduleInformationalCarousel from './objects/module/infoCarousel'
import moduleReviews from './objects/module/reviews'
import moduleFaqs from './objects/module/faqs'
import moduleInstagram from './objects/module/instagram'
import moduleMarquee from './objects/module/marquee'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import moduleReviewHighlights from './objects/module/reviewHighlights'
import moduleSimpleHero from './objects/module/simpleHero'
import moduleStandardText from './objects/module/standardText'
import moduleValueProps from './objects/module/valueProps'
import placeholderString from './objects/placeholderString'
import productHotspots from './objects/productHotspots'
import productOption from './objects/productOption'
import productWithVariant from './objects/productWithVariant'
import productLandingWithVariant from './objects/productLandingWithVariant'
import proxyString from './objects/proxyString'
import seo from './objects/seo'
import seoHome from './objects/seo/home'
import seoPage from './objects/seo/page'
import seoShopify from './objects/seo/shopify'
import shopifyCollection from './objects/shopifyCollection'
import shopifyCollectionRule from './objects/shopifyCollectionRule'
import shopifyProduct from './objects/shopifyProduct'
import shopifyProductVariant from './objects/shopifyProductVariant'
import shopifyProductVariantOptionValue from './objects/shopifyProductVariantOptionValue'

// Custom Objects
import shopifyImage from './shopify/shopifyImage'
import shopifyVideo from './shopify/shopifyVideo'

const objects = [
  customProductOptionColor,
  customProductOptionSize,
  imageWithProductHotspots,
  linkExternal,
  linkInternal,
  heroCollection,
  heroHome,
  heroPage,
  moduleAccordion,
  moduleCallout,
  moduleCallToAction,
  moduleCollaboration,
  moduleCollaborations,
  moduleCollection,
  moduleColumns,
  moduleDynamicCrossShop,
  moduleInformationalCarousel,
  moduleFaqs,
  moduleGrid,
  moduleHeroCarousel,
  // moduleImage,
  moduleMarquee,
  moduleReviews,
  moduleImages,
  moduleInstagram,
  moduleProduct,
  moduleProducts,
  moduleReviewHighlights,
  moduleSimpleHero,
  moduleStandardText,
  moduleValueProps,
  placeholderString,
  productHotspots,
  productOption,
  productWithVariant,
  productLandingWithVariant,
  proxyString,
  seo,
  seoHome,
  seoPage,
  seoShopify,
  shopifyImage,
  shopifyVideo,
  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,
  shopifyProductVariantOptionValue,
]

// modules
import productComponentList from './modules/productComponentList'
import pageComponentList from './modules/pageComponentList'
import imageModule from './modules/imageModule'
import header from './modules/header'
import footer from './modules/footer'
import faq from './modules/faq'
import cart from './modules/cart'

const modules = [
  productComponentList,
  pageComponentList,
  imageModule,
  faq,
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
