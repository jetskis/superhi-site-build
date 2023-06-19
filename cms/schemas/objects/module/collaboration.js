import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.collaboration',
  title: 'Collaboration',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    defineField({
      name: 'collaboration',
      title: 'Include Collaboration',
      type: 'boolean',
      description: 'Automatically fetch collaboration if one is associated with the selected product'
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
        title: 'Collaboration',
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
