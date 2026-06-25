import { defineField, defineType } from 'sanity'
import { iconNameField } from './iconName'

export const statItemType = defineType({
  name: 'statItem',
  title: 'Estadística',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Valor', type: 'string', description: 'Ej: 25+, 40k+' }),
    defineField({ name: 'label', title: 'Etiqueta', type: 'string' }),
    iconNameField,
  ],
  preview: {
    select: { title: 'value', subtitle: 'label' },
  },
})
