# Rental Led Landing Page — SDD Brief

## Purpose

Create a high-performance, mobile-first landing page for **Rental Led**, a modern LED screen rental and technical production company based in **CABA, Buenos Aires, Argentina**.

The site must present Rental Led as a young but highly professional company capable of delivering reliable LED screen solutions for corporate, social, and production-driven events.

The final result should feel premium, trustworthy, modern, and commercially effective — closer to the standard of an experienced multinational production company than a small generic local landing page.

## SDD Recommendation

Yes: start with **SDD init** before implementation.

Recommended flow:

1. Run `sdd-init` for this project.
2. Create an SDD change from this brief.
3. Explore the current folder, assets, logo, and portfolio images.
4. Produce proposal, spec, design, and tasks.
5. Implement only after the SDD artifacts are ready.
6. Verify build, SEO structure, responsive behavior, image optimization, and animation performance.

This project is small enough to build quickly, but SDD is still useful because the landing combines branding, UX/UI, SEO, GEO/LLMO, i18n, image optimization, performance, and conversion copy. Those decisions should be explicit before coding.

## Business Context

### Brand

- Company name: **Rental Led**
- Location: **CABA, Buenos Aires, Argentina**
- Industry: LED screen rental and technical services for events
- Company stage: young, modern, growing
- Desired perception: professional, reliable, premium, technically capable

### Target Audience

Rental Led should appeal to:

- Corporate event organizers
- Event production companies
- Brands and agencies
- Social event planners
- Venues and halls
- Clients who need LED screens and reliable technical operation

### Main Business Goal

Convert visitors into leads through direct contact.

Primary conversion path:

- WhatsApp CTA

Secondary conversion path:

- Instagram CTA

There should be **no contact form for now**.

## Contact Placeholders

Use temporary contact details until real ones are provided.

- WhatsApp placeholder: `+54 9 11 1234-5678`
- Instagram placeholder: `@rentalled.ba`

These must be easy to replace later from a single place if possible.

## Existing Assets

The project folder currently contains:

- `Logo.png`
- `portfolio/` folder with several JPG portfolio images

The implementation should inspect the actual images before deciding how to use them.

### Asset Requirements

- Use the existing logo.
- Use the portfolio images as proof of work and visual credibility.
- Optimize images for fast loading.
- Avoid loading unnecessarily large images on mobile.
- Use responsive image techniques.
- Use lazy loading for portfolio images that are not immediately visible.
- Reserve dimensions or aspect ratios to avoid layout shift.
- Remove or ignore system files such as `.DS_Store`.

## Recommended Technology Stack

Use **Astro** unless exploration reveals a strong reason not to.

### Why Astro

Astro is the recommended stack for this type of landing because:

- It produces very fast static pages.
- It ships minimal JavaScript by default.
- It is excellent for SEO-focused content sites.
- It supports image optimization through Astro assets.
- It works well for bilingual static routes.
- It allows polished UI without unnecessary framework overhead.

Avoid React unless there is a specific reason. For this landing, Astro components, semantic HTML, modern CSS, and a tiny amount of JavaScript should be enough.

## Language Requirements

The landing must support two languages:

- Spanish: `/`
- English: `/en/`

There must be a visible language selector:

- `ES`
- `EN`

The copy should be adapted naturally for each language, not translated word-for-word.

### HTML Language

Each version must use the correct `lang` attribute:

- Spanish page: `lang="es-AR"` or `lang="es"`
- English page: `lang="en"`

## Required Sections

The landing must include these sections:

1. Header / Navigation
2. Home / Hero
3. Nosotros / About
4. Servicios / Services
5. Portfolio
6. Clientes / Clients
7. Contacto / Contact
8. Footer

## UX/UI Direction

The landing must be **mobile-first** and feel professional at a high level.

### Visual Style

Recommended design direction:

- Premium dark or near-dark base
- LED-inspired accents
- High contrast
- Modern light effects used with restraint
- Strong typography
- Clean spacing
- Editorial composition
- Professional event-production feeling
- Visual credibility through portfolio imagery

The site should look modern and custom, not like a generic landing template.

### Design Principles

- Mobile-first layout.
- Clear hierarchy.
- Strong first impression above the fold.
- CTAs always easy to find.
- Sections should scan quickly.
- Use portfolio visuals to build trust.
- Make services easy to understand.
- Avoid clutter.
- Avoid generic AI-looking gradients or cookie-cutter cards.

## Animation And Transition Requirements

The landing must include modern, polished transitions.

### Animation Goals

Animations should make the site feel premium, not heavy.

Use motion to guide attention, support hierarchy, and make the experience feel refined.

### Suggested Animations

- Hero content reveal on load.
- Subtle staggered reveal for headline, subtitle, and CTAs.
- Smooth section reveal on scroll.
- Portfolio image hover states.
- Service card hover interactions.
- CTA button microinteractions.
- Header transition on scroll if appropriate.
- Language selector hover/focus states.

### Performance Rules

- Prefer CSS transitions and animations where possible.
- Animate `transform` and `opacity`.
- Avoid animating layout-heavy properties such as `width`, `height`, `top`, or `left`.
- Respect `prefers-reduced-motion`.
- Do not add heavy animation libraries unless they clearly improve the result.
- If GSAP is used, use it sparingly and only for high-value motion.

## SEO Requirements

Implement strong technical SEO.

### Required SEO Features

- Unique page title per language.
- Meta description per language.
- Canonical URL.
- Open Graph metadata.
- Twitter card metadata.
- Sitemap.
- `robots.txt`.
- Semantic headings.
- Correct `lang` attributes.
- Descriptive image alt text.
- Fast loading.
- Mobile-first responsive design.
- Accessible interactive elements.

### Suggested Spanish SEO Keywords

Use naturally, without keyword stuffing:

- alquiler de pantallas LED
- pantallas LED para eventos
- pantallas LED CABA
- pantallas LED Buenos Aires
- técnica para eventos
- pantallas LED para eventos corporativos
- pantallas LED para eventos sociales
- producción técnica para eventos

### Suggested English SEO Keywords

Use naturally:

- LED screen rental Buenos Aires
- LED screens for events
- LED video wall rental
- corporate event LED screens
- social event LED screens
- event technical production Buenos Aires

## GEO / LLMO Requirements

The landing must also be optimized for AI answer engines such as ChatGPT, Gemini, and Claude.

This is sometimes referred to as GEO, AEO, or LLMO.

### Goal

Make it easy for AI systems to understand:

- Who Rental Led is.
- What Rental Led offers.
- Where Rental Led operates.
- Which types of clients Rental Led serves.
- Why Rental Led is trustworthy.
- How to contact Rental Led.

### Content Requirements For GEO / LLMO

- Clearly state that Rental Led provides LED screens and technical services for events.
- Clearly mention CABA, Buenos Aires, Argentina.
- Mention corporate events and social events.
- Include specific service descriptions.
- Include FAQ content.
- Use natural language, not vague marketing filler.
- Create entity-rich copy around the brand.
- Avoid empty phrases that do not explain the business.

### Structured Data

Add JSON-LD where appropriate.

Recommended schema types:

- `Organization`
- `LocalBusiness`
- `Service`
- `FAQPage`

If possible, include:

- Company name
- Location
- Service area
- Services offered
- Contact links
- Social profile placeholder

## Copywriting Direction

The copy must be:

- Professional
- Trust-building
- Commercial
- Clear
- Direct
- Slightly relaxed/descontracturado
- Not cold or corporate-generic
- Not exaggerated
- Focused on getting users to ask for a quote

The tone should make Rental Led sound like a serious technical partner, not just an equipment rental supplier.

### Core Message

Rental Led helps events look sharp and run smoothly by providing LED screens, setup, and technical operation with professional support from planning to execution.

### Suggested Spanish Hero Copy

Headline:

> Pantallas LED para eventos que tienen que verse impecables

Subheadline:

> En Rental Led resolvemos la técnica visual de tu evento con pantallas LED, operación profesional y una puesta cuidada de principio a fin. Estamos en CABA y trabajamos para eventos corporativos, sociales y producciones que no pueden fallar.

Primary CTA:

> Pedir presupuesto por WhatsApp

Secondary CTA:

> Ver portfolio

### Suggested English Hero Copy

Headline:

> LED screens for events that need to look flawless

Subheadline:

> Rental Led provides LED screens, technical setup, and professional operation for corporate events, social events, and productions across Buenos Aires.

Primary CTA:

> Request a quote on WhatsApp

Secondary CTA:

> View portfolio

## Suggested Services

The services section can include:

1. LED screens for corporate events
2. LED screens for social events
3. Technical setup and operation
4. LED solutions for brands and agencies
5. Support for venues, halls, and production companies

Each service should have concise commercial copy explaining the value.

## Suggested Trust Signals

Use trust-building elements throughout the page.

Possible trust signals:

- Based in CABA, working across Buenos Aires.
- Professional technical operation.
- Setup and support before and during the event.
- Solutions for corporate and social events.
- Portfolio with real event images.
- Fast response through WhatsApp.
- Clear quote process.

## Clients Section

If there are no real client logos yet, do not invent fake brands.

Instead, create a professional clients/trust section focused on client types:

- Companies
- Agencies
- Production companies
- Venues
- Social event organizers

The section can communicate who Rental Led works with without fabricating logos or testimonials.

## Contact Section

The contact section should be simple and conversion-focused.

Must include:

- WhatsApp CTA
- Instagram CTA
- Location mention: CABA, Buenos Aires
- Short trust-oriented closing copy

No form for now.

## Accessibility Requirements

- Semantic HTML.
- Keyboard-accessible links and controls.
- Visible focus states.
- Sufficient color contrast.
- Descriptive alt text.
- Respect `prefers-reduced-motion`.
- Avoid relying only on color to communicate meaning.
- Ensure tap targets are comfortable on mobile.

## Performance Requirements

- Static generation where possible.
- Minimal JavaScript.
- Optimized images.
- Lazy-loaded portfolio images.
- No unnecessary client-side framework.
- CSS should be efficient and maintainable.
- Avoid heavy dependencies.
- Avoid layout shift.
- Mobile performance is a priority.

## Recommended File Structure

Suggested Astro structure:

```txt
src/
  assets/
    logo.png
    portfolio/
  components/
    Header.astro
    Hero.astro
    About.astro
    Services.astro
    Portfolio.astro
    Clients.astro
    Contact.astro
    Footer.astro
    Seo.astro
  content/
    site.ts
  layouts/
    BaseLayout.astro
  pages/
    index.astro
    en/
      index.astro
  styles/
    global.css
public/
  robots.txt
```

This structure can be adjusted by the implementer if there is a better Astro convention for the final setup.

## Implementation Plan

1. Initialize the project with Astro.
2. Configure Astro site settings.
3. Move/copy assets into the appropriate Astro asset structure.
4. Build bilingual content structure.
5. Implement the base layout and SEO component.
6. Build all landing sections.
7. Add responsive CSS and visual system.
8. Add transitions and microinteractions.
9. Optimize portfolio images.
10. Add JSON-LD structured data.
11. Add sitemap and robots configuration.
12. Verify responsive behavior.
13. Verify build.
14. Review SEO and performance basics.

## Acceptance Criteria

The work is complete when:

- The landing builds successfully.
- The site has a Spanish version at `/`.
- The site has an English version at `/en/`.
- The language selector works.
- The design feels premium, modern, and professional.
- The layout is mobile-first and responsive.
- The portfolio uses the existing images.
- Portfolio images are optimized and lazy-loaded where appropriate.
- The logo is used correctly.
- WhatsApp and Instagram CTAs work with placeholders.
- There is no contact form.
- SEO metadata is implemented.
- Sitemap and robots are present.
- JSON-LD structured data is present.
- The content supports GEO/LLMO discoverability.
- Animations are smooth and professional.
- Animations respect `prefers-reduced-motion`.
- The site avoids unnecessary JavaScript.
- Accessibility basics are covered.

## Open Questions For Later

These are not blockers for the first implementation, but should be replaced later:

1. Real WhatsApp number.
2. Real Instagram handle.
3. Final production domain for canonical URLs and sitemap.
4. Real client logos or names, if available.
5. Any specific events or case studies to highlight.
6. Preferred brand colors if Rental Led already has them.
7. Whether the company wants to show prices, packages, or only quote-based contact.

## Important Implementation Note

Do not fabricate real clients, testimonials, awards, or certifications.

If those assets are not available, use honest trust-building copy focused on services, process, portfolio, location, and professional support.
