# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two confirmed primary audiences, both professionals who own or answer for web content:

1. **In-house SEO and content people.** They maintain their employer's site, have heard that AI answer engines now sit between them and their readers, and want to know whether their own pages hold up. They work page by page, in the browser, while editing.
2. **Agencies and freelancers.** They audit client sites and have to hand something over. The standalone HTML report export exists for them — it is the artifact they put in front of a client.

Web developers are a secondary audience: they arrive through the technical surface (Schema.org, semantic HTML, `llms.txt`, MIT licence, GitHub) rather than the marketing pitch.

The situation is always the same: a real page open in a Chrome tab, and a question — *would an AI engine quote this?*

## Product Purpose

Paul AI GEO Analyzer is a free Chrome extension that scores the page in the active tab for Generative Engine Optimization — readiness to be found, understood and cited by AI answer engines (ChatGPT, Claude, Perplexity, Google AI Overviews) — plus classic on-page SEO.

It answers a question that has no established measurement yet. Traditional SEO tools score for ranking in a list of blue links; Paul scores for being quoted inside an answer. Success is a user who analyses a page, understands the specific gaps, applies a fix, re-analyses, and watches the score climb.

## Positioning

Three things a neighbouring tool could not truthfully copy:

- **It runs entirely in the browser, on the `activeTab` model.** No host permissions, no install warnings, no page content leaving the machine. Competing GEO checkers are server-side crawlers.
- **It is diagnosis *and* fix.** Every finding comes with a ready-to-paste artifact: JSON-LD schema, semantic HTML, `llms.txt` template, `robots.txt` directives, canonical tags.
- **It reports on aggregate reality.** Anonymous opt-out statistics across all analysed pages feed a public API, so the site can state where the web actually falls short — not an invented benchmark.

## Operating Context

- Chrome side panel, opened by clicking the toolbar icon while on the page under review.
- The loop is: analyse → read findings → "show on page" (findings outlined in situ in the live DOM) → copy a fix snippet → edit the page → re-analyse.
- Per-domain dashboard collects every analysed page of a site, worst-first, with up to 50 analyses of history per URL, trend indicators and sparklines.
- Agency handover happens through the standalone HTML report export (plain-language explanations, every fix snippet included, Save-as-PDF built in).

## Capabilities and Constraints

**Confirmed capabilities**

- Score 0–30, made up of six categories scored 0–5 each: Content Clarity, Answerability, Trust & Sources, Machine Readability, AI Citation Readiness, On-Page SEO.
- In-page highlighting of individual findings (heading-level jumps, missing alt text, over-long paragraphs, unsourced claims).
- Copy-ready fix snippets per finding.
- Domain dashboard with per-URL history, trends and sparklines.
- Standalone HTML report export.
- Six UI languages, auto-detected: Deutsch, English, Français, Español, Português, Italiano.
- Free, MIT-licensed, source on GitHub.

**Constraints**

- The site is a static build (React 18 + Vite 5, `base: "/"`), deployed as plain files behind nginx/Docker. No server runtime.
- Live aggregate statistics come from `https://api.geo.mauch.rocks/v1/stats`, fetched client-side. The section must degrade to nothing when the API is unavailable — the layout may never break on missing data.
- Statistics are percentages only. No absolute counts, no URLs, no page content.
- Permanent routes that must keep working: `/` , `/changelog`, `/tech-changelog`, `/privacy` (the URL registered as the Chrome Web Store privacy policy), `/legal-notice`.
- The Chrome Web Store badge is Google artwork: link to the listing, resize only with aspect ratio kept, never recolour or otherwise modify.
- Site language is English, and stays English — the audience is international even though the extension UI is localised.

## Brand Commitments

- Name: **Paul AI GEO Analyzer**, short form **Paul**. Paul is a character, not an acronym — there is a mascot SVG (`src/assets/paul-mascot.svg`).
- Accent colour **teal `#33CCCC`** ("Paul teal") on a near-black canvas `#0a0a0a`, with off-white `#fafafa`. Binding, carried over from the extension UI itself.
- Very large display typography is a binding constraint the user restated for the redesign.
- Voice: direct, concrete, unhyped. Findings are quoted verbatim from the tool ("This H4 follows an H2 and should be an H3") rather than paraphrased into marketing language.
- Built by NETNODE (https://www.netnode.ch); extension source at https://github.com/MichiMauch/geo-chrome-ext.

## Evidence on Hand

- **Real aggregate data**: the live stats API, covering the biggest gap, a six-discipline weakness profile, and the full ranked gap list as a percentage of analysed pages.
- **Real product surfaces** to show: side panel, in-page highlighting, fix snippets, domain dashboard, HTML report export. Currently represented on the site by hand-built mock UI (`src/landing/Demos.jsx`) rather than screenshots or video.
- **Real changelog** generated from the repository (`src/changelog/highlights.generated.json`).
- **Chrome Web Store listing**: https://chromewebstore.google.com/detail/paul-ai-geo-analyzer/eemhdjjmecfgooahgoknmolojnjmiiic
- **Absent — must not be fabricated**: install counts, star ratings, testimonials, named customers, case studies, press mentions, pricing. None exist on file.

## Product Principles

1. **Show the finding, not the promise.** The product's own language and real output are the strongest argument; never soften a concrete finding into a benefit claim.
2. **Proof before pitch.** The audience does not yet accept that GEO is measurable. Establish the problem with real aggregate data, then ask for the install.
3. **Privacy is a feature, stated in numbers.** Zero host permissions, zero install warnings, 100% local — this is a differentiator, not fine print.
4. **Diagnosis is worthless without the fix.** Every problem the site raises must be shown to end in something copy-pasteable.
5. **Nothing invented.** No fake counts, ratings, logos or quotes — the aggregate statistics are the only social proof that exists.

## Accessibility & Inclusion

No product-specific standard was established. Baseline expectation for a public marketing site: keyboard-reachable navigation and CTAs, visible focus, respected `prefers-reduced-motion` (the current page is heavy on scroll-driven motion), and text contrast that holds at the very large display sizes as well as in the small mono captions.
