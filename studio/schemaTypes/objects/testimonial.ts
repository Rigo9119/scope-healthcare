import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string' }),
    defineField({ name: 'detail', title: 'Detalle (ciudad, procedimiento…)', type: 'string' }),
    defineField({
      name: 'rating',
      title: 'Calificación',
      type: 'number',
      options: { list: [1, 2, 3, 4, 5] },
      initialValue: 5,
    }),
    defineField({ name: 'text', title: 'Testimonio', type: 'text', rows: 4 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'detail' },
  },
})
