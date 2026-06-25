import { defineField, defineType } from 'sanity'
import { iconNameField } from './iconName'

export const journeyStepType = defineType({
  name: 'journeyStep',
  title: 'Paso del proceso',
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
