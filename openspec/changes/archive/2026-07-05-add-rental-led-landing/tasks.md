# Tasks: Rental Led Landing Page

## Review Workload Forecast

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

Estimated changed lines ~900–1100. Delivery: auto-chain. Split: PR 1 → PR 2 → PR 3 → PR 4. Chain strategy `feature-branch-chain`; PR 1 targets the feature/tracker branch, later PRs target the immediate previous PR branch, and the tracker PR aggregates the feature branch to `main`.

| Unit | Goal | PR |
|------|------|----|
| 1 | Scaffold, base layout, content, tokens, i18n shell | PR 1 |
| 2 | 9 sections, portfolio pipeline, menu, ES/EN routes | PR 2 |
| 3 | SEO/GEO, JSON-LD, sitemap, hreflang/canonical/OG/Twitter | PR 3 |
| 4 | Motion polish, a11y, build + Lighthouse verification | PR 4 |

## Phase 1 — Foundation & Content Core (PR 1)

- [x] 1.1 Create `package.json`, `astro.config.mjs` (static + sitemap), `tsconfig.json`.
- [x] 1.2 Add `src/content/site.ts` (`Locale`, `ContactConfig`, `LocalizedPage`, `PortfolioItem`, `FaqItem`; ES/EN copy, nav, services, FAQ, portfolio descriptors).
- [x] 1.3 Build `src/styles/global.css`: near-black + cyan LED tokens, `Antonio` + `Manrope`, responsive primitives, focus-visible, reduced-motion query.
- [x] 1.4 Build `src/layouts/BaseLayout.astro` with `lang` prop, head slot, JSON-LD slot.
- [x] 1.5 Add `public/robots.txt` referencing sitemap.
- [x] 1.6 `npm run build` succeeds and `dist/index.html` has correct `lang`.

## Phase 2 — Sections, Routes & Portfolio (PR 2)

- [x] 2.1 `Header.astro` (logo, anchor nav, ES/EN selector, WhatsApp CTA) + `src/scripts/nav.ts` (focus-trap, `Escape`).
- [x] 2.2 `Hero.astro` with bilingual headline/sub + dual CTAs; WhatsApp above 360×640.
- [x] 2.3 `About.astro`: "12+ años de experiencia en eventos" / "12+ years of event experience" — no founding date.
- [x] 2.4 `Services.astro` with 5 cards: corporate LED, social LED, setup/operation, brands/agencies, venues/production.
- [x] 2.5 `Portfolio.astro` importing 14 `portfolio/*.jpg` + `Logo.png` via `astro:assets` `<Picture>`; AVIF/WebP, lazy below fold, alt text, reserved aspect ratios; `1000140534.jpg` out of fold.
- [x] 2.6 `Clients.astro` with 5 client types (no fake logos/testimonials/awards).
- [x] 2.7 `Faq.astro` with ≥6 bilingual, entity-rich Q/A (CABA, Buenos Aires, Argentina, LED, events).
- [x] 2.8 `Contact.astro` + `Footer.astro` (WhatsApp + Instagram CTAs, CABA/Buenos Aires; NO `<form>`).
- [x] 2.9 `src/pages/index.astro` + `src/pages/en/index.astro` composing sections.

## Phase 3 — SEO, GEO & JSON-LD (PR 3)

- [x] 3.1 `Seo.astro` deriving per-locale `<title>`, `description`, canonical, OG, Twitter from `site.ts`.
- [x] 3.2 Add `hreflang` (`es`, `en`, `x-default`) + cross-language links in `BaseLayout` head.
- [x] 3.3 Embed JSON-LD: `Organization`, `LocalBusiness`, `Service`, `FAQPage` from `site.ts`.
- [x] 3.4 Wire `@astrojs/sitemap`; `dist/sitemap-index.xml` points to `sitemap-0.xml`, and `dist/sitemap-0.xml` lists `/` + `/en/`.
- [x] 3.5 Validate JSON-LD parses and SEO/schema/sitemap output with `scripts/check-seo.mjs` / `npm run check:seo`.

## Phase 4 — Motion, A11y & Verification (PR 4)

- [x] 4.1 Add CSS-only `transform`/`opacity` transitions (hero, portfolio hover, FAQ); no GSAP unless clearly justified.
- [x] 4.2 Enforce `prefers-reduced-motion: reduce` in `global.css`.
- [x] 4.3 Mobile-first sweep 320–1440px: no horizontal scroll, hit areas ≥44×44 CSS px.
- [x] 4.4 Keyboard: Tab order, focus-visible, menu `Escape` close, no `<form>`.
- [x] 4.5 `npm run build`; `dist/index.html` + `dist/en/index.html` exist; client JS < 50KB gzipped.
- [x] 4.6 Mobile Lighthouse (Perf/A11y/Best Practices/SEO) ≥ 90; remediate before merge.
