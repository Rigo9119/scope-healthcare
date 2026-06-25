import { defineField, defineType } from 'sanity'
import { iconNameField } from './iconName'

export const specialtyItemType = defineType({
  name: 'specialtyItem',
  title: 'Especialidad',
  type: 'object',
  fields: [
    iconNameField,
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'body', title: 'Descripción', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'icon' },
  },
})
