# Rental Led — Landing

Marketing site for Rental Led, an LED screen rental and operation company serving medical congresses, product launches, and corporate events in Buenos Aires.

The brief was a site that earns a quote request. Everything on the page works toward that: the problem the client actually has, what the service covers, how a job runs from booking to load-out, real work, and a contact form — in that order, with no detour.

## Approach

**Static by default.** Astro ships the page as HTML with no client framework, so the site loads fast on the mobile connections most of its visitors are on.

**Content lives in one place.** Copy, metadata, and section content are centralized in `src/content/`, so the page can be edited without touching markup.

**SEO is verified, not assumed.** Two check scripts run against the build output and fail it when something regresses, rather than leaving metadata correctness to a manual pass.

## Structure

```
src/components/   Hero, Problem, Services, Process, Portfolio,
                  Clients, About, Faq, Contact, Header, Footer, Seo
src/content/      Copy, metadata, and section content
scripts/          Build-output SEO and final checks
public/           Fonts and portfolio imagery
openspec/         Specifications and change proposals
```

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev       # development server
npm run build     # production build
npm run preview   # serve the production build
```

## Verification

```bash
npm run verify    # build, then SEO and final checks
```

Run this before deploying. `check:seo` and `check:final` inspect the generated output — they will not pass on intent alone.

---

Built by [MateCode](https://matecode.dev) — websites and custom software.
