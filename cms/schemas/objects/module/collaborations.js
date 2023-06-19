import {StackCompactIcon} from '@sanity/icons'
import {defineField} from 'sanity'

export default defineField({
  name: 'module.collaborations',
  title: 'Collaborations',
  type: 'object',
  icon: StackCompactIcon,
  fields: [
    // Groups
    defineField({
      name: 'collaborations',
      title: 'Collaborations',
      type: 'array',
      of: [
        {
          type: 'reference', to: { type: 'collaboration' }
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
        title: 'Collaborations',
        // title: groups.length > 0 ? pluralize('group', groups.length, true) : 'No groups',
      }
    },
  },
})
