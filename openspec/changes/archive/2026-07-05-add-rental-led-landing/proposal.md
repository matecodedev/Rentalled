# Proposal: Rental Led Landing Page

## Intent

Build a premium, mobile-first, bilingual landing page that turns corporate and social event visitors into WhatsApp leads. Rental Led needs a credible online surface for organizers, producers, agencies, and venues, using real portfolio imagery plus owned operation/screens, indoor 2.6 mm and outdoor 3.9 mm capability, 12+ years of event experience, fast response, accessible pricing, responsibility, and personalized attention.

## Proposal Question Round

- Validate whether service area copy should remain “CABA/Buenos Aires” or include AMBA.
- Validate whether “12+ years” refers to the company or team experience.
- Validate how explicitly “accessible pricing” should appear in premium copy.

Assumptions: corporate/social events have equal priority; only real photos; no client names, testimonials, awards, or certifications unless supplied.

## Scope

### In Scope
- ES `/` and EN `/en/` Astro landing: header, hero, about, services, real-photo portfolio, client-types/trust, FAQ, contact, footer.
- Centralized ES/EN content, WhatsApp/Instagram placeholders, SEO/GEO metadata, JSON-LD, sitemap/robots.
- Premium cinematic event-tech UX: dark base, LED accents, strong typography, mobile CTAs, CSS-first motion, reduced-motion and accessibility basics.
- Performance-ready image strategy: `Logo.png`, `portfolio/*.jpg`, responsive formats, reserved aspect ratios, lazy loading below fold.

### Out of Scope
- Implementation in this phase; contact form, CMS, pricing engine, packages, fabricated brands/testimonials/certifications.

## Capabilities

### New Capabilities
- `rental-led-landing`: bilingual conversion landing, content, SEO/GEO, i18n, asset, performance, animation, and accessibility requirements.

### Modified Capabilities
- None.

## First Slice

Scaffold Astro static site, centralized content/contact config, base layout, SEO/i18n shell, and asset pipeline before section buildout.

## Approach

Use the exploration recommendation: static Astro, minimal JavaScript, centralized localized content, `astro:assets`, semantic HTML, and commercial trust-building copy adapted per language. Motion stays CSS transform/opacity-first; GSAP is deferred unless a high-value design need appears.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/content/site.ts` | New | Copy, contact, SEO, schema source |
| `src/pages/index.astro`, `src/pages/en/index.astro` | New | Localized landing routes |
| `src/components/*`, `src/layouts/*` | New | Landing sections/layout |
| `src/assets/`, `portfolio/*.jpg`, `Logo.png` | Modified | Optimized image usage |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Unknown domain/contact | Med | Centralize placeholders |
| Generic premium look | Med | Commit visual direction in design |
| Image weight/orientation | Med | Curate, crop, optimize, lazy-load |
| Review budget exceeds 400 lines | High | `sdd-tasks` should forecast chained PR slices |

## Rollback Plan

Proposal-only rollback: remove this file and Engram artifact. Later implementation rollback: revert Astro scaffold/content/assets slice by slice.

## Dependencies

- Existing assets, final domain/contact details, and user validation of the question round.

## Success Criteria

- [ ] Bilingual ES/EN landing PRD is spec-ready.
- [ ] Scope excludes fabricated proof and contact form.
- [ ] SEO/GEO, i18n, performance, animation, accessibility, and content constraints are explicit.
