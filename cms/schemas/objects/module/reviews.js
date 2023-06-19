import {StackCompactIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField} from 'sanity'
import blocksToText from '../../../utils/blocksToText'

export default defineField({
  name: 'module.reviews',
  title: 'Reviews',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'boolean',
      description: 'Render the reviews for this product'
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
        title: 'Reviews',
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
