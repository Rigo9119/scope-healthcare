import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {defineArrayMember, defineField, defineType} from 'sanity'

// One document per pillar item and locale, with fixed ids
// `pillarItem-{slug}-{locale}` (see studio/structure/pillarItems.ts). The item's
// title, icon and URL live in the frontend registry (src/lib/pillars.ts); this
// holds the page content. Every block is optional.
export const pillarItemType = defineType({
  name: 'pillarItem',
  title: 'Especialidad / programa',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'main', title: 'Contenido', default: true},
    {name: 'lists', title: 'Listas'},
    {name: 'programs', title: 'Programas'},
    {name: 'cta', title: 'Llamado a la acción'},
  ],
  fields: [
    // Internal — set by the document-internationalization plugin / seed
    defineField({name: 'language', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'slug', type: 'string', readOnly: true, hidden: true}),

    defineField({
      name: 'tagline',
      title: 'Línea descriptiva',
      description:
        'Texto corto en mayúsculas sobre el título, p. ej. "Salud metabólica · Bienestar integral".',
      type: 'string',
      group: 'main',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      description: 'Subtítulo de la página, texto de la tarjeta y descripción para Google.',
      type: 'text',
      rows: 3,
      group: 'main',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introducción',
      description: 'Un párrafo por elemento.',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      group: 'main',
    }),
    defineField({
      name: 'audience',
      title: '¿Cuándo consultar? / ¿Para quién es?',
      type: 'object',
      group: 'main',
      fields: [
        defineField({name: 'title', title: 'Título', type: 'string'}),
        defineField({name: 'body', title: 'Texto', type: 'text', rows: 4}),
      ],
    }),
    defineField({
      name: 'approach',
      title: 'Enfoque SCOPE',
      type: 'object',
      group: 'main',
      fields: [
        defineField({name: 'title', title: 'Título', type: 'string'}),
        defineField({name: 'body', title: 'Texto', type: 'text', rows: 5}),
      ],
    }),

    defineField({
      name: 'lists',
      title: 'Listas',
      description:
        'P. ej. "Condiciones que atendemos", "Procedimientos y servicios", "Qué incluye".',
      type: 'array',
      group: 'lists',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'bulletList',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string'}),
            defineField({name: 'items', title: 'Elementos', type: 'array', of: [{type: 'string'}]}),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'steps',
      title: 'Pasos de la experiencia',
      description: 'Tarjetas numeradas (p. ej. Living Medical).',
      type: 'array',
      group: 'lists',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'experienceStep',
          fields: [
            defineField({name: 'title', title: 'Título', type: 'string'}),
            defineField({name: 'subtitle', title: 'Subtítulo', type: 'string'}),
            defineField({name: 'body', title: 'Texto', type: 'text', rows: 3}),
          ],
          preview: {select: {title: 'title', subtitle: 'subtitle'}},
        }),
      ],
    }),

    defineField({
      name: 'programs',
      title: 'Programas',
      description: 'Tarjetas de programa con pasos y precios (p. ej. Scope Vital 6M).',
      type: 'array',
      group: 'programs',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'program',
          fields: [
            defineField({name: 'name', title: 'Nombre', type: 'string'}),
            defineField({name: 'subtitle', title: 'Subtítulo', type: 'string'}),
            defineField({name: 'description', title: 'Descripción', type: 'text', rows: 3}),
            defineField({
              name: 'steps',
              title: 'Pasos',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'programStep',
                  fields: [
                    defineField({name: 'title', title: 'Título', type: 'string'}),
                    defineField({
                      name: 'details',
                      title: 'Detalles',
                      type: 'array',
                      of: [{type: 'string'}],
                    }),
                    defineField({
                      name: 'price',
                      title: 'Precio',
                      description: 'Texto libre, p. ej. "$6.500.000 COP" o "$0".',
                      type: 'string',
                    }),
                  ],
                  preview: {select: {title: 'title', subtitle: 'price'}},
                }),
              ],
            }),
            defineField({
              name: 'features',
              title: 'Incluye',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'subtitle'}},
        }),
      ],
    }),

    defineField({
      name: 'cta',
      title: 'Llamado a la acción',
      description: 'Opcional. Reemplaza el bloque "¿Listo para empezar?" al final de la página.',
      type: 'object',
      group: 'cta',
      fields: [
        defineField({name: 'eyebrow', title: 'Antetítulo', type: 'string'}),
        defineField({name: 'title', title: 'Título', type: 'string'}),
        defineField({name: 'body', title: 'Texto', type: 'text', rows: 3}),
        defineField({name: 'label', title: 'Texto del botón', type: 'string'}),
      ],
    }),
  ],
  preview: {
    select: {slug: 'slug', language: 'language'},
    prepare: ({slug, language}) => ({title: slug, subtitle: language}),
  },
})
