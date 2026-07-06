## Exploration: add-rental-led-landing

### Current State

Rental Led is a greenfield landing-page project. There is no `package.json`, Astro scaffold, source code, test runner, linter, formatter, or CI yet. SDD has already been initialized in hybrid mode with OpenSpec files under `openspec/` and Engram project context under `sdd-init/rentalled`.

The brief defines a premium, mobile-first, bilingual landing page for a CABA/Buenos Aires LED screen rental and technical event-production company. The primary conversion path is WhatsApp; Instagram is secondary; there is no contact form. Spanish must live at `/`, English at `/en/`, with adapted copy rather than literal translation.

Asset inspection found:

- `Logo.png` — 1201×1457 PNG, 450 KB. Visual identity is near-black with cyan/white LED glow and a stylized `R`, which strongly supports a dark event-tech direction.
- `portfolio/*.jpg` — 14 real event images, mostly 95–303 KB plus one heavy `1000140534.jpg` at ~4 MB / 4096×3072. The set includes corporate stages, LED video walls, booth/event setups, and social/corporate venue contexts.
- Image orientations vary: portrait, landscape, and at least one file that requires careful orientation/crop review before final placement.
- `.DS_Store` exists and must be ignored.

Astro remains the best technical fit: current Astro docs support static output, zero/minimal JavaScript by default, local image optimization through `astro:assets`, responsive `srcset` generation with constrained image layouts, and i18n routing/sitemap support.

### Affected Areas

- `rental-led-landing-sdd-brief.md` — source of product intent, copy direction, SEO/GEO requirements, acceptance criteria, and placeholder contact details.
- `Logo.png` — primary brand asset; should drive the palette and be optimized before production use.
- `portfolio/*.jpg` — credibility/proof assets; must be optimized, cropped, lazy-loaded below the fold, and given descriptive alt text.
- `openspec/config.yaml` — current SDD rules already encode Astro, bilingual routes, SEO/GEO, animation/performance, and review-budget constraints.
- `openspec/changes/add-rental-led-landing/exploration.md` — this exploration artifact.
- Future `src/content/site.ts` or equivalent — should centralize ES/EN copy, contact placeholders, navigation, SEO metadata, schema data, and social links.
- Future `src/pages/index.astro` and `src/pages/en/index.astro` — static localized routes.
- Future `src/components/*` and `src/layouts/*` — landing sections, base layout, SEO/schema handling, and reusable CTA/navigation components.
- Future `src/assets/` or equivalent — optimized source location for logo and portfolio images imported by Astro image tooling.

### Approaches

1. **Static Astro premium editorial landing** — Build a static Astro site with semantic HTML, centralized bilingual content, Astro image optimization, CSS-first motion, and a distinctive dark event-tech visual system.
   - Pros: best fit for SEO/GEO, fast static output, minimal JS, strong mobile performance, easy bilingual routes, direct alignment with the brief.
   - Cons: still requires deliberate design/copy work; Astro must be scaffolded in a later phase; typography and image curation need taste, not just components.
   - Effort: Medium

2. **Animation-heavy framework landing** — Scaffold a React-heavy or GSAP-first experience with richer runtime animation and interactive effects.
   - Pros: high motion ceiling; easier to choreograph complex timelines if the brand needs a showpiece intro.
   - Cons: unnecessary JS for this conversion landing, higher performance risk, more review surface, and easier to drift into generic animated-template territory.
   - Effort: High

3. **Minimal brochure-style static page** — Build a simpler Astro or static HTML page with limited sections, simple cards, and light styling.
   - Pros: fastest to ship; lower implementation risk; small review surface.
   - Cons: unlikely to meet the premium visual target; weaker differentiation; portfolio and service credibility would feel underused.
   - Effort: Low

### Recommendation

Use **Approach 1: Static Astro premium editorial landing**.

Product direction:

- Commit to a **cinematic event-tech** aesthetic: near-black base, cyan LED accents derived from the logo, restrained secondary highlights, sharp contrast, deep stage-like surfaces, and editorial composition.
- Avoid generic AI-template patterns: no purple-on-white SaaS gradients, no predictable card wall, no fake client logos, no fabricated testimonials, no invented certifications.
- Lead mobile users quickly to contact: above-the-fold WhatsApp CTA, secondary portfolio CTA, visible ES/EN selector, and a persistent but non-invasive mobile contact affordance if it does not hurt accessibility.
- Treat the portfolio as proof of capability: use a curated hero/portfolio grid with real images, clear captions/categories, and honest trust language around client types rather than brand names.
- Use the Clients/Trust section to describe audiences served: companies, agencies, production companies, venues, and social event organizers.

Copy direction:

- Spanish should be the primary experience for Buenos Aires buyers; English should be naturally adapted for international/corporate search intent.
- Position Rental Led as a technical partner: LED screens, setup, operation, planning support, and event-day reliability.
- Include FAQ content for GEO/LLMO and conversion, covering service area, event types, setup/operation, quote process, lead times, and technical support.
- Keep all contact placeholders centralized for replacement: WhatsApp `+54 9 11 1234-5678` and Instagram `@rentalled.ba`.

Technical direction:

- Scaffold Astro later with `output: 'static'`, `site` configured once the production domain exists, and routes `/` + `/en/`.
- Use Astro i18n or explicit localized pages with default Spanish unprefixed and English under `/en/`; include `lang="es-AR"` and `lang="en"`, canonical URLs, and `hreflang`/alternate links.
- Use `@astrojs/sitemap` once the production domain is known; include `robots.txt`.
- Use `astro:assets` `<Image>`/`<Picture>` for local images, constrained responsive layouts, explicit dimensions, `decoding="async"`, eager/fetch-priority treatment only for above-the-fold imagery, and `loading="lazy"` for portfolio images below the fold.
- Generate modern formats (`avif`, `webp` where appropriate) and avoid sending the 4 MB source directly to mobile.
- Reserve image aspect ratios to prevent CLS; define intentional crops for portrait/landscape assets.
- Add JSON-LD for `Organization`, `LocalBusiness`, `Service`, and `FAQPage`, using only truthful known facts.
- Prefer CSS transitions/reveals using `transform` and `opacity`; never use `transition: all`; respect `prefers-reduced-motion`.
- Do not add GSAP by default. Add it only if the final design has a high-value hero/section choreography that CSS cannot express cleanly. If used, keep it scoped, use `gsap.matchMedia()`, animate transform/opacity, and avoid ScrollTrigger unless clearly justified.
- Follow web interface basics: semantic headings, skip link, visible `:focus-visible`, accessible icon labels, `<a>` for WhatsApp/Instagram navigation, comfortable tap targets, safe-area spacing, `color-scheme: dark`, matching `theme-color`, and descriptive alt text.

Delivery direction:

- The full landing will likely exceed the 400 changed-line review budget if implemented in one pass. `sdd-tasks` should forecast chained PR slices such as scaffold/base SEO, content/i18n, sections/assets, and animation/performance verification.

### Risks

- Final production domain is unknown, so canonical URLs, sitemap `site`, and social preview URLs need placeholders or a clear later replacement point.
- Contact details are placeholders; WhatsApp and Instagram links must remain centralized to avoid scattered replacements.
- Portfolio image quality/orientation varies, and the 4 MB image can harm performance if not transformed or excluded from early viewports.
- No real client names/logos/testimonials are available; trust must be built through service clarity, process, location, and real portfolio imagery.
- Premium visual quality depends on a strong typography and art-direction decision during design; a generic component layout would fail the business goal even if technically correct.
- Animation can easily hurt mobile performance if overdone; CSS-first motion and reduced-motion support must be treated as requirements, not polish.

### Ready for Proposal

Yes. The proposal should commit to a static Astro implementation, premium dark event-tech art direction, bilingual ES/EN routing, centralized content/contact configuration, Astro image optimization, honest trust-building copy, SEO/GEO structured data, CSS-first animation, and review-budget-aware delivery planning.
