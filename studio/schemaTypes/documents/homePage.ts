import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Página de inicio',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'stats', title: 'Estadísticas' },
    { name: 'specialties', title: 'Especialidades' },
    { name: 'process', title: 'Proceso' },
    { name: 'whyUs', title: 'Por qué elegirnos' },
    { name: 'testimonials', title: 'Testimonios' },
    { name: 'cta', title: 'CTA / Contacto' },
    { name: 'footer', title: 'Footer' },
  ],
  fields: [
    // Internal — set by plugin
    defineField({ name: 'language', type: 'string', readOnly: true, hidden: true }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({ name: 'hero', title: 'Hero', type: 'hero', group: 'hero' }),

    // ── Stats band ────────────────────────────────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Estadísticas',
      type: 'array',
      of: [{ type: 'statItem' }],
      group: 'stats',
      validation: (r) => r.max(4),
    }),

    // ── Specialties ───────────────────────────────────────────────────────────
    defineField({ name: 'specialtiesEyebrow', title: 'Eyebrow', type: 'string', group: 'specialties' }),
    defineField({ name: 'specialtiesTitle', title: 'Título', type: 'string', group: 'specialties' }),
    defineField({ name: 'specialtiesSubtitle', title: 'Subtítulo', type: 'text', rows: 2, group: 'specialties' }),
    defineField({ name: 'specialtiesLinkLabel', title: 'Texto del link', type: 'string', group: 'specialties' }),
    defineField({
      name: 'specialties',
      title: 'Lista de especialidades',
      type: 'array',
      of: [{ type: 'specialtyItem' }],
      group: 'specialties',
    }),

    // ── Process ───────────────────────────────────────────────────────────────
    defineField({ name: 'processEyebrow', title: 'Eyebrow', type: 'string', group: 'process' }),
    defineField({ name: 'processTitle', title: 'Título', type: 'string', group: 'process' }),
    defineField({
      name: 'journey',
      title: 'Pasos del proceso',
      type: 'array',
      of: [{ type: 'journeyStep' }],
      group: 'process',
      validation: (r) => r.max(4),
    }),

    // ── Why Us ────────────────────────────────────────────────────────────────
    defineField({ name: 'whyUsEyebrow', title: 'Eyebrow', type: 'string', group: 'whyUs' }),
    defineField({ name: 'whyUsTitle', title: 'Título', type: 'string', group: 'whyUs' }),
    defineField({ name: 'whyUsSubtitle', title: 'Subtítulo', type: 'text', rows: 2, group: 'whyUs' }),
    defineField({ name: 'whyUsBadgeText', title: 'Texto del badge (ej: Satisfacción garantizada)', type: 'string', group: 'whyUs' }),
    defineField({
      name: 'reasons',
      title: 'Razones',
      type: 'array',
      of: [{ type: 'reason' }],
      group: 'whyUs',
      validation: (r) => r.max(3),
    }),

    // ── Testimonials ──────────────────────────────────────────────────────────
    defineField({ name: 'testimonialsEyebrow', title: 'Eyebrow', type: 'string', group: 'testimonials' }),
    defineField({ name: 'testimonialsTitle', title: 'Título', type: 'string', group: 'testimonials' }),
    defineField({
      name: 'testimonials',
      title: 'Testimonios',
      type: 'array',
      of: [{ type: 'testimonial' }],
      group: 'testimonials',
    }),

    // ── CTA ───────────────────────────────────────────────────────────────────
    defineField({ name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaTitle', title: 'Título', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSubtitle', title: 'Subtítulo', type: 'text', rows: 2, group: 'cta' }),
    defineField({ name: 'ctaPrimaryLabel', title: 'Botón primario', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaPhone', title: 'Teléfono', type: 'string', group: 'cta' }),

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
    defineField({ name: 'footerColContactLabel', title: 'Columna Contacto — título', type: 'string', group: 'footer' }),
    defineField({ name: 'footerAddress', title: 'Dirección', type: 'string', group: 'footer' }),
    defineField({ name: 'footerPhone', title: 'Teléfono', type: 'string', group: 'footer' }),
    defineField({ name: 'footerEmail', title: 'Email', type: 'string', group: 'footer' }),
    defineField({ name: 'footerCopyright', title: 'Copyright', type: 'string', group: 'footer' }),
    defineField({ name: 'footerPrivacyLabel', title: 'Link Privacidad', type: 'string', group: 'footer' }),
    defineField({ name: 'footerTermsLabel', title: 'Link Términos', type: 'string', group: 'footer' }),
    defineField({ name: 'footerCookiesLabel', title: 'Link Cookies', type: 'string', group: 'footer' }),
  ],
  preview: {
    select: { language: 'language' },
    prepare({ language }) {
      return {
        title: 'Página de inicio',
        subtitle: language?.toUpperCase() ?? 'Sin idioma',
      }
    },
  },
})
