import { CogIcon, HomeIcon } from '@sanity/icons'
import type { StructureResolver } from 'sanity/structure'

const LOCALES = [
  { id: 'es', title: 'Español' },
  { id: 'en', title: 'English' },
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Página de inicio')
        .icon(HomeIcon)
        .child(
          S.list()
            .title('Página de inicio')
            .items(
              LOCALES.map((locale) =>
                S.listItem()
                  .title(`Inicio — ${locale.title}`)
                  .icon(HomeIcon)
                  .child(
                    S.document()
                      .schemaType('homePage')
                      .documentId(`homePage-${locale.id}`)
                      .title(`Inicio (${locale.title})`)
                  )
              )
            )
        ),

      S.listItem()
        .title('Configuración del sitio')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Configuración del sitio')
            .items(
              LOCALES.map((locale) =>
                S.listItem()
                  .title(`Footer y contacto — ${locale.title}`)
                  .icon(CogIcon)
                  .child(
                    S.document()
                      .schemaType('siteSettings')
                      .documentId(`siteSettings-${locale.id}`)
                      .title(`Configuración (${locale.title})`)
                  )
              )
            )
        ),
    ])
