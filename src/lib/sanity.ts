import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '3fyb50d2',
  dataset: 'production',
  apiVersion: '2025-06-24',
  useCdn: true,
})
