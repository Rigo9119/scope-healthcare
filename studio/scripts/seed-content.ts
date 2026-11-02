// Seeds pillar item pages and the medical team from the frontend fallbacks
// (src/lib/pillarContent.ts, src/lib/team.ts), which hold the client's doc.
// Uses createIfNotExists: documents already in the dataset are never touched.
//
//   cd studio && npx sanity exec scripts/seed-content.ts --with-user-token
import {getCliClient} from 'sanity/cli'
import {PILLAR_CONTENT} from '../../src/lib/pillarContent'
import {uniqueItems} from '../../src/lib/pillars'
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

const tx = client.transaction()

for (const {item} of uniqueItems()) {
  for (const locale of ['es', 'en'] as const) {
    tx.createIfNotExists({
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
