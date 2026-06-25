import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'titleStart', title: 'Título — primera parte', type: 'string' }),
    defineField({ name: 'titleAccent', title: 'Título — parte destacada (azul)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtítulo', type: 'text', rows: 3 }),
    defineField({ name: 'ctaPrimaryLabel', title: 'Botón primario', type: 'string' }),
    defineField({ name: 'ctaSecondaryLabel', title: 'Botón secundario', type: 'string' }),
  ],
})
