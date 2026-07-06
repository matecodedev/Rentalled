# Rental Led Landing Specification

## Purpose

Bilingual (ES/EN) mobile-first static landing page for **Rental Led**, a CABA/Buenos Aires LED screen rental and technical events company. Converts corporate and social event visitors into WhatsApp leads (primary CTA) and Instagram follows (secondary CTA). Positioned as a serious technical partner, not a generic template. Verified through build success, accessibility, SEO/GEO, performance, and visual review — not unit tests.

## Requirements

### Requirement: Bilingual Routing and Language Selector

The system MUST expose Spanish at `/` and English at `/en/`, with a visible `ES`/`EN` selector, `<html lang="es-AR">` and `<html lang="en">` per page, and cross-page `hreflang` (`es`, `en`, `x-default`).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Spanish homepage | visitor hits `/` | page renders | `<html lang="es-AR">` and copy/CTAs are in Spanish |
| English homepage | visitor hits `/en/` | page renders | `<html lang="en">`, copy is adapted English, `EN` is the active selector state |
| Round-trip via selector | visitor clicks `EN` on `/` | navigation completes | visitor lands on `/en/` equivalent and selector marks `EN` active |

### Requirement: Header and Navigation

Header MUST include logo, anchor nav (Hero, About, Services, Portfolio, Clients, FAQ, Contact), language selector, and a WhatsApp CTA. Mobile menu MUST trap focus and close on `Escape`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Desktop nav | ≥768px viewport | page loads | logo, anchors, language selector, and WhatsApp CTA are reachable inline |
| Mobile menu | <768px viewport | visitor opens menu | focus is trapped, links activate on Enter, `Escape` closes |
| Anchor scroll | nav link activation | scroll completes | URL hash updates and target heading sits below the sticky header |

### Requirement: Hero Section

Hero MUST lead with localized headline + subheadline and two CTAs (WhatsApp primary, Portfolio secondary). WhatsApp MUST stay above the fold on a 360×640 viewport.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| WhatsApp CTA | visitor activates primary CTA | link resolves | opens `https://wa.me/<digits>` for `+54 9 11 1234-5678` in a new tab |
| Secondary CTA | visitor activates secondary CTA | scroll completes | viewport reaches `#portfolio` without layout thrash |

### Requirement: About Section — Experience Framing

About MUST communicate **12+ years of experience in events / team experience**, not company age. Copy MUST use neutral framing like "más de 12 años de experiencia en eventos" (ES) and "12+ years of event experience" (EN), and MUST NOT claim a founding date unless verified.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| 12+ years phrasing | About renders | reviewer reads headline and supporting line | both reference event/team experience and never "since YYYY" |
| Bilingual preservation | visitor switches `ES` ↔ `EN` | About re-renders | experience claim is preserved with natural phrasing in each language |

### Requirement: Services Section

Services MUST list exactly five items (corporate LED, social LED, setup/operation, brands/agencies, venues/production companies) with localized titles and 1–2 sentence descriptions.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Five services | page loads | visitor reaches Services | five localized service cards render in order |

### Requirement: Portfolio Section

Portfolio MUST use only the 14 existing `portfolio/*.jpg` images plus `Logo.png` branding as a curated grid with descriptive alt text and category captions. Images MUST be optimized and lazy-loaded below the fold. The 4 MB `1000140534.jpg` MUST NOT appear above the fold.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Optimization and lazy loading | below-the-fold portfolio image | image renders | ships via Astro `<Image>`/`<Picture>` in modern formats (`avif`/`webp`), `loading="lazy"`, `decoding="async"`, reserved aspect ratio |
| No fabrication, no CLS | grid renders | reviewer inspects | all images have descriptive alt text, no layout shift, no fabricated captions |
| Orientation safety | any image with portrait/landscape | grid renders | no image overflows the grid cell, dimensions prevent CLS |

### Requirement: Clients / Trust Section

Clients MUST describe client types (companies, agencies, production companies, venues, social event organizers) without fabricating logos, testimonials, awards, or certifications.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Client types render | visitor reaches Clients | section renders | five client-type labels appear with a value proposition per type and no fake brand logos |

### Requirement: FAQ Section

FAQ MUST include at least 6 questions covering service area, event types, setup/operation, quote process, lead times, and technical support, bilingual and entity-rich (CABA, Buenos Aires, Argentina, LED screens, corporate events, social events).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| FAQ bilingual | visitor switches language | FAQ re-renders | same six+ topics appear with adapted Spanish/English copy |

### Requirement: Contact Section

Contact MUST show a WhatsApp CTA, an Instagram CTA, the CABA/Buenos Aires location, and short trust-oriented closing copy. The system MUST NOT include a contact form.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| WhatsApp and Instagram CTAs | visitor reaches Contact | section renders | WhatsApp opens `https://wa.me/<digits>` for `+54 9 11 1234-5678` and Instagram links to `https://instagram.com/rentalled.ba` (placeholder) in a new tab |
| No contact form | Contact DOM | reviewer inspects | no `<form>`, `<input>`, `<textarea>`, or submit control is rendered |

### Requirement: Centralized Content and Contact Configuration

A single source (e.g., `src/content/site.ts`) MUST hold all bilingual copy, contact placeholders, navigation labels, SEO metadata, and structured-data fields. Replacing WhatsApp or Instagram MUST require editing only that file.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Single-source replacement | centralized content file | maintainer changes WhatsApp number | every CTA, header link, and JSON-LD reference updates from that single edit |

### Requirement: SEO Metadata

Per language, the system MUST set unique `<title>`, `<meta name="description">`, canonical URL, Open Graph, and Twitter card tags. Both pages MUST cross-link via `hreflang`. A `robots.txt` and sitemap MUST be served.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Per-language metadata | `/` and `/en/` | pages render | each has unique title/description in its own language plus canonical, OG, and Twitter card tags |
| Sitemap and robots | build completes | visitor requests `/sitemap-index.xml` and `/robots.txt` | valid sitemap listing both locales and a robots file allowing crawl are served |

### Requirement: Structured Data (JSON-LD)

The system MUST embed JSON-LD for `Organization`, `LocalBusiness`, `Service`, and `FAQPage`, using only truthful known facts (placeholder contact, location, services, FAQ content).

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Schemas validate | page renders | JSON-LD blocks are inspected | each parses as valid JSON, contains required fields, and references the centralized content |

### Requirement: Image Optimization

Local images MUST be imported through `astro:assets` and rendered with `<Image>`/`<Picture>` for responsive `srcset`, modern formats, and reserved aspect ratios. The system MUST ignore `.DS_Store`.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Modern formats and CLS prevention | any image renders | response is captured | `<picture>`/`<img srcset>` includes at least one `avif`/`webp` source and explicit dimensions prevent CLS |

### Requirement: Responsive / Mobile-First Behavior

Layouts MUST be authored mobile-first and MUST avoid horizontal scroll at any viewport ≥320px.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Mobile viewport | 360×640 viewport | page loads | all sections fit without horizontal scroll, WhatsApp CTA stays above the fold, and interactive hit areas are ≥44×44 CSS pixels |

### Requirement: Animation and Motion

Motion MUST use CSS transitions/animations on `transform` and `opacity` only. The system MUST respect `prefers-reduced-motion: reduce`. GSAP SHOULD NOT be added unless a high-value choreography cannot be expressed in CSS.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Reduced motion and performant motion | any motion would play | OS reports `prefers-reduced-motion: reduce` OR element animates | motion is suppressed/replaced OR animates only `transform`/`opacity`, never layout-heavy properties |

### Requirement: Accessibility

The system MUST use semantic landmarks, visible focus, descriptive alt text, keyboard-accessible controls, and color contrast ≥4.5:1 for body text.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Keyboard navigation and alt text | keyboard-only user and any image | user Tabs OR image is inspected | every interactive element is reachable with visible `:focus-visible` AND every meaningful image has descriptive alt text in the page language |

### Requirement: Performance

The build MUST be statically generated with minimal client JavaScript. Portfolio images MUST lazy-load. Mobile Lighthouse (Performance, Accessibility, Best Practices, SEO) SHOULD each score ≥90.

| Scenario | Given | When | Then |
|----------|-------|------|------|
| Static output and lean JS | `npm run build` | build completes | output contains pre-rendered `index.html` and `en/index.html`, no client framework hydration is required, and total client JS SHOULD be <50 KB gzipped |

## Out of Scope (this change)

Contact form, CMS, pricing engine, packages. Fabricated clients/testimonials/awards/certifications. Real WhatsApp/Instagram numbers and final production domain (placeholders only).