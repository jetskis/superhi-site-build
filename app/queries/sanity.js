import groq from 'groq'

const richText = groq`
  ...,
  markDefs[] {
    ...,
	  (_type == 'annotationLinkInternal') => {
      _key,
      _type,
      title,
      type,
      ...reference-> {
        "documentType": _type,
        (_type == "marketingPage") => {
          "slug": "/pages/learn/" + slug.current,
          // "sanitySlug": "/collections/" + slug.current,
        },
        (_type == "home") => {
          "slug": "/",
        },
        (_type == "page") => {
          "slug": "/pages/" + slug.current,
        },
        (_type == "product") => {
          "slug": "/products/" + store.slug.current,
        },
      }
	  }
  }
`

export const QUERY_THEME = groq`
  *[_type == 'settings'][0] {
    footer {
      links[] {
        _key,
        title,
        'link': reference->{
          'productSlug': store.slug.current,
          'slug': slug.current,
          _type
        },
      }
    },
    menu {
      links[] {
        _type,
        _key,
        title,
        'link': reference->{
          'productSlug': store.slug.current,
          'slug': slug.current,
          _type
        },
      }
    },
    seo,
    theme[]-> {
      'color': core.hex,
      'colorRGB': core.rgb,
      'accent': accent.hex,
      title,
      _id,
      image
    },
    marqueeText[]
  }
`

const SIDEBARS = groq`
  _type,
  _key,
  (_type == 'informational') => {
    ...,
    'nestedLink': nestedLink {
      title,
      'link': reference->{
        'productSlug': store.slug.current,
        'slug': slug.current,
        _type
      }
    },
    'text': text.text[] { ${richText} }
  },
  (_type == 'faqs') => {
    faqs[]-> {
      'slug': slug.current,
      body[],
      question,
      _id
    }
  },
  (_type == 'product') => {
    product->{
      images,
      title,
      'slug': store.slug.current
    }
  }
`
const MODULE_STANDARD_TEXT = groq`
  (_type == 'module.standardText') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    textAlign,
    text[] {
      ${richText}
    }
  }
`

const MODULE_SIMPLE_HERO = groq`
  (_type == 'module.simpleHero') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    'image': image,
    marqueeText,
    heroSize,
    'text': text[] {
      ${richText}
    }
  }
`

const MODULE_FAQS = groq`
  (_type == 'module.faqs') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    title,
    faqs[]-> {
      'slug': slug.current,
      'body': answer[] { ${richText}},
      question,
      _id
    }
  }
`

const MODULE_HERO_CAROUSEL = groq`
  (_type == 'module.heroCarousel') => {
    items[] {
      'bgColor': bgColor.hex,
      'textColor': textColor.hex,
      'bgRGB': bgColor.rgb,
      'image': image,
      'text': body[] {
        ${richText}
      }
    }
  }
`

const MODULE_VALUE_PROPS = groq`
  (_type == 'module.valueProps') => {
    'values': values[] {
      _key,
      _type,
      title,
      image,
      description
    }
  }
`

const MODULE_MARQUEE = groq`
  (_type == 'module.marquee') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    'marquee': marquee[]
  }
`

const MODULE_COLLABORATIONS = groq`
  (_type == 'module.collaborations') => {
    collaborations[]-> {
      _key,
      _type,
      title,
      slug,
      vector,
      description,
      'bgColor': bgColor.hex,
      'bgRGB': bgColor.rgb,
      image
    }
  }
`

const MODULE_INFO_CAROUSEL = groq`
  (_type == 'module.infoCarousel') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    title,
    items[] {
      _key,
      _type,
      image,
      body[] {
        ${richText}
      }
    }
  }
`

const MODULE_COLUMNS = groq`
  (_type == 'module.columns') => {
    'bgColor': bgColor.hex,
    'bgRGB': bgColor.rgb,
    invert,
    'columns': columns[] {
      _type,
      _key,
      mobileColSpan,
      tabletColSpan,
      desktopColSpan,
      mobileColStart,
      desktopColStart,
      tabletColStart,
      verticalAlignment,
      content[] {
        _type,
        _key,
        (_type == 'module.standardText') => {
          textAlign,
          'text': text[] {
            ${richText}
          }
        },

        (_type == 'module.image') => {
          'image': image
        },
      }
    }
  }
`

const MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
`

const PAGE_MODULES = groq`
  _type,
  _key,
  ${MODULE_STANDARD_TEXT},
  ${MODULE_SIMPLE_HERO},
  ${MODULE_COLUMNS},
  ${MODULE_VALUE_PROPS},
  ${MODULE_MARQUEE},
  ${MODULE_FAQS},
  ${MODULE_COLLABORATIONS},
  ${MODULE_HERO_CAROUSEL},
  ${MODULE_INFO_CAROUSEL}
`

const pageQuery = groq`
  _type,
  'slug': slug.current,
  title,
  'modules': pageComponentList[] {
    ${PAGE_MODULES}
  }
`

const productQuery = groq`
  _type,
  'slug': store.slug.current,
  title,
  drawers[] {
    ...,
    title,
    (_type == 'faqDrawer') => {
      faqs[]-> {
        key,
        question,
        body[]
      }
    }
  },
  images,
  hero,
  sidebar[] {
    ${SIDEBARS}
  },
  modules[] {
    ${MODULES}
  }
`

export const QUERY_INDEX = groq`
  *[_type == 'settings'][0] {
    homepage-> {
      ${pageQuery}
    },
    seo
}`

export const QUERY_PRODUCT = (slug) => groq`*[
  _type == 'product' && 
  store.slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
  ][0] {
    ${productQuery}
  }
`

export const QUERY_SINGLE_LEARN = (slug) => groq`*[
  _type == 'marketingPage'  &&
  slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
  _id,
  'slug': slug.current,
  title,
  author,
  tags,
  authorCredentials,
  legalByLine,
  modules[] {
    ${MODULES}
  },

  'faqPage': *[_type == 'settings'][0] {
    faqs-> {
      ${pageQuery}
    }
  },
  'blogIndex': *[_type == 'settings'][0] {
    'slug': blogIndex->slug.current
  }
}`


export const QUERY_NESTED_FAQ = (slug) => groq`*[
  _type == 'faq'  &&
  slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
  _id,
  question,
  body[],
  'faqPage': *[_type == 'settings'][0] {
    faqs-> {
      ${pageQuery}
    }
  }
}`

export const QUERY_PAGE = (slug) => groq`*[
  _type == 'page' &&
  slug.current == "${slug}" &&
	!(_id in path("drafts.**"))
][0] {
  ${pageQuery}
}`

const QUERY_SANITY = groq`
  {
   'faqs': *[_type == 'faq'][0..8] {
      question,
      body[],
      category->
    }
  }
`