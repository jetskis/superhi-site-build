import React from 'react'
import {SplitVerticalIcon} from '@sanity/icons'

import { COLORS } from '../../../constants'

{/*

  FINALIZE
  - Make the CSS classes configurable drop downs: mobile/tab/desk - col width + col start

*/}

export default {
  name: 'module.columns',
  title: 'Columns',
  type: 'object',
  icon: SplitVerticalIcon,
  fields: [
    {
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        {
          name: 'column',
          title: 'column',
          type: 'object',
          fieldsets: [
            {
              name: 'layout',
              title: 'Column Layout', 
              description: 'Col spans on mobile are 1-6 columns, 1-12 on tablet/desktop. The colStart defines an extra parameter for when a column starts in the grid.',
              options: {
                collapsible: true, // Makes the whole fieldset collapsible
                collapsed: false, // Defines if the fieldset should be collapsed by default or not
                columns: 3 // Defines a grid for the fields and how many columns it should have
              }
            },
          ],
          fields: [
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [
                // { type: 'module.marquee' },
                // { type: 'module.spacing' },
                { type: 'module.standardText' },
                { type: 'module.image' }
              ],
            },
            {
              name: 'mobileColSpan',
              title: 'Mobile Col Span',
              type: 'number',
              fieldset: 'layout',
              initialValue: 6,
              validation: (Rule) => Rule.min(1).max(6)
            },
            {
              name: 'tabletColSpan',
              title: 'Tablet Col Span',
              type: 'number',
              fieldset: 'layout',
              initialValue: 12,
              validation: (Rule) => Rule.min(2).max(12)
            },
            {
              name: 'desktopColSpan',
              title: 'Desktop Col Span',
              type: 'number',
              fieldset: 'layout',
              initialValue: 12,
              validation: (Rule) => Rule.min(2).max(12)
            },
            {
              name: 'mobileColStart',
              title: 'Mobile Col Start',
              type: 'number',
              fieldset: 'layout',
              validation: (Rule) => Rule.min(1).max(5)
            },
            {
              name: 'tabletColStart',
              title: 'Tablet Col Start',
              type: 'number',
              fieldset: 'layout',
              validation: (Rule) => Rule.min(2).max(10)
            },
            {
              name: 'desktopColStart',
              title: 'Desktop Col Start',
              type: 'number',
              fieldset: 'layout',
              validation: (Rule) => Rule.min(2).max(10)
            },
            // {
            //   name: 'cssClasses',
            //   title: 'CSS Classes',
            //   description: 'Allows for advanced layout experiences',
            //   type: 'string',
            //   // fieldset: 'layout'
            // },
            {
              name: 'verticalAlignment',
              title: 'Vertical Alignment',
              type: 'string',
              initialValue: 'none',
              options: {
                direction: 'horizontal',
                layout: 'dropdown',
                list: [
                  {
                    title: 'None',
                    value: 'none',
                  },
                  {
                    title: 'Top',
                    value: 'items-start',
                  },
                  {
                    title: 'Center',
                    value: 'items-center',
                  },
                  {
                    title: 'Bottom',
                    value: 'items-end',
                  },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              modules: 'content'
            },
            prepare(selection) {
              const { modules } = selection
              const type = modules[0]._type
              console.log('yo mod?', modules)
              let title = 'Column'
              let subtitle
              switch (type) {
                case 'module.standardText':
                  const sblock = (modules[0].text || []).find(block => block._type === 'block')
                  title = 'Standard Text - Column',
                  subtitle = sblock.children[0].text
                  break;
                // case 'module.marquee':
                //     const mblock = (modules[0].body || []).find(block => block._type === 'block')
                //     title = 'Marquee - Column',
                //     subtitle = mblock.children[0].text
                //     break;
                // case 'module.image':
                //     title = 'Image - Column'
                //     // subtitle = mblock.children[0].text
                //     break;
              }
              return {
                title,
                subtitle,
                // media: type === 'module.image' && (<img src={modules[0].shopifyURL} />)
              }
            }
          }
        }
      ]
    },
    {
      name: 'invert',
      title: 'Invert Layout Direction',
      description: 'Will switch the order of items on desktop',
      type: 'boolean'
    },
    {
      name: 'bgColor',
      title: 'Background Color',
      description: 'Will use background color of adventure report if not set',
      type: 'color',
      options: {
        colorList: COLORS
      }
    },
  ],
  preview: {
    select: {},
    prepare(selection) {

      return {
        title: 'Columns',
      }
    },
  },
}
