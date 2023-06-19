import {DocumentIcon} from '@sanity/icons'
import {defineField} from 'sanity'
import {validateSlug} from '../../utils/validateSlug'

export default defineField({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'theme',
      title: 'Theme',
    },
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      group: 'editorial',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    // Slug
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'editorial',
      options: {source: 'title'},
      // @ts-ignore - TODO - fix this TS error
      validation: validateSlug,
    }),
    // Color theme
    defineField({
      name: 'colorTheme',
      title: 'Color theme',
      type: 'reference',
      to: [{type: 'colorTheme'}],
      group: 'theme',
      hidden: true,
    }),
    // Show hero
    defineField({
      name: 'showHero',
      title: 'Show hero',
      type: 'boolean',
      hidden: true,
      description: 'If disabled, page title will be displayed instead',
      initialValue: false,
      group: 'editorial',
    }),
    // Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero.page',
      hidden: ({document}) => !document?.showHero,
      group: 'editorial',
    }),
    defineField({
      name: 'pageComponentList',
      title: 'Modules',
      type: 'pageComponentList',
      group: 'editorial'
    }),
    // Body
    defineField({
      name: 'body',
      title: 'Body',
      hidden: true,
      type: 'body',
      group: 'editorial',
    }),
    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.page',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      active: 'active',
      seoImage: 'seo.image',
      title: 'title',
    },
    prepare(selection) {
      const {seoImage, title} = selection

      return {
        media: seoImage,
        title,
      }
    },
  },
})
