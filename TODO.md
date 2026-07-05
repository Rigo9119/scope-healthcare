# Pre-launch TODO

Tracked items before going live. Sanity content structure is handled separately.

---

## Blocking — must fix before launch

- [ ] **`manifest.json`** — replace scaffolding defaults
  - `short_name`: `"TanStack App"` → `"Scope Health"`
  - `name`: `"Create TanStack App Sample"` → `"Scope Health | Turismo médico en Bogotá"`
  - `theme_color`: `"#000000"` → `"#1059b5"`

- [ ] **Real contact data** — replace placeholders once client confirms
  - `index.html` JSON-LD: `telephone`, `email`, `address` (Google indexes this)
  - `src/lib/siteSettingsFallback.ts`: phone, email, address (shown if Sanity is unreachable)
  - `src/lib/homeFallback.ts`: `ctaPhone`

- [ ] **OG / social share image** — create a 1200×630 banner
  - Current default (`/logo512.png`) is a square logo; WhatsApp and Facebook will crop it
  - Replace `DEFAULT_OG_IMAGE` in `src/lib/seo.ts` once the banner is ready

- [ ] **Footer legal links** — `href="#"` on privacy, terms, cookies, and company nav items
  - Either wire real URLs or remove the links before launch to avoid crawled dead links

- [ ] **Inner pages** — placeholder content is worse for SEO than a "coming soon" state
  - ServicesPage, TeamPage, BlogPage, AboutPage, ContactPage all render stubs
  - Decide per page: real content, a holding page, or remove from navbar/sitemap until ready

---

## Infrastructure — required for the site to work correctly

- [ ] **Sanity webhook** — without this, published content never goes live
  ```bash
  cd studio && npx sanity hook create
  # name: "Netlify rebuild", dataset: production, trigger on create/update/delete
  # URL: Netlify → Site configuration → Build & deploy → Build hooks
  ```

- [ ] **Sanity Studio deploy** — client cannot edit content without it
  ```bash
  cd studio && bun --bun run deploy
  ```
  Then invite the client at manage.sanity.io → project Scope Health → Members → Invite (role: Editor).

---

## Domain migration — do when the custom domain is live

- [ ] **`SITE_URL`** in `src/lib/seo.ts:6` — drives all canonical, OG, and hreflang tags
- [ ] **`public/sitemap.xml`** — all `<loc>` and `<xhtml:link>` entries
- [ ] **`public/robots.txt:6`** — Sitemap directive URL
- [ ] **`index.html:25`** — JSON-LD `"url"` field

---

## Nice-to-have before launch

- [ ] **Analytics** — nothing wired yet; client will have zero traffic visibility from day one
  - Options: Google Analytics 4, GTM, or Plausible (privacy-friendly)
