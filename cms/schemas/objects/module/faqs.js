import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.faqs',
  title: 'FAQs',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: { type: 'faq' }
        }
      ]
    }),
  ],
  preview: {
    select: {
      groups: 'groups',
      url: 'url',
    },
    prepare(selection) {
      // const {groups} = selection
      return {
        title: 'FAQs',
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
