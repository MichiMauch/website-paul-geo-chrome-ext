# Paul AI GEO Analyzer — Landing Page

The **"Bold & Minimal" scroll-storytelling** marketing page for the Paul AI GEO
Analyzer Chrome extension, as a standalone **React + Vite** project. The build
output is plain static files (HTML/CSS/JS) — upload them to **any** web server,
no Node.js needed at runtime.

---

## Quick start

```bash
# 1. install dependencies (one time)
npm install

# 2. local dev server with hot reload → http://localhost:5173
npm run dev

# 3. production build → writes static files into  dist/
npm run build

# 4. (optional) preview the production build locally
npm run preview
```

You need **Node.js 18+** installed. Everything else is fetched by `npm install`.

---

## Deploy to your own server

After `npm run build`, the **`dist/`** folder contains the complete site:

```
dist/
  index.html
  assets/
    index-XXXX.js
    index-XXXX.css
    paul-mascot-XXXX.svg
```

Copy the **contents of `dist/`** to wherever your server serves files from:

| Server            | Where to put `dist/*`                          |
| ----------------- | ---------------------------------------------- |
| Apache            | `/var/www/html/` (or your vhost `DocumentRoot`)|
| nginx             | the `root` directory of your `server {}` block |
| Static host       | drag-and-drop `dist/` (Netlify, Cloudflare …)  |
| Sub-directory     | works too — paths are relative (`base: "./"`)  |

That's it — it's a static site. No database, no Node process, no environment
variables.

> **Tip:** to publish at `https://example.com/paul/`, just drop `dist/*` into a
> `paul/` folder. The relative asset paths handle the rest.

---

## Project structure

```
web-export/
├─ index.html              ← Vite entry (HTML shell + <meta> tags)
├─ vite.config.js          ← build config (relative asset paths)
├─ package.json
└─ src/
   ├─ main.jsx             ← mounts <Landing> into #root
   ├─ landing/
   │  ├─ Landing.jsx       ← page composition + Hero/Statement/Marquee/Outro + CONFIG
   │  ├─ Sections.jsx      ← "Watch Paul analyze" sticky scroll-telling + Privacy
   │  └─ Demos.jsx         ← looping mock-UI panels for the feature cards
   ├─ components/          ← design-system primitives (verbatim)
   │  ├─ DisplayHeadline.jsx   (oversized word-reveal headline)
   │  ├─ Eyebrow.jsx
   │  ├─ StackCard.jsx         (StackDeck + StackCard — horizontal card stacking)
   │  ├─ MediaPlaceholder.jsx  (parallax video/GIF slots)
   │  └─ Ambient.jsx           (animated aurora/pulse/grid backgrounds)
   ├─ assets/
   │  └─ paul-mascot.svg
   └─ styles/
      ├─ index.css         ← imports tokens + base resets
      └─ tokens/           ← colors / typography / spacing / motion / fonts
```

---

## Customizing

- **Colors, fonts, spacing, motion** live in `src/styles/tokens/*.css` as CSS
  custom properties (e.g. `--teal-400`, `--font-display`, `--ease-reveal`).
- **Page-level switches** (accent color, CTA style, background mood, film grain,
  cursor ring, demo panels) live in the `CONFIG` object at the top of
  `src/landing/Landing.jsx`. Edit and rebuild.
- **Replace the demo panels with real videos:** the feature cards render a
  looping mock UI (`src/landing/Demos.jsx`). Swap any `<Demo />` for a
  `<MediaPlaceholder>` or your own `<video>` element inside `FeatureCard`.

### Fonts

The display face is **Archivo** (variable, Google Fonts), loaded via
`@import` in `src/styles/tokens/fonts.css`. It is a **substitute** — the brand
brief asks for "Inter, Helvetica Now or a striking display face." Drop in a
licensed `@font-face` if you have one.

---

## Sources

This page was generated from the **Paul GEO Analyzer Design System** and the
extension source:

- Extension repo: https://github.com/MichiMauch/geo-chrome-ext
- Agency: NETNODE — https://www.netnode.ch

---

Built with the Paul GEO Analyzer Design System · React 18 · Vite 5
