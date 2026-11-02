import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

// Shared across locales (photo uploaded once); only the texts are translated,
// as { es, en } fields. `service` matches a pillar item slug in the frontend.
const SERVICES = [
  {title: 'Reumatología', value: 'reumatologia'},
  {title: 'Gastroenterología', value: 'gastroenterologia'},
  {title: 'Medicina Física y del Deporte', value: 'medicina-fisica-deporte'},
  {title: 'Urología', value: 'urologia'},
  {title: 'Medicina Estética y Capilar', value: 'estetica-capilar'},
]

const localized = (name: string, title: string, type: 'string' | 'list') =>
  defineField({
    name,
    title,
    type: 'object',
    fields: (['es', 'en'] as const).map((lang) =>
      type === 'string'
        ? defineField({name: lang, title: lang === 'es' ? 'Español' : 'English', type: 'string'})
        : defineField({
            name: lang,
            title: lang === 'es' ? 'Español' : 'English',
            type: 'array',
            of: [{type: 'string'}],
          }),
    ),
  })

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Miembro del equipo',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'service',
      title: 'Servicio',
      type: 'string',
      options: {list: SERVICES},
      validation: (r) => r.required(),
    }),
    localized('role', 'Cargo / especialidad', 'string'),
    localized('credentials', 'Estudios adicionales', 'list'),
    defineField({name: 'photo', title: 'Foto', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Menor aparece primero dentro de su servicio.',
      type: 'number',
    }),
  ],
  orderings: [{title: 'Orden', name: 'order', by: [{field: 'order', direction: 'asc'}]}],
  preview: {
    select: {title: 'name', subtitle: 'role.es', media: 'photo'},
  },
})
