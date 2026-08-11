---
name: Paul AI GEO Analyzer — The Radiograph
description: The /v2 light box — grey is the specimen, teal is the instrument's reading, paper is the printed report.
colors:
  plate-void: "#050708"
  plate: "#0a0d0e"
  d1: "#1c2427"
  d2: "#2c3639"
  d3: "#465356"
  d4: "#7f8d91"
  d5: "#9daaad"
  d6: "#ccd5d7"
  em: "#33cccc"
  em-hot: "#5eeaea"
  em-deep: "#0f5f5f"
  em-wash: "rgba(51, 204, 204, 0.1)"
  mark: "#ff5c45"
  paper: "#eceeed"
  paper-lit: "#f6f7f6"
  paper-ink: "#10161a"
  paper-d3: "#5b6669"
  paper-rule: "#cfd4d3"
typography:
  display:
    fontFamily: "Big Shoulders Display, Archivo, system-ui, sans-serif"
    fontSize: "clamp(58px, 13.2vw, 250px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.018em"
  headline:
    fontFamily: "Big Shoulders Display, Archivo, system-ui, sans-serif"
    fontSize: "clamp(42px, 8.4vw, 152px)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.018em"
  title:
    fontFamily: "Big Shoulders Display, Archivo, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.6vw, 82px)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.018em"
  subhead:
    fontFamily: "Big Shoulders Display, Archivo, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 42px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(16px, 1.15vw, 19px)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.2em"
    fontFeature: "tabular-nums"
  number:
    fontFamily: "Azeret Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontWeight: 600
    fontFeature: "tabular-nums"
rounded:
  none: "0px"
spacing:
  gutter: "clamp(20px, 4.4vw, 84px)"
  section: "clamp(76px, 12vh, 156px)"
  column: "clamp(36px, 5vw, 88px)"
  band: "clamp(18px, 2.2vw, 36px)"
components:
  button-stamped:
    backgroundColor: "{colors.em}"
    textColor: "{colors.plate-void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "17px 26px 17px 28px"
  button-stamped-hover:
    backgroundColor: "{colors.em-hot}"
    textColor: "{colors.plate-void}"
  button-stamped-sm:
    backgroundColor: "{colors.em}"
    textColor: "{colors.plate-void}"
    typography: "{typography.label}"
    padding: "11px 16px 11px 18px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.em}"
    padding: "17px 26px 17px 28px"
  button-ghost-hover:
    backgroundColor: "{colors.em-wash}"
    textColor: "{colors.em-hot}"
  button-ghost-on-paper:
    backgroundColor: "{colors.paper-ink}"
    textColor: "{colors.paper-lit}"
    padding: "17px 26px 17px 28px"
  link:
    textColor: "{colors.d5}"
  link-hover:
    textColor: "{colors.em-hot}"
  section-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.d6}"
    padding: "clamp(76px, 12vh, 156px) clamp(20px, 4.4vw, 84px)"
    width: "1560px"
  section-report:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.paper-ink}"
    padding: "clamp(76px, 12vh, 156px) clamp(20px, 4.4vw, 84px)"
    width: "1560px"
  edge-strip:
    backgroundColor: "{colors.plate-void}"
    textColor: "{colors.d4}"
    typography: "{typography.label}"
    height: "34px"
    padding: "0 clamp(20px, 4.4vw, 84px)"
---

# Design System: Paul AI GEO Analyzer — The Radiograph

## Overview

**Creative North Star: "The Light Box"**

An answer engine never sees the page a visitor sees; it reads the structure underneath. This world is the instrument that shows the difference: a near-black radiographic plate, a real grey density ramp for the specimen under study, and one teal that belongs exclusively to the instrument's own reading. Every surface is either film or the report printed off it. Nothing here is decorative — a rule is a rule because a reader measures off it, a stamp is a stamp because a machine set it, a mark is red because the instrument flagged a fault.

The world is deliberately un-SaaS. It refuses the gradient-glow hero, the three feature columns, the tilted browser screenshot, the rounded card, the eyebrow label above every heading, and the mascot. Depth comes from density and from a hairline, never from a soft elevated card. Type is set at signage scale, uppercase, in a condensed display face, so a heading reads as printed identification rather than as a marketing promise. The reading copy underneath is quiet, grey, and 62 characters wide.

**Scope — this document describes the `/v2` route only.** `/v2` is a complete replacement visual world, wired in `src/main.jsx` (`PATH_VIEW["/v2"]`) and styled entirely by `src/v2/radiograph.css`, which is imported by the route component and by nothing else. The incumbent landing page at `/` is an older, different visual system ("Bold & Minimal": Archivo at heavy weight and 110% width, drifting blurred aurora fields, scroll-driven sticky stacked feature cards, eyebrow labels, the Paul mascot) and **does not follow this document**. Do not retro-fit these rules onto `/`, and do not import `radiograph.css` outside `/v2`. The only file this world shares with the rest of the site is `src/styles/tokens/fonts.css`, where Archivo was made self-hosted for everyone.

**Provenance.** This direction was candidate 5 of 7 on the model's own resonance-ordered list; seed key `547f6b5d`, mode `persuade`. The binding direction contract is the HTML comment at the top of `<body>` in `index.html`.

**Documented gap — no comp was approved.** The comp-approval step of the new-work flow was skipped because the session that built this had no image-generation capability available. No comp was ever produced, shown, or approved. Fidelity was judged against the written direction contract alone. This is a real gap in the process, recorded here so a later pass does not mistake the build for comp-verified work.

**Two deliberate departures from the craft floor**, both load-bearing:

1. **Display type exceeds the 6rem cap.** `--s1` tops out at 250px and the hero sets `clamp(50px, 11.2vw, 215px)`. PRODUCT.md records "very large display typography" as a binding constraint the user restated for this redesign, so the brief outranks the default cap.
2. **The plate carries a background lattice.** `.rg-grid` tiles a 96px lattice of fiducial registration crosses across every dark section. This is not decorative texture and not a layout grid — a radiographic plate carries fiducials so a reader can measure distances off the film, and this world declares itself a measuring surface. It is drawn at `stroke-opacity 0.24` in `--d5` and masked by a radial gradient so it fades out below and around the content.

**Key Characteristics:**

- Grey is the specimen; teal is the instrument; red is a fault; paper is the report. No fifth voice.
- Zero corner radius everywhere. The only shaped silhouette is a 45° notch cut off one corner of a control.
- No cards. No eyebrows. No glyph-font icons. No mascot. No gradients as surfaces.
- Signage-scale condensed uppercase display, monospace stamps, quiet Archivo reading copy.
- Exactly one glow in the entire world.
- One authored motion — "exposure" — and it collapses completely under `prefers-reduced-motion`.

## Colors

Four voices, and each one means something. A colour in this world is a statement about who is speaking: the specimen, the instrument, the report, or the fault.

### Primary

- **Emission Teal** (`#33cccc`, token `--em`): the instrument's reading, and nothing else. It marks measurement (score bars, the needle, the filled scale, the profile polygon), annotation (a positive stamp on the plate, the "what the machine reads" label), and control (the stamped Add-to-Chrome button, the active state of a heading's second line). It is also the brand's binding "Paul teal", carried over from the extension UI. It is never a background field, never a gradient, never a decoration.
- **Emission Hot** (`#5eeaea`, `--em-hot`): the live edge of the instrument — the exposure divider and its handle, the scale needle, hover and focus on every teal control, and the focus outline. Reserve it for the thing currently under the beam.
- **Emission Deep** (`#0f5f5f`, `--em-deep`): teal that survives on paper. The ghost control's hairline on film, and the confirmed/hover state of an ink control on paper. Teal at full strength is unreadable on `--paper`; this is its stand-in.
- **Emission Wash** (`rgba(51, 204, 204, 0.1)`, `--em-wash`): the only teal fill, used as the hover ground of a ghost control on film.

### Secondary

- **Fault Red** (`#ff5c45`, token `--mark`): what the instrument flags. It outlines a bad region on the plate, draws the leader line and its landing dot, sets a failing score, a negative trend, and any gap present on 50% or more of measured pages. A finding is *marked*, never *coloured in* — red arrives as a 1px inset ring, a 1px underline, a hairline path, or a 16% diagonal hatch, and only once as solid type (the specimen's failing total).

### Neutral — the density ramp

The specimen is grayscale, always. Six steps from the plate up to the lit edge, plus the paper set.

- **Plate Void** (`#050708`, `--plate-void`): the deepest film — the fixed edge strip, the specimen's own bottom label bar, a blanked-out region, and the ink knocked out of a teal control.
- **Plate** (`#0a0d0e`, `--plate`): the working surface of every dark section and of the radiograph layer.
- **d1** (`#1c2427`): hairline rules, row dividers, perforation teeth, unfilled score marks, minor scale ticks, the plot's web. **Structure only.**
- **d2** (`#2c3639`): heavier rules, section-total dividers, inactive body lines on the plate, an unresolved block's outline. **Structure only.**
- **d3** (`#465356`): major scale ticks, the unsourced claim bar. **Structure only.**
- **d4** (`#7f8d91`): the floor for anything a person has to read. All stamps, captions, meta lines, axis labels, secondary navigation, footer links, "x of 5" figures. Clears 4.5:1 on the plate.
- **d5** (`#9daaad`): reading copy, link rest state, URLs on the board, the sparkline stroke, the fiducial cross ink.
- **d6** (`#ccd5d7`): the lit edge — headings on film, finding text, emphasised copy, a passing score, the primary identification in the edge strip.
- **Paper** (`#eceeed`) / **Paper Lit** (`#f6f7f6`): the printed report's ground, and the lifted panel (code block, edge strip) sitting on it.
- **Paper Ink** (`#10161a`) / **Paper d3** (`#5b6669`) / **Paper Rule** (`#cfd4d3`): the report's type, its secondary type, and its hairlines.

- **Emission Pale** (`#eafcfc`, `--em-pale`): type knocked out of `--em-deep`. The only pairing that needs it; not a general light.

`--plate-lit` (`#11171a`) is declared in `radiograph.css` but used nowhere in the build. Either use it or delete it; do not treat it as an established step.

### The specimen's foreign palette — a deliberate exception

`RenderedBlocks` and the light half of `Chrome` in `src/v2/Specimen.jsx` carry roughly ten literal greys (`#dfe3e1`, `#59635f`, `#3d4643`, `#7b8480`, `#e2e6e4`, `#c4cbc8`, `#dde1df`, `#79837f` …) that belong to no token here, and that is correct. That layer is not this design system — it renders *somebody else's web page* lying on the light box, the thing being measured. Giving it our tokens would make the specimen look like part of the instrument and destroy the whole point of the wipe. A design-system detector will flag these every time; they stay flagged. Do not tokenise them, and do not extend this exception to anything outside the rendered specimen.

### Named Rules

**The Four Voices Rule.** Grey is the specimen under study. Teal `#33cccc` is the instrument's reading — measurement, annotation, control — and nothing else. Neutral paper is the printed report. `#ff5c45` is anything the instrument flags as a fault. A new element must be able to say which of the four it is; if it cannot, it does not belong in this world.

**The d4 Floor Rule.** `--d1`, `--d2` and `--d3` are structure only — rules, ticks, inactive marks, and the geometry of an unresolved block. Nothing that has to be read is ever set below `--d4`, which clears 4.5:1 on the plate. This is not a suggestion; it is the reason the ramp has six steps instead of four.

**The Mark, Don't Fill Rule.** A fault is outlined, underlined, hatched or pointed at. Red as a solid field is reserved for the single failing total; a red panel or a red-filled button does not exist here.

## Typography

**Display Font:** Big Shoulders Display (variable, weight axis 400–900, self-hosted `src/v2/fonts/bigshoulders.woff2`), falling back to Archivo, then `system-ui`.
**Body Font:** Archivo (variable, weight 100–900, width 62–125%, self-hosted `src/styles/fonts/archivo-var.woff2`), falling back to `system-ui` / `-apple-system`.
**Label/Mono Font:** Azeret Mono (variable, weight 300–700, self-hosted `src/v2/fonts/azeret.woff2`), falling back to `ui-monospace` / SF Mono / Menlo.

All three are self-hosted woff2 variable subsets with `font-display: swap`. A page whose argument is that nothing leaves your browser does not block its own first paint on a third-party font request — that is why Archivo moved from an `@import` to a local `@font-face` in `src/styles/tokens/fonts.css`, a change that applies site-wide.

**Character:** Big Shoulders is a tall, tight, industrial condensed — the lettering stencilled on equipment, not a fashion display face. Set uppercase at 800 with `line-height: 0.86` and `letter-spacing: -0.018em`, it stacks into dense blocks that read as signage. Azeret Mono is the machine's hand: 11px, `0.2em` tracking, uppercase, tabular numerals. Archivo does the talking — the only face allowed to be lowercase, relaxed, and comfortable.

### Hierarchy

- **Display** (800, `--s1` `clamp(58px, 13.2vw, 250px)`, lh 0.86, uppercase): one per page. The closing call. The hero overrides it slightly narrower at `clamp(50px, 11.2vw, 215px)` so its two lines hold the first viewport.
- **Headline** (800, `--s2` `clamp(42px, 8.4vw, 152px)`, lh 0.86, uppercase): the section heading. Almost always two lines, the second carrying the turn in `--em`, constrained by a `max-width` in `ch` (9–15ch) rather than by a wrapper.
- **Title** (800, `--s3` `clamp(30px, 4.6vw, 82px)`, lh 0.92, uppercase): a section heading demoted into the margin column (`.rg-margin-head`, capped at 9ch).
- **Subhead** (800, `--s4` `clamp(22px, 2.6vw, 42px)`, lh 1, uppercase): a heading inside a column — the coda in the report, a ranked gap name.
- **Body** (400, `clamp(16px, 1.15vw, 19px)`, lh 1.6, `--d5`, `max-width: 62ch`): all reading copy. `<strong>` lifts to `--d6` at weight 600 and is the only emphasis available.
- **Label / stamp** (500, 11px, `0.2em` tracking, uppercase, tabular-nums, `--d4`): identification, measurement captions, findings metadata, code. Drops to `9–10px` in the film edge and on the plate itself; tracking relaxes to `0.14em` below 700px so it stays readable.
- **Number** (600, tabular-nums, mono): scores, deltas, percentages — anything that changes and must not shift width while it does.

### Named Rules

**The Signage Rule.** A heading is set in Big Shoulders, uppercase, at one of the four `--s*` steps, and is measured in `ch` so it breaks where the sentence wants to break. It never gets a label, kicker or eyebrow above it; the world's identification lives in the film-edge strip, and a heading that needs a category above it is a heading that has not been written yet.

**The Machine Hand Rule.** If it is set in Azeret Mono, a machine wrote it: an identification code, a measurement, a finding, a URL, a snippet. Mono is never a costume for human prose, and human prose is never set in the display face.

**The Verbatim Rule.** Findings are quoted in the product's own words ("This H4 follows an H1 and should be an H2.") in Archivo at `clamp(14.5px, 1.05vw, 17px)`, with the location and category stamped underneath in mono. Never paraphrase a finding into benefit language.

## Layout

**The band, not the column.** Content runs edge to edge inside a `--gutter` of `clamp(20px, 4.4vw, 84px)`, capped at a `1560px` centred measure. There is no narrow prose container — width is controlled per element by `ch` limits (62ch on body copy, 9–18ch on headings), which is why the page can carry 250px type and 16px prose in the same band without either looking stranded.

**Sections alternate material.** `Plate` (film) and `Report` (paper) are the only two section shells. Both take `clamp(76px, 12vh, 156px)` vertical padding and the same gutter and max-width. A `Plate` carries the fiducial lattice and `overflow: hidden`; a `Report` carries neither. The page order in the build is: fixed edge nav → Hero (plate, `min-height: 100vh`) → Reading (plate) → Survey (plate) → Prescription (paper) → Board (plate) → Specification (paper) → Close (plate, containing the footer).

**Two-column bodies collapse by intrinsic width, not by breakpoint.** The recurring pattern is `repeat(auto-fit, minmax(320–340px, 1fr))` with a gap of `clamp(36px, 5vw, 88px)`. Two exceptions are explicit: the six-discipline band (`.rg-six`) sets `repeat(6, …)` and steps to 3 at 1180px and 2 at 620px, because `auto-fit` orphans a single cell at common widths; and the margin opening (`.rg-margin`) sets `minmax(220px, 24%) 1fr` and collapses at 900px.

**Breakpoints actually used:** 1180px (six-band → 3 columns), 900px (margin opening collapses; the leader line stops being drawn, mirrored in JS as `window.innerWidth < 900`), 780px (the domain board unfolds from 5 columns into a stacked row), 700px (the specimen plate turns portrait — `3/4`, `min-height: 470px` — because a web page is portrait and a phone should see the whole document, not its top third), 620px (six-band → 2 columns; the secondary nav link and sub-label leave the edge strip for the footer).

**Vertical rhythm** is viewport-relative throughout: `clamp(Npx, Nvh, Npx)` for stacking inside a section, `vw`-based clamps for horizontal gaps. Fixed pixel spacing appears only in instrument chrome (the 52px nav row, the 24px film edge, the 34px edge strip, the 26px specimen label bar).

## Elevation & Depth

**This world has no elevation system.** Nothing floats, nothing is a card, and there is no shadow scale. Depth is density: a surface is nearer because it is lighter (`--plate-void` → `--plate` → `--paper`), and separation is a 1px hairline in `--d1`, `--d2` or `--paper-rule`. Structure is drawn with `box-shadow: inset 0 0 0 1px …`, which is a ruled border, not a lift.

Two black cast shadows exist, and both belong to the physical specimen — a plate on a light box has a body: `0 40px 80px rgba(0,0,0,0.5)` under the held plate and `0 50px 90px rgba(0,0,0,0.55)` under the draggable one. They are pure black, enormous, and attach only to a specimen plate. They are not a token and must not be reused as generic elevation.

### Named Rules

**The One Halation Rule.** Exactly one glow exists in this entire world: `box-shadow: 0 0 26px rgba(51, 204, 204, 0.32)` on the specimen's brightest emission bar — the H1 block in `XrayBlocks` (`src/v2/Specimen.jsx`). It is the film halation around the one structure the machine reads cleanly. There is no second glow, and future work may not add one: not on the divider handle, not on the needle, not on a button hover, not on a focus ring. If a new element seems to need a glow, it is competing with the halation and should be given density instead.

**The Hairline Rule.** Separation is one pixel of the density ramp. `--d1` divides rows, `--d2` divides sections, `--paper-rule` divides on paper, and `2px solid var(--paper-ink)` is the single heavier rule in the world (the report's coda). No dividing element is thicker than 2px.

## Shapes

**Zero radius, without exception.** Every rectangle in this world — button, panel, plate, tick, bar, mark, swatch — has square corners. There is no radius token and no rounded variant.

The one shaped silhouette is the **notch**: a control's bottom-right corner is cut at 45° with `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 11px), calc(100% - 11px) 100%, 0 100%)` — 11px on a full-size control, 8px on a small one, 9px on the exposure handle. That corner cut is this world's signature, the way film stock is notched for identification. It appears only on controls.

Recurring geometry beyond the rectangle:

- **The fiducial cross** — a 9×9px cross on a 96px lattice, and again as the ROI mark (a 5.2r circle with four registration ticks) and as the `/v2` favicon.
- **The perforation run** — 9×5px teeth at 6px pitch, filling the film edge.
- **The tick ruler** — 31 ticks across a 0–30 scale, 12px at every fifth step in `--d3`, 6px otherwise in `--d1`.
- **The hatch** — `repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,92,69,0.16) 6px 7px)` over a missing byline. The only patterned fill in the world.

Icons are drawn in-house: one family, `viewBox="0 0 24 24"`, `stroke-width: 1.5`, `stroke-linecap: square`, `stroke-linejoin: miter`, `fill: none`, `currentColor`, `aria-hidden`. Nine paths exist (`arrow`, `roi`, `copy`, `check`, `bang`, `down`, `bone`, `lock`, `plate`). Square caps and mitre joins are the point — a rounded stroke would read as friendly rather than technical. No icon font, no icon package.

## Components

### Buttons — the stamped control

- **Shape:** square, with the 45° corner notch (11px full, 8px small). No border, no radius.
- **Primary (`.rg-btn`):** solid `--em` on `--plate-void` ink, mono at 13px / weight 700 / `0.16em` tracking, uppercase, padding `17px 26px 17px 28px` (the extra left padding balances the notch), a 14px gap and a 17px drawn arrow after the label. Rendered as an `<a>` to the store — it navigates, so it is a link.
- **Small (`.rg-btn--sm`):** padding `11px 16px 11px 18px`, 11px type, 9px gap, 14px arrow. Used in the fixed nav and as the code block's copy control.
- **Hover / Focus:** background steps to `--em-hot` over `0.25s var(--expose)`. Nothing moves, nothing lifts, nothing glows.
- **Ghost (`.rg-btn--ghost`):** transparent with `inset 0 0 0 1px var(--em-deep)`, teal label; hover fills with `--em-wash` and lifts the label to `--em-hot`.
- **On paper:** teal cannot carry a control on `--paper`, so a ghost control inside `.rg-paper` inverts to solid `--paper-ink` with `--paper-lit` type and no ring; hover goes to `--em-deep` with `#eafcfc` type. Same inversion applies to the copy control, which additionally confirms in `--em-deep` for 2.2s.
- **Cursor:** `cursor: pointer` is set explicitly on `.rg-btn`.

### Links

`.rg-link` is annotated text: `--d5`, no underline, a 1px `--d2` bottom border. Hover moves the label to `--em-hot` and the border to `--em`. On paper: `--paper-d3` over `--paper-rule`, hover to `--em-deep`. Footer links use the class with `border-bottom-color: transparent` so the row reads as a stamp line until touched.

### Focus

One rule for the whole world: `outline: 2px solid var(--em-hot); outline-offset: 3px`, applied at `.rg :focus-visible`. It is legible on film and on paper, and it is the only place `--em-hot` appears outside the instrument's live edge.

### Navigation — the film-edge strip

Not a nav bar. A fixed two-part header on `--plate-void`: a 52px row carrying the plate icon in `--em`, the wordmark and sub-label in mono, a text link and a small stamped control; below it a 24px strip with the codes a machine prints down the side of a plate (`Exp 0—30`, `Specimen · the tab you are on`, `6 disciplines`) separated by perforation runs. `HEADER_H = 52 + 24`; the hero adds it back as top padding. Below 620px the sub-label and the secondary link are hidden — identification and action survive, chrome does not.

### Data rows — no cards

Every list in this world is a row separated by a top hairline: findings (`--d1`, with a `roi` icon that turns `--mark` when active and a `rgba(255,92,69,0.05)` ground), score rows (`--d2` top rule, five bars of `--em` / `--d1` that scale in from the left), the domain board (`--d1`), the spec list (`--paper-rule`, with a dotted leader between term and value), and the ranked gaps (`--d1`, with a 2px incidence bar that turns `--mark` at ≥50%). None of these is a card, none has a background at rest, and none has a radius.

### The specimen plate (signature component)

One page, laid out once, rendered twice: as a visitor sees it (`RenderedBlocks`, warm grey mock geometry on `#eef1ef`) and as the machine reads it (`XrayBlocks`, marked regions on `--plate`). A draggable divider clips the radiograph layer with `clip-path: inset(0 0 0 X%)`, so the whole product thesis is one gesture. Both layers share a single geometry table (`H`) and every block sets `flexShrink: 0` — identical block heights are what makes the wipe register instead of smear.

The divider is a 2px `--em-hot` rule with a 40px notched handle carrying the ROI mark. It is a real `role="slider"` with `aria-valuenow`/`aria-valuetext`, pointer capture, and keyboard control (arrows ±4, shift ±12, Home/End). The plate is `4/3`, `max-height: min(54vh, 440px)`, turning `3/4` with `min-height: 470px` below 700px. Its bottom edge is an opaque 26px label bar — the two readings are always legible and never sit on the specimen.

The same plate is exported as `XrayPlate` for study without the wipe: selecting a finding rings its region (`inset 0 0 0 1px` in `--mark` or `--em`), drops every other region to `opacity: 0.45` — quiet, not erased — and draws a leader line from the note to the region.

### The instrument readings (signature component)

Live data from the stats API is drawn as instrument output, never as a chart widget: a ruled 0–30 scale with a `--em-hot` needle and a settling numeral at `clamp(72px, 12vw, 190px)`; a six-axis polygon plot on a `--d1` web, filled `rgba(51,204,204,0.14)`, stroked `--em`, with square 5px vertex marks and mono axis labels whose values turn `--mark` below 2.5; and a ranked incidence list. The section returns `null` when the API gives nothing back — no skeleton, no empty state, no broken layout.

## Do's and Don'ts

### Do:

- **Do** place a new element in one of the four voices before styling it: specimen (grey), instrument (`--em`), report (paper), fault (`--mark`).
- **Do** keep every readable value at `--d4` (`#7f8d91`) or lighter on the plate. `--d1`/`--d2`/`--d3` are for rules, ticks and inactive marks only.
- **Do** build sections with the `Plate` and `Report` shells so gutter, max-width (1560px), vertical padding and the fiducial lattice stay identical across the page.
- **Do** wrap new content in `<Expose>` (or `useLit`) so it resolves out of low density with the rest of the page. Stagger with the `delay` prop in 80–120ms steps.
- **Do** measure headings in `ch` (`max-width: 9–15ch`) and let them break naturally, rather than inserting a wrapper or a `<br>` per breakpoint.
- **Do** cut the 45° notch on controls, and only on controls (11px full, 8px small).
- **Do** draw new icons into the existing family: 24 grid, 1.5 stroke, square caps, mitre joins, `currentColor`.
- **Do** quote the extension's own findings verbatim, in Archivo, with location and category stamped in mono underneath.
- **Do** invert teal to `--em-deep` or to `--paper-ink` when a control lands on paper.
- **Do** degrade a live-data section to `null` when data is missing. The layout may never break on an empty API.

### Don't:

- **Don't** add a second glow. The halation on the specimen's H1 emission bar (`0 0 26px rgba(51,204,204,0.32)`) is the only one this world gets.
- **Don't** introduce a corner radius, anywhere, for anything.
- **Don't** use teal for anything that is not the instrument speaking — no teal body copy, no teal section ground, no teal gradient, no teal because it looked flat.
- **Don't** fill an area with `--mark`. A fault is ringed, underlined, hatched or pointed at.
- **Don't** build a card. Rows separated by a hairline are the list pattern; a bordered box with padding and a background is not.
- **Don't** put an eyebrow, kicker or category label above a heading. Identification lives in the film-edge strip.
- **Don't** add a drop shadow as elevation. The two black cast shadows belong to the specimen plate and to nothing else.
- **Don't** use the mascot, a glyph icon font, a stock photograph or a tilted product screenshot in this world.
- **Don't** load a font from a third party. All three faces are self-hosted variable woff2 subsets, and the page's whole argument is that nothing leaves the browser.
- **Don't** import `radiograph.css` outside `/v2`, and don't apply these rules to the incumbent page at `/` — it is a different, older visual system.
- **Don't** animate anything outside the one exposure moment (see below), and never leave motion running under `prefers-reduced-motion`.

### Motion

This world owns exactly one authored moment, called **exposure**: content sits at `opacity: 0.34`, `blur(5px) contrast(0.7)`, `translateY(12px)` and resolves to full density when an `IntersectionObserver` (threshold 0.22, `rootMargin: 0 0 -8% 0`) fires once — `.rg-ex` / `data-lit="1"`, over `1–1.1s` on `--expose` (`cubic-bezier(0.16, 1, 0.3, 1)`), with a per-element `--ex-delay`. It is a density change, not a fade-up, because density is what this world does.

Three instrument behaviours extend that one moment and are not separate motion languages: the specimen's one-time exposure sweep (the divider eases from 100% to 48% over 1500ms the first time the plate is seen, then parks and never re-runs), the repeating scanner band inside the exposed side of the plate (`rg-sweep`, 5.5s), and the drawn leader line (`rg-draw` 0.42s, then `rg-land` 0.2s at 0.36s) — a reader draws the line from the note toward the region, then the mark lands. Numbers settle rather than count up: `useSettle` runs a quartic ease-out over 1.4–2s.

`@media (prefers-reduced-motion: reduce)` collapses all of it: `.rg-ex` is exposed with no transition, every animation and transition in `.rg` is clamped to `0.001ms`, the sweep band is not rendered at all, the divider jumps straight to 48%, and `useSettle` returns the target immediately.
