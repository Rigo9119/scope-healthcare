// Seeds the home page, site settings, pillar item pages and the medical team
// from the frontend fallbacks (src/lib/homeFallback.ts, siteSettingsFallback.ts,
// pillarContent.ts, team.ts). Documents already in the dataset are never
// overwritten; site settings only get their empty fields filled in.
//
//   cd studio && npx sanity exec scripts/seed-content.ts --with-user-token
//
// REPLACE_LOCALE=en replaces that locale's pillar item pages with the bundled
// copy (after a copy pass in pillarContent.ts). It discards Studio edits to them.
import {getCliClient} from 'sanity/cli'
import {HOME_FALLBACK} from '../../src/lib/homeFallback'
import {LOCALES} from '../../src/lib/localizedRoutes'
import {PILLAR_CONTENT} from '../../src/lib/pillarContent'
import {uniqueItems} from '../../src/lib/pillars'
import {SITE_SETTINGS_FALLBACK} from '../../src/lib/siteSettingsFallback'
import {TEAM_SEED} from '../../src/lib/team'

const client = getCliClient({apiVersion: '2025-06-24'})

// Sanity needs a unique `_key` on every object inside an array.
function withKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((v, i) =>
      v && typeof v === 'object' ? {_key: `k${i}`, ...withKeys(v)} : v,
    ) as T
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withKeys(v)])) as T
  }
  return value
}

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

// Array members of a named object type need `_type` to match the schema.
const typed = <T extends object>(items: T[], _type: string) => items.map((i) => ({_type, ...i}))

const isEmpty = (v: unknown) => v == null || v === '' || (Array.isArray(v) && v.length === 0)

const replaceLocale = process.env.REPLACE_LOCALE

const tx = client.transaction()

for (const locale of LOCALES) {
  const home = HOME_FALLBACK[locale]
  tx.createIfNotExists({
    _id: `homePage-${locale}`,
    _type: 'homePage',
    language: locale,
    ...withKeys({
      ...home,
      hero: {_type: 'hero', ...home.hero},
      stats: typed(home.stats, 'statItem'),
      journey: typed(home.journey, 'journeyStep'),
      reasons: typed(home.reasons, 'reason'),
      testimonials: typed(home.testimonials, 'testimonial'),
    }),
  })

  const settingsId = `siteSettings-${locale}`
  const settings = Object.fromEntries(
    Object.entries(SITE_SETTINGS_FALLBACK[locale]).filter(([, v]) => !isEmpty(v)),
  )
  tx.createIfNotExists({_id: settingsId, _type: 'siteSettings', language: locale})
  tx.patch(settingsId, (p) => p.setIfMissing(settings))
}

for (const {item} of uniqueItems()) {
  for (const locale of LOCALES) {
    const create = locale === replaceLocale ? 'createOrReplace' : 'createIfNotExists'
    tx[create]({
      _id: `pillarItem-${item.slug}-${locale}`,
      _type: 'pillarItem',
      language: locale,
      slug: item.slug,
      ...withKeys(PILLAR_CONTENT[locale][item.slug]),
    })
  }
}

TEAM_SEED.forEach((member, i) => {
  tx.createIfNotExists({
    _id: `teamMember-${slugify(member.name)}`,
    _type: 'teamMember',
    name: member.name,
    service: member.service,
    role: member.role,
    ...(member.credentials && {credentials: member.credentials}),
    order: i * 10,
  })
})

// No top-level await: `sanity exec` transpiles scripts to CJS.
tx.commit()
  .then((res) => console.log(`Seeded: ${res.results.length} documents (existing ones skipped).`))
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
