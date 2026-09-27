import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'footer', title: 'Footer' },
    { name: 'contact', title: 'Contacto' },
    { name: 'social', title: 'Redes sociales' },
    { name: 'legal', title: 'Legal' },
  ],
  fields: [
    // Internal — set by the document-internationalization plugin
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),

    // ── Footer ────────────────────────────────────────────────────────────────
    defineField({ name: 'footerTagline', title: 'Tagline', type: 'text', rows: 2, group: 'footer' }),
    defineField({ name: 'footerColServicesLabel', title: 'Columna Servicios — título', type: 'string', group: 'footer' }),
    defineField({
      name: 'footerServices',
      title: 'Columna Servicios — links',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'label', title: 'Texto', type: 'string' })] }],
      group: 'footer',
    }),
    defineField({ name: 'footerColCompanyLabel', title: 'Columna Empresa — título', type: 'string', group: 'footer' }),
    defineField({
      name: 'footerCompany',
      title: 'Columna Empresa — links',
      type: 'array',
      of: [{ type: 'object', fields: [defineField({ name: 'label', title: 'Texto', type: 'string' })] }],
      group: 'footer',
    }),
    defineField({ name: 'footerCopyright', title: 'Copyright', type: 'string', group: 'footer' }),

    // ── Contact ───────────────────────────────────────────────────────────────
    defineField({ name: 'footerColContactLabel', title: 'Columna Contacto — título', type: 'string', group: 'contact' }),
    defineField({ name: 'footerAddress', title: 'Dirección', type: 'string', group: 'contact' }),
    defineField({ name: 'footerPhone', title: 'Teléfono', type: 'string', group: 'contact' }),
    defineField({ name: 'footerEmail', title: 'Email', type: 'string', group: 'contact' }),
    defineField({ name: 'footerHours', title: 'Horario', type: 'string', group: 'contact' }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp (citas)',
      type: 'string',
      description:
        'Número de WhatsApp del encargado de citas, con código de país y sin + ni espacios. Ej: 573001234567. Los botones de "Agendar" abren un chat con este número.',
      group: 'contact',
    }),

    // ── Redes sociales ──────────────────────────────────────────────────────────
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      description: 'Enlaces a las redes sociales; se muestran como iconos en la cabecera.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'X (Twitter)', value: 'x' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
            }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
          preview: { select: { title: 'platform', subtitle: 'url' } },
        },
      ],
      group: 'social',
    }),

    // ── Legal ─────────────────────────────────────────────────────────────────
    defineField({ name: 'footerPrivacyLabel', title: 'Link Privacidad', type: 'string', group: 'legal' }),
    defineField({ name: 'footerTermsLabel', title: 'Link Términos', type: 'string', group: 'legal' }),
    defineField({ name: 'footerCookiesLabel', title: 'Link Cookies', type: 'string', group: 'legal' }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Configuración del sitio',
        subtitle: language?.toUpperCase() ?? 'Sin idioma',
      }
    },
  },
})
