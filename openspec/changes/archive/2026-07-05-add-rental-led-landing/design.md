# Design: Rental Led Landing Page

## Technical Approach

Build a static Astro landing page with Spanish at `/` and English at `/en/`. The project was verified as greenfield: no `package.json`, source tree, tooling, or test runner exists yet; current assets are `Logo.png`, 14 `portfolio/*.jpg` files, and OpenSpec artifacts. Implementation should scaffold Astro, centralize all content/contact/SEO/schema data, render semantic section components, and keep JavaScript limited to the mobile menu/focus trap and optional progressive enhancements.

The committed art direction is cinematic event-tech: near-black surfaces, cyan LED glow derived from the logo, editorial asymmetric image composition, high contrast, and a self-hosted typography pairing such as `Antonio` for display headings plus `Manrope` for body copy. Avoid generic SaaS gradients, fake proof, or template card walls.

## Architecture Decisions

| Decision | Choice | Alternatives considered | Rationale |
|---|---|---|---|
| Framework | Astro static output | React SPA, plain HTML | Astro fits SEO/GEO, image optimization, low JS, and bilingual static routes. |
| Content source | `src/content/site.ts` as the single source for ES/EN copy, contact, SEO, FAQ, portfolio metadata, and JSON-LD inputs | Hardcoded section copy | One edit replaces WhatsApp/Instagram everywhere and prevents schema/content drift. |
| Motion | CSS-first `transform`/`opacity`; no GSAP baseline | GSAP/ScrollTrigger-first choreography | Meets premium transition needs while protecting mobile performance and reduced-motion users. If GSAP is later justified, scope it with `gsap.matchMedia()` and avoid layout properties. |
| Images | Import local images through `astro:assets` `<Picture>`/`<Image>`; lazy-load portfolio below fold | Raw `/public` images | Generates AVIF/WebP/srcset, dimensions, and prevents CLS. `1000140534.jpg` must not be above the fold. |

## Data Flow

```txt
src/content/site.ts
  ├─ locales/nav/sections ──→ pages/index.astro + pages/en/index.astro
  ├─ contact/social links ──→ Header/Hero/Contact/Footer + JSON-LD
  ├─ SEO/GEO metadata ─────→ BaseLayout + Seo.astro
  └─ portfolio metadata ───→ Portfolio.astro ──→ astro:assets images
```

## File Changes

| File | Action | Description |
|---|---|---|
| `package.json`, `astro.config.mjs`, `tsconfig.json` | Create | Astro static setup, scripts, sitemap integration, i18n/site config. |
| `src/content/site.ts` | Create | Localized copy, contacts, metadata, FAQ, schema, portfolio descriptors. |
| `src/layouts/BaseLayout.astro`, `src/components/Seo.astro` | Create | HTML lang, metadata, canonical/hreflang, JSON-LD, theme color. |
| `src/pages/index.astro`, `src/pages/en/index.astro` | Create | Localized route composition. |
| `src/components/{Header,Hero,About,Services,Portfolio,Clients,Faq,Contact,Footer}.astro` | Create | Semantic landing sections and CTA/navigation behavior. |
| `src/styles/global.css` | Create | Design tokens, responsive layout, focus states, reduced motion, transitions. |
| `src/assets/logo.png`, `src/assets/portfolio/*.jpg` | Create/Move | Asset pipeline inputs; ignore `.DS_Store`. |
| `src/scripts/nav.ts` | Create | Small focus-trapped mobile menu with `Escape` close. |
| `public/robots.txt` | Create | Crawl rules; sitemap reference when domain is known. |

## Interfaces / Contracts

```ts
type Locale = 'es' | 'en';
type ContactConfig = { whatsappDisplay: string; whatsappUrl: string; instagramUrl: string; location: string };
type PortfolioItem = { src: ImageMetadata; alt: Record<Locale, string>; category: Record<Locale, string>; featured?: boolean };
type LocalizedPage = { seo: SeoMeta; nav: NavItem[]; sections: LandingSections; faq: FaqItem[] };
```

All CTAs MUST use `site.contact`; all metadata/schema MUST derive from localized page data. Spanish UI copy should be neutral/professional, not persona-styled.

## Testing Strategy

| Layer | What to Test | Approach |
|---|---|---|
| Build/static | Astro build, static `/` and `/en/`, sitemap/robots | `npm run build`; inspect `dist/index.html`, `dist/en/index.html`. |
| Integration | hreflang/canonical, JSON-LD validity, CTA URLs, no contact form, image `srcset`/dimensions/lazy loading | Manual DOM review or lightweight scripts after build. |
| UX/accessibility | 320–1440px responsive behavior, 360×640 above-fold WhatsApp, keyboard menu, focus, contrast, reduced motion | Manual browser review plus Lighthouse target ≥90 in Performance/A11y/Best Practices/SEO. |

## Migration / Rollout

No migration required. Because force-chained delivery and a 400-line review budget are active, implement in review slices: scaffold/SEO shell, content+i18n, sections+assets, then motion/performance verification.

## Open Questions

- [ ] Final production domain for canonical URLs, sitemap, and social previews.
- [ ] Real WhatsApp number and Instagram handle.
- [ ] Whether service area copy should include AMBA beyond CABA/Buenos Aires.
- [ ] How explicitly to phrase “accessible pricing” in premium copy.
