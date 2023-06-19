import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.dynamicCrossShop',
  title: 'Dynamic Cross Shop',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      description: 'Product landings will be pulled automatically unless specified here',
      type: 'array',
      of: [
        {
          type: 'productLandingWithVariant',
        }
      ]
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title,
        subtitle: 'Dynamic Cross Shop Module'
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
