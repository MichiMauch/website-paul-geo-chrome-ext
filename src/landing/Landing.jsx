// "Bold Typography & Scroll-Storytelling" landing page for Paul AI GEO Analyzer.
// Ported from the design-system UI kit to a standalone React tree.
import React from "react";
import { DisplayHeadline } from "../components/DisplayHeadline.jsx";
import { Eyebrow } from "../components/Eyebrow.jsx";
import { MediaPlaceholder } from "../components/MediaPlaceholder.jsx";
import { StackDeck, StackCard } from "../components/StackCard.jsx";
import { Ambient } from "../components/Ambient.jsx";
import { Categories, Privacy } from "./Sections.jsx";
import { StatsSection } from "./StatsSection.jsx";
import { DEMOS } from "./Demos.jsx";
import mascotUrl from "../assets/paul-mascot.svg";
import storeBadgeUrl from "../assets/chrome-webstore-badge.png";

const AmbientBg = Ambient;

/* ---- Site configuration (was the in-page Tweaks panel) -------------------
   Change these constants to re-skin the page; rebuild to apply.
   accent  : the single loud accent color
   ctaV    : "sweep" | "cut" | "offset" | "flat"
   ambient : "aurora" | "pulse" | "grid" | "none"
--------------------------------------------------------------------------- */
const CONFIG = {
  accent: "#33CCCC",
  ctaV: "sweep",
  ambient: "aurora",
  showDots: true,
  demos: true,
  grain: true,
  cursor: true,
};

const STORE_URL = "https://chromewebstore.google.com/detail/paul-ai-geo-analyzer/eemhdjjmecfgooahgoknmolojnjmiiic";

/* ---------- Landing CTA — oversized display-face link ---------- */
function LandingCta({ v = "sweep", size = "lg", children, href = STORE_URL, style }) {
  const [h, setH] = React.useState(false);
  const pad = { sm: "12px 22px", lg: "20px 40px", xl: "24px 52px" }[size];
  const fs = { sm: 12, lg: 15, xl: 17 }[size];
  const cut = { sm: 12, lg: 18, xl: 20 }[size];
  const off = size === "sm" ? 5 : 7;
  const ease = "0.3s var(--ease-reveal)";

  const label = (
    <span style={{ position: "relative", overflow: "hidden", display: "inline-block" }}>
      <span style={{ display: "block", transform: h ? "translateY(-105%)" : "translateY(0)", transition: `transform ${ease}` }}>{children}</span>
      <span aria-hidden="true" style={{ position: "absolute", inset: 0, transform: h ? "translateY(0)" : "translateY(105%)", transition: `transform ${ease}` }}>{children}</span>
    </span>
  );
  const arrow = (
    <span aria-hidden="true" style={{ display: "inline-block", transform: h ? "translateX(5px)" : "none", transition: `transform ${ease}` }}>→</span>
  );

  const base = {
    position: "relative", display: "inline-flex", alignItems: "center", gap: 12,
    fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "0.08em", fontSize: fs, padding: pad, textDecoration: "none",
    cursor: "pointer", whiteSpace: "nowrap", lineHeight: 1.1, boxSizing: "border-box",
  };

  if (v === "offset") {
    return (
      <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", display: "inline-block", textDecoration: "none", ...style }}>
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, transform: `translate(${off}px, ${off}px)`, border: "1px solid var(--landing-accent)", boxSizing: "border-box" }}></span>
        <span style={{ ...base, background: "var(--landing-accent)", color: "var(--ink)", transform: h ? `translate(${off}px, ${off}px)` : "none", transition: `transform 0.22s var(--ease-reveal)` }}>
          {label}{arrow}
        </span>
      </a>
    );
  }

  const variants = {
    flat: { background: "var(--landing-accent)", color: "var(--ink)" },
    cut: { background: "var(--landing-accent)", color: "var(--ink)", clipPath: `polygon(0 0, calc(100% - ${cut}px) 0, 100% ${cut}px, 100% 100%, 0 100%)`, transform: h ? "translateY(-3px)" : "none", transition: `transform ${ease}` },
    sweep: { background: "var(--landing-accent)", color: h ? "var(--paper)" : "var(--ink)", overflow: "hidden", transition: `color ${ease}` },
  };

  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ ...base, ...(variants[v] || variants.sweep), ...style }}>
      {v === "sweep" && <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: "var(--ink)", transform: h ? "translateX(0)" : "translateX(-102%)", transition: `transform ${ease}` }}></span>}
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 12 }}>{label}{arrow}</span>
    </a>
  );
}

/* ---------- Official Chrome Web Store badge ----------
   Per Google branding guidelines: link to the listing, resize only
   (keep aspect ratio), never recolor or otherwise modify the artwork. */
function StoreBadge({ height = 52, style }) {
  const [h, setH] = React.useState(false);
  return (
    <a
      href={STORE_URL}
      aria-label="Available in the Chrome Web Store"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: "inline-block", lineHeight: 0, borderRadius: 8, transition: "transform 0.25s var(--ease-reveal), box-shadow 0.25s", transform: h ? "translateY(-2px)" : "none", boxShadow: h ? "0 10px 30px rgba(0,0,0,0.28)" : "0 4px 16px rgba(0,0,0,0.18)", ...style }}
    >
      <img src={storeBadgeUrl} alt="Available in the Chrome Web Store" style={{ height, width: "auto", display: "block", borderRadius: 8 }} />
    </a>
  );
}

/* ---------- Fixed nav — "Add to Chrome" always reachable ---------- */
function FixedNav({ ctaV }) {
  return (
    <nav data-screen-label="Fixed nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(24px, 5vw, 72px)", pointerEvents: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, mixBlendMode: "difference", color: "#fff", pointerEvents: "auto" }}>
        <img src={mascotUrl} alt="Paul" style={{ width: 30, height: 30, filter: "brightness(0) invert(1)" }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em" }}>PAUL — AI GEO ANALYZER</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 20, pointerEvents: "auto" }}>
        <a href="#changelog" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", textDecoration: "none", mixBlendMode: "difference" }}>Changelog</a>
        <LandingCta v={ctaV} size="sm" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.25)" }}>Add to Chrome</LandingCta>
      </div>
    </nav>
  );
}

/* ---------- Hero ---------- */
function Hero({ ctaV, ambient }) {
  const [y, setY] = React.useState(0);
  const [m, setM] = React.useState({ x: 0, y: 0 });
  const mRaf = React.useRef(0);
  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY || 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  const onMove = (e) => {
    cancelAnimationFrame(mRaf.current);
    const cx = (e.clientX / (window.innerWidth || 1) - 0.5) * 2;
    const cy = (e.clientY / (window.innerHeight || 1) - 0.5) * 2;
    mRaf.current = requestAnimationFrame(() => setM({ x: cx, y: cy }));
  };
  return (
    <section data-screen-label="Hero" onMouseMove={onMove} style={{ height: "100vh", position: "relative", overflow: "hidden", background: "var(--ink)", color: "var(--paper)", display: "flex", flexDirection: "column" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, transform: `translate3d(${m.x * -22}px, ${y * 0.25 + m.y * -14}px, 0)`, willChange: "transform" }}>
        <div style={{ position: "absolute", top: "-20%", right: "-12%", fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "125%", fontSize: "60vh", lineHeight: 1, color: "rgba(255,255,255,0.035)", userSelect: "none" }}>GEO</div>
      </div>
      <AmbientBg variant={ambient} seed={0} />
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px clamp(24px, 5vw, 72px) 0" }}>
        <Eyebrow dark>Is your website ready for AI search?</Eyebrow>
        <DisplayHeadline as="h1" size="hero" style={{ marginTop: 20 }}>
          AI meets *Geo-Data.*
        </DisplayHeadline>
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 48, flexWrap: "wrap" }}>
          <LandingCta v={ctaV} size="lg">Add to Chrome — it's free</LandingCta>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-500)" }}>100% local · no tracking · 6 languages · MIT</span>
        </div>
        <div style={{ marginTop: 28 }}>
          <StoreBadge />
        </div>
      </div>
      <div aria-hidden="true" style={{ position: "relative", display: "flex", justifyContent: "center", paddingBottom: 28, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.3em", color: "var(--slate-500)", animation: "paul-pulse 3.5s ease-in-out infinite" }}>
        SCROLL ↓
      </div>
    </section>
  );
}

/* ---------- Full-screen statement ---------- */
function Statement() {
  return (
    <section data-screen-label="AI statement" style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(24px, 5vw, 72px)" }}>
      <Eyebrow>Scored the way machines read</Eyebrow>
      <DisplayHeadline size="xl" style={{ marginTop: 20, maxWidth: "16ch" }}>
        Built for *ChatGPT,* *Perplexity* &amp; AI Overviews.
      </DisplayHeadline>
      <p style={{ marginTop: 32, maxWidth: "46ch", fontFamily: "var(--font-sans)", fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, color: "var(--slate-600)" }}>
        Generative Engine Optimization prepares your content for AI-powered search. Paul scores any page 0–30 across six categories — GEO and classic on-page SEO — and tells you exactly what to fix.
      </p>
    </section>
  );
}

/* ---------- Sticky stacked feature cards ---------- */
const FEATURES = [
  {
    eyebrow: "Instant Analysis",
    headline: "One click. *Thirty points.*",
    body: "Click the toolbar icon — the Chrome side panel opens and scores the active tab across six categories. Edit, re-analyze, and watch the trend climb.",
    media: "Demo video — side panel scoring",
    bg: "var(--ink)", fg: "var(--paper)", dark: true,
  },
  {
    eyebrow: "In-Page Highlighting",
    headline: "See issues *on the page.*",
    body: "\u201CThis H4 follows an H2 and should be an H3.\u201D \u201CMissing alt text.\u201D \u201CParagraph too long (873 chars).\u201D — \u201CShow on page\u201D outlines every finding right where it lives.",
    media: "Demo video — show on page",
    bg: "var(--ink)", fg: "var(--paper)", dark: true,
  },
  {
    eyebrow: "Fix Snippets",
    headline: "Copy. Paste. *Cited.*",
    body: "Ready-to-paste JSON-LD schemas, semantic HTML, llms.txt templates, robots.txt directives and canonical tags turn every diagnosis into a fix.",
    media: "Demo video — one-click snippets",
    bg: "var(--ink)", fg: "var(--paper)", dark: true,
  },
  {
    eyebrow: "Domain Dashboard",
    headline: "Watch scores *climb.*",
    body: "Every analyzed page of a domain on one board — sorted worst-first, with per-URL history of up to 50 analyses, trend indicators and sparklines.",
    media: "Demo video — domain dashboard",
    bg: "var(--ink)", fg: "var(--paper)", dark: true,
  },
  {
    eyebrow: "Report Export",
    headline: "Reports your *clients get.*",
    body: "Export a standalone, client-ready HTML report with plain-language explanations and every fix snippet included — Save as PDF built in.",
    media: "Demo video — HTML report export",
    bg: "var(--ink)", fg: "var(--paper)", dark: true,
  },
];

function FeatureCard({ f, i, ambient, demos }) {
  const Demo = demos ? DEMOS[i] : null;
  return (
    <StackCard data-screen-label={`Feature ${i + 1} — ${f.eyebrow}`} background={f.bg} color={f.fg} style={{ position: "relative" }}>
      <AmbientBg variant={ambient} seed={i + 1} />
      <div style={{ position: "relative", display: "grid", gridTemplateColumns: "minmax(0, 5fr) minmax(0, 6fr)", gap: "clamp(24px, 4vw, 64px)", alignItems: "center", padding: "0 clamp(24px, 5vw, 72px)", width: "100%", boxSizing: "border-box" }}>
        <div>
          <Eyebrow index={`0${i + 1}`} dark={f.dark}>{f.eyebrow}</Eyebrow>
          <DisplayHeadline size="lg" style={{ marginTop: 18 }}>{f.headline}</DisplayHeadline>
          <p style={{ marginTop: 24, maxWidth: "40ch", fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.55, color: f.dark ? "var(--slate-400)" : "var(--slate-600)" }}>{f.body}</p>
        </div>
        {Demo ? <Demo /> : <MediaPlaceholder dark={f.dark} label={f.media} ratio="4 / 3" parallax={28} />}
      </div>
    </StackCard>
  );
}

/* ---------- Marquee band ---------- */
const MARQUEE_ITEMS = ["Content Clarity", "Answerability", "Trust & Sources", "Machine Readability", "AI Citation Readiness", "On-Page SEO"];

function Marquee() {
  const seq = (key) => (
    <span key={key} style={{ display: "inline-flex", alignItems: "center", gap: "clamp(20px, 2.5vw, 40px)", paddingRight: "clamp(20px, 2.5vw, 40px)" }}>
      {MARQUEE_ITEMS.map((txt, i) => (
        <React.Fragment key={i}>
          <span style={i % 2 ? { color: "transparent", WebkitTextStroke: "1.5px rgba(245,245,243,0.5)" } : { color: "var(--paper)" }}>{txt}</span>
          <span style={{ color: "var(--landing-accent, var(--teal-500))", fontSize: "0.45em" }}>●</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div aria-hidden="true" data-screen-label="Marquee" style={{ background: "var(--ink)", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", padding: "clamp(18px, 3vh, 32px) 0", whiteSpace: "nowrap" }}>
      <div style={{ display: "inline-flex", animation: "paul-marquee 36s linear infinite", willChange: "transform", fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", textTransform: "uppercase", letterSpacing: "var(--tracking-display)", fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.15 }}>
        {seq(0)}{seq(1)}
      </div>
    </div>
  );
}

/* ---------- Cursor follower ---------- */
function CursorFollower() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, hot = false, raf = 0;
    const move = (e) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target && e.target.closest && e.target.closest("a, button, input, select, label, [data-cat-row]");
      hot = !!t;
    };
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate(${x - 14}px, ${y - 14}px) scale(${hot ? 1.7 : 1})`;
      el.style.background = hot ? "color-mix(in srgb, var(--landing-accent, #33CCCC) 16%, transparent)" : "transparent";
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ref} aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, width: 28, height: 28, borderRadius: "50%", border: "1.5px solid var(--landing-accent, #33CCCC)", pointerEvents: "none", zIndex: 3000, willChange: "transform" }}></div>;
}

/* ---------- Film grain overlay ---------- */
const GRAIN_URI = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function Grain() {
  return <div aria-hidden="true" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 2000, opacity: 0.055, mixBlendMode: "overlay", backgroundImage: GRAIN_URI, backgroundSize: "180px 180px", animation: "paul-grain 1.4s steps(1) infinite" }}></div>;
}

/* ---------- Outro ---------- */
function Outro({ ctaV, ambient }) {
  return (
    <section data-screen-label="Outro" style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--paper)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(24px, 5vw, 72px)", position: "relative", overflow: "hidden" }}>
      <AmbientBg variant={ambient} seed={7} />
      <DisplayHeadline size="xl" style={{ position: "relative", maxWidth: "14ch" }}>
        Stop guessing. *Start scoring.*
      </DisplayHeadline>
      <div style={{ position: "relative", marginTop: 48 }}>
        <LandingCta v={ctaV} size="xl">Get the Extension</LandingCta>
      </div>
      <div style={{ position: "relative", marginTop: 32 }}>
        <StoreBadge />
      </div>
      <footer style={{ position: "absolute", bottom: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px clamp(24px, 5vw, 72px)", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate-500)" }}>
        <span>Paul AI GEO Analyzer</span>
        <span style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <a href="#tech-changelog" style={{ color: "var(--slate-400)", textDecoration: "none" }}>Tech-Changelog</a>
          <a href="#impressum" style={{ color: "var(--slate-400)", textDecoration: "none" }}>Impressum</a>
          <a href="#datenschutz" style={{ color: "var(--slate-400)", textDecoration: "none" }}>Datenschutz</a>
          <a href={STORE_URL} style={{ color: "var(--slate-400)", textDecoration: "none" }}>Chrome Web Store</a>
          <a href="https://github.com/MichiMauch/geo-chrome-ext" style={{ color: "var(--slate-400)", textDecoration: "none" }}>GitHub</a>
        </span>
      </footer>
    </section>
  );
}

export default function Landing() {
  const { accent, ctaV, ambient, showDots, demos, grain, cursor } = CONFIG;
  return (
    <div style={{ background: "var(--ink)", "--landing-accent": accent, "--teal-500": accent }}>
      <FixedNav ctaV={ctaV} />
      <Hero ctaV={ctaV} ambient={ambient} />
      <Statement />
      <Categories />
      <Marquee />
      <StackDeck dots={showDots} accent="var(--landing-accent)">
        {FEATURES.map((f, i) => <FeatureCard key={i} f={f} i={i} ambient={ambient} demos={demos} />)}
      </StackDeck>
      <Privacy ambient={ambient} />
      <StatsSection />
      <Outro ctaV={ctaV} ambient={ambient} />
      {grain && <Grain />}
      {cursor && <CursorFollower />}
    </div>
  );
}
