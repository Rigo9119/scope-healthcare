import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { documentInternationalization } from '@sanity/document-internationalization'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const LOCALES = [
  { id: 'es', title: 'Español' },
  { id: 'en', title: 'English' },
]

export default defineConfig({
  name: 'default',
  title: 'Scope Health',

  projectId: '3fyb50d2',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: LOCALES,
      schemaTypes: ['homePage'],
    }),
  ],

  schema: { types: schemaTypes },

  document: {
    newDocumentOptions: (prev) =>
      prev.filter((item) => item.templateId !== 'homePage'),
  },
})
