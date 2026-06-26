import {SearchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: SearchIcon,
  options: {collapsible: true, collapsed: true},
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'Título SEO (pestaña del navegador y Google)',
      type: 'string',
      description: 'Si se deja vacío se usa un título por defecto.',
      validation: (r) => r.max(60).warning('Idealmente 60 caracteres o menos.'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Descripción SEO (meta description)',
      type: 'text',
      rows: 3,
      description: 'Texto que aparece bajo el título en los resultados de Google.',
      validation: (r) => r.max(160).warning('Idealmente 160 caracteres o menos.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Imagen para compartir (redes sociales)',
      type: 'image',
      description: 'Se muestra al compartir el enlace (WhatsApp, Facebook, etc.). Ideal 1200×630.',
    }),
  ],
})
