# Scope Health

Marketing site for Scope Health, a medical tourism clinic.
React SPA (TanStack Router) with content managed in Sanity CMS, prerendered to static HTML and deployed on Netlify.

## Stack

- Vite, React 19, TanStack Router (file-based routing)
- Tailwind CSS v4 (design tokens in `src/styles.css`)
- Sanity CMS (project `3fyb50d2`, dataset `production`)
- Paraglide JS for UI strings (`es` base, `en`)
- Biome for lint and format, Vitest for tests
- Puppeteer for prerendering `/es` and `/en`

## Repository layout

```text
.
├── src/
│   ├── routes/          # file-based routes; real pages live under $lang/
│   ├── components/      # ui/, layout/, sections/, pages/
│   ├── lib/             # Sanity client, GROQ queries, fallbacks, SEO
│   └── paraglide/       # generated, do not edit
├── messages/            # UI strings: es.json (base), en.json
├── scripts/prerender.mjs
├── studio/              # Sanity Studio, separate package
└── netlify.toml
```

The frontend and `studio/` are independent packages with their own `node_modules`, and they deploy separately.

## Getting started

```bash
bun install
bun --bun run dev       # http://localhost:3000
```

Run the Studio locally:

```bash
cd studio
bun install
bun --bun run dev
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun --bun run dev` | Dev server on port 3000 |
| `bun --bun run build` | Production build, no prerender |
| `bun --bun run build:ssg` | Build and prerender, same as Netlify |
| `bun --bun run test` | Run Vitest |
| `bun --bun run check` | Biome lint and format check |
| `bun --bun run generate-routes` | Regenerate `src/routeTree.gen.ts` |
| `bun --bun run machine-translate` | Machine-translate messages via inlang |

## How it works

### Routing and locales

The locale is part of the URL (`/es`, `/en`).
`beforeLoad` in `src/routes/__root.tsx` reads the first path segment, redirects `/` and unknown locales to `/es`, and syncs the Paraglide locale.
Add new pages under `src/routes/$lang/`.
Never edit `src/routeTree.gen.ts`, it is generated.

### Content

Pages fetch content from Sanity at runtime through `src/lib/sanity.ts`, with GROQ queries in `src/lib/queries.ts`.
If a fetch fails or returns nothing, the page renders its fallback from `src/lib/*Fallback.ts`.
Sanity documents are per locale with IDs like `homePage-es` and `siteSettings-en`.

### UI strings

Static copy lives in `messages/es.json` and `messages/en.json`.
Add every key to both files, then use it with `m.key_name()` from `#/paraglide/messages.js`.

### Icons

Sanity stores icon names as strings.
They map to Lucide components in `src/components/Icon.tsx` through `ICON_MAP`, so add an entry there when using a new icon in content.

## Deployment

### Frontend (Netlify)

Netlify runs `npm run build:ssg` and publishes `dist/`.
The prerender step loads `/es` and `/en` in headless Chrome and writes real HTML with per-locale meta tags, so crawlers and link previews see full content.
A catch-all redirect handles client-side routes.

Because pages are prerendered, Sanity edits go live only after the next build.
Connect a Netlify build hook to a Sanity webhook (`cd studio && npx sanity hook create`) so publishing in the Studio triggers a redeploy.

### Studio (Sanity hosting)

```bash
cd studio && bun --bun run deploy
```

Re-deploy after any schema or structure change.
Editors need project membership, invited from <https://manage.sanity.io> with the Editor role.

## Conventions

- Spanish is the default language for all copy.
- Styles are mobile-first.
- Use semantic design tokens (`text-text-primary`, `bg-bg-page`) instead of raw colors.
- Sharp corners throughout, no border radius.
- Biome: tabs and double quotes. The Studio uses its own ESLint and Prettier config.

See `CLAUDE.md` for deeper architecture notes.
