import {CogIcon} from '@sanity/icons/Cog'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {FolderIcon} from '@sanity/icons/Folder'
import {HomeIcon} from '@sanity/icons/Home'
import {UsersIcon} from '@sanity/icons/Users'
import type {StructureResolver} from 'sanity/structure'
import {PILLAR_TREE} from './pillarItems'

const LOCALES = [
  {id: 'es', title: 'Español'},
  {id: 'en', title: 'English'},
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
                      .title(`Inicio (${locale.title})`),
                  ),
              ),
            ),
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
                      .title(`Configuración (${locale.title})`),
                  ),
              ),
            ),
        ),

      S.divider(),

      // One folder per pillar → one entry per item → one editor per locale.
      ...PILLAR_TREE.map((pillar) =>
        S.listItem()
          .title(pillar.title)
          .icon(FolderIcon)
          .child(
            S.list()
              .title(pillar.title)
              .items(
                pillar.items.map((item) =>
                  S.listItem()
                    .id(`${pillar.title}-${item.slug}`)
                    .title(item.title)
                    .icon(DocumentTextIcon)
                    .child(
                      S.list()
                        .title(item.title)
                        .items(
                          LOCALES.map((locale) =>
                            S.listItem()
                              .title(`${item.title} — ${locale.title}`)
                              .icon(DocumentTextIcon)
                              .child(
                                S.document()
                                  .schemaType('pillarItem')
                                  .documentId(`pillarItem-${item.slug}-${locale.id}`)
                                  .title(`${item.title} (${locale.title})`),
                              ),
                          ),
                        ),
                    ),
                ),
              ),
          ),
      ),

      S.divider(),

      S.listItem()
        .title('Equipo médico')
        .icon(UsersIcon)
        .child(
          S.documentTypeList('teamMember')
            .title('Equipo médico')
            .defaultOrdering([
              {field: 'service', direction: 'asc'},
              {field: 'order', direction: 'asc'},
            ]),
        ),
    ])
