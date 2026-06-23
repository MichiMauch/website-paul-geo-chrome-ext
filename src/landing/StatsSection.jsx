// Live stats "dashboard" for geo.mauch.rocks.
// Fetches aggregated, anonymous numbers from the analytics API client-side and
// visualizes them on a dark surface (matching the page's dark feature sections):
//   1. a donut for the single biggest gap, with a scanning sweep,
//   2. a radar / spider chart of the six scoring disciplines (weakness profile),
//   3. the full ranked list of gaps with icons + animated mini-bars,
//   4. concrete "how to fix it" tips.
// Percentages only — no absolute counts. Charts are hand-built SVG (no deps).
// On any error or missing data the section renders nothing, so the static
// layout never breaks.
import React from "react";
import { Eyebrow } from "../components/Eyebrow.jsx";
import { DisplayHeadline } from "../components/DisplayHeadline.jsx";

const STATS_URL = "https://api.geo.mauch.rocks/v1/stats";

// Recommendation keys → short noun-phrase label.
const REC_LABELS = {
  no_facts: "No verifiable facts",
  low_readability: "Hard to read",
  no_author: "No named author",
  no_sourced_claims: "Claims without a source",
  no_definitions: "No key-term definitions",
  few_sections: "Weak section structure",
  no_lists: "No lists or tables",
  no_faq: "No FAQ section",
  no_key_info_upfront: "Key answer buried",
  no_h1: "No clean H1 heading",
  weak_semantic_html: "Weak semantic HTML",
  canonical_missing: "No canonical tag",
  few_entities: "Too few entities",
  no_llms_txt: "No llms.txt",
  low_scanability: "Hard to scan",
  no_schema: "No structured data",
  schema_incomplete: "Incomplete schema markup",
  bad_hierarchy: "Skipped heading levels",
  images_missing_alts: "Images without alt text",
  description_missing: "No meta description",
};

// One-line context for the hero gap (sits beside the donut).
const REC_SUBTEXT = {
  no_facts: "Pages make claims an AI can't verify — so it won't quote them.",
  low_readability: "Dense, complex prose that language models struggle to parse.",
  no_author: "No author, no authority — a trust signal AI engines look for.",
  no_sourced_claims: "Statements with nothing to cite back to.",
  no_definitions: "Key terms left undefined, so the page can't anchor an answer.",
};

// Concrete fixes for the most common gaps.
const ACTION_TIPS = {
  no_facts: "State concrete, checkable facts — numbers, dates, named sources.",
  low_readability: "Shorten sentences and break walls of text into clear paragraphs.",
  no_author: "Add a visible author with a bio and credentials.",
  no_sourced_claims: "Link every claim to a primary source.",
  no_definitions: "Define key terms up front so the page can answer directly.",
  few_sections: "Structure content with clear, descriptive headings.",
  no_lists: "Use lists and tables to define and compare key facts.",
  no_faq: "Add an FAQ that answers the real questions in plain language.",
  no_key_info_upfront: "Lead with the answer, then explain — don't bury it.",
  no_h1: "Give every page one clear, descriptive H1.",
  weak_semantic_html: "Use semantic HTML (article, section, headings) over generic divs.",
  no_llms_txt: "Publish an llms.txt to tell AI crawlers what matters.",
};

// Category keys → short radar-axis label + full name.
const CATEGORY_META = {
  aiCitation: { short: "AI Cite", full: "AI Citation" },
  answerability: { short: "Answers", full: "Answerability" },
  contentClarity: { short: "Clarity", full: "Content Clarity" },
  trustSources: { short: "Trust", full: "Trust & Sources" },
  machineReadability: { short: "Machine", full: "Machine Readability" },
  onPageSeo: { short: "SEO", full: "On-Page SEO" },
};
// Fixed order around the hexagon, starting at the top.
const CATEGORY_ORDER = ["aiCitation", "trustSources", "contentClarity", "onPageSeo", "machineReadability", "answerability"];

// Severity heat for the gap bars (high % of pages affected = worse).
function severityColor(pct) {
  if (pct >= 55) return "var(--score-poor)";
  if (pct >= 40) return "var(--warning)";
  return "var(--teal-400)";
}

function recLabel(key) {
  return REC_LABELS[key] || String(key).replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

// ── Minimal line-icon set (24×24, stroke = currentColor) ───────────────
const ICON_PATHS = {
  shield: "M12 3l7 3v6c0 4-3 6.5-7 9-4-2.5-7-5-7-9V6l7-3z M9 12l2 2 4-4",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z M12 9a3 3 0 100 6 3 3 0 000-6z",
  user: "M4 21v-1a6 6 0 0112 0v1 M10 11a4 4 0 100-8 4 4 0 000 8z",
  link: "M9 15l6-6 M8 11l-2 2a3.5 3.5 0 005 5l2-2 M16 13l2-2a3.5 3.5 0 00-5-5l-2 2",
  book: "M4 5a2 2 0 012-2h12v16H6a2 2 0 00-2 2V5z M8 8h7 M8 12h7",
  list: "M8 6h12 M8 12h12 M8 18h12 M3.5 6h.01 M3.5 12h.01 M3.5 18h.01",
  help: "M12 21a9 9 0 100-18 9 9 0 000 18z M9.5 9a2.5 2.5 0 014.5 1.5c0 1.5-2 2-2 3 M12 16.5h.01",
  type: "M5 6V5h14v1 M12 5v14 M9 19h6",
  code: "M9 8l-4 4 4 4 M15 8l4 4-4 4",
  file: "M7 3h7l4 4v14H7V3z M14 3v4h4 M9 12h6 M9 16h6",
  search: "M11 18a7 7 0 100-14 7 7 0 000 14z M21 21l-4.2-4.2",
  hash: "M5 9h14 M5 15h14 M10 4l-2 16 M16 4l-2 16",
  flow: "M4 6h10 M4 12h16 M4 18h7",
  dot: "M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0",
};
const ICON_FOR = {
  no_facts: "shield", low_readability: "eye", no_author: "user", no_sourced_claims: "link",
  no_definitions: "book", few_sections: "flow", no_lists: "list", no_faq: "help",
  no_key_info_upfront: "flow", no_h1: "type", weak_semantic_html: "code", canonical_missing: "link",
  few_entities: "hash", no_llms_txt: "file", low_scanability: "search", no_schema: "code",
  schema_incomplete: "code", bad_hierarchy: "type", images_missing_alts: "eye", description_missing: "file",
};
function Icon({ name, size = 22 }) {
  const d = ICON_PATHS[name] || ICON_PATHS.dot;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d.split(" M").map((seg, i) => <path key={i} d={(i ? "M" : "") + seg} />)}
    </svg>
  );
}

// ── Animation helpers ──────────────────────────────────────────────────
function useInView(threshold = 0.3) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, active, duration = 2400) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setVal(target); return; }
    let raf = 0, start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return val;
}

// ── 1. Donut: the single biggest gap, with a scanning sweep ────────────
function Donut({ pct, caption }) {
  const [ref, inView] = useInView();
  const v = useCountUp(pct, inView);
  const R = 52;
  const C = 2 * Math.PI * R;
  const offset = inView ? C * (1 - pct / 100) : C;
  return (
    <div ref={ref} style={{ position: "relative", width: "100%", maxWidth: 300, aspectRatio: "1 / 1", margin: "0 auto" }}>
      {/* scanning sweep, clipped to the disc */}
      <div aria-hidden="true" data-ambient style={{ position: "absolute", inset: "8%", borderRadius: "50%", overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: "14%", background: "linear-gradient(180deg, transparent, rgba(239,68,68,0.55), transparent)", animation: "paul-scan 3.6s ease-in-out infinite" }} />
      </div>
      <svg viewBox="0 0 120 120" width="100%" height="100%" style={{ display: "block" }}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(245,245,243,0.10)" strokeWidth="11" />
        <circle
          cx="60" cy="60" r={R} fill="none" stroke="var(--score-poor)" strokeWidth="11" strokeLinecap="round"
          transform="rotate(-90 60 60)" strokeDasharray={C} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 2.4s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", fontSize: "clamp(44px, 8vw, 64px)", lineHeight: 1, letterSpacing: "var(--tracking-display)", color: "var(--paper)", fontVariantNumeric: "tabular-nums" }}>
          {v}%
        </div>
        {caption && <div style={{ marginTop: 6, fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--score-poor)" }}>{caption}</div>}
      </div>
    </div>
  );
}

// ── 2. Radar / spider chart of the six scoring disciplines ─────────────
function Radar({ items }) {
  const [ref, inView] = useInView();
  const CX = 120, CY = 120, R = 78, MAX = 5;
  const n = items.length;
  const angle = (i) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const point = (i, frac) => [CX + R * frac * Math.cos(angle(i)), CY + R * frac * Math.sin(angle(i))];
  const ringPoly = (frac) => items.map((_, i) => point(i, frac).join(",")).join(" ");
  const dataPoly = items.map((it, i) => point(i, Math.max(0.04, it.score / MAX)).join(",")).join(" ");

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 360, margin: "0 auto" }}>
      <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={ringPoly(f)} fill="none" stroke="rgba(245,245,243,0.10)" strokeWidth="1" />
        ))}
        {items.map((_, i) => {
          const [x, y] = point(i, 1);
          return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(245,245,243,0.10)" strokeWidth="1" />;
        })}
        <g style={{ transform: inView ? "scale(1)" : "scale(0.02)", transformOrigin: `${CX}px ${CY}px`, transition: "transform 2s cubic-bezier(0.16,1,0.3,1)" }}>
          <polygon points={dataPoly} fill="var(--teal-a18)" stroke="var(--teal-400)" strokeWidth="2" strokeLinejoin="round" />
          {items.map((it, i) => {
            const [x, y] = point(i, Math.max(0.04, it.score / MAX));
            return <circle key={i} cx={x} cy={y} r="3" fill="var(--teal-400)" />;
          })}
        </g>
        {items.map((it, i) => {
          const [lx, ly] = point(i, 1.16);
          const cos = Math.cos(angle(i));
          const anchor = Math.abs(cos) < 0.3 ? "middle" : cos > 0 ? "start" : "end";
          return (
            <text key={i} x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--slate-400)" letterSpacing="0.04em">
              {it.short}
              <tspan fill="var(--teal-300)"> {it.pct}%</tspan>
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ── 3. One gap row: icon, label, animated mini-bar, count-up % ──────────
function GapRow({ k, label, pct }) {
  const [ref, inView] = useInView();
  const v = useCountUp(pct, inView);
  const color = severityColor(pct);
  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 14, padding: "clamp(12px,1.6vh,16px) 0", borderTop: "1px solid rgba(245,245,243,0.10)" }}>
      <span style={{ color: "var(--teal-300)", flex: "0 0 auto", display: "inline-flex" }}><Icon name={ICON_FOR[k] || "dot"} /></span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(14px,1.1vw,16px)", color: "var(--paper)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(15px,1.3vw,19px)", color, fontVariantNumeric: "tabular-nums" }}>{v}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 999, background: "rgba(245,245,243,0.10)", overflow: "hidden" }}>
          <div style={{ width: inView ? `${pct}%` : "0%", height: "100%", borderRadius: 999, background: color, transition: "width 2.2s cubic-bezier(0.16,1,0.3,1)" }} />
        </div>
      </div>
    </div>
  );
}

export function StatsSection() {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    let alive = true;
    fetch(STATS_URL)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => { if (alive) setStats(data); })
      .catch(() => { if (alive) setStats(null); });
    return () => { alive = false; };
  }, []);

  const recs = (stats && stats.topRecommendations) || [];
  if (recs.length === 0) return null;

  const hero = recs[0];
  const gaps = recs.slice(0, 12); // full ranked list — every gap, not a handful

  const cats = (stats && stats.categoryAverages) || {};
  const radarItems = CATEGORY_ORDER
    .filter((key) => CATEGORY_META[key] && cats[key] != null)
    .map((key) => ({ key, short: CATEGORY_META[key].short, score: Number(cats[key]), pct: Math.round((Number(cats[key]) / 5) * 100) }));

  const tips = recs.map((r) => r.key).filter((k) => ACTION_TIPS[k]).slice(0, 4);

  const labelStyle = { fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--slate-500)" };

  return (
    <section
      data-screen-label="GEO in numbers"
      style={{ background: "var(--ink)", color: "var(--paper)", padding: "clamp(80px, 14vh, 160px) clamp(24px, 5vw, 72px)", boxSizing: "border-box" }}
    >
      <Eyebrow dark>GEO in numbers</Eyebrow>
      <DisplayHeadline size="xl" style={{ marginTop: 20, maxWidth: "18ch" }}>
        Where pages *fall short.*
      </DisplayHeadline>
      <p style={{ marginTop: 28, maxWidth: "54ch", fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.3vw, 19px)", lineHeight: 1.55, color: "var(--slate-400)" }}>
        Across every page analyzed with the Paul AI GEO Analyzer, the same gaps
        keep showing up. Here's where the web is leaving AI visibility on the table.
      </p>

      {/* ── Charts: donut (biggest gap) + radar (discipline profile) ──── */}
      <div style={{ marginTop: "clamp(48px, 9vh, 96px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(40px, 6vw, 80px)", alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 4vh, 36px)", alignItems: "center", textAlign: "center" }}>
          <Donut pct={Math.round(hero.pct)} caption="Unverifiable" />
          <div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 800, fontStretch: "110%", fontSize: "clamp(26px, 3vw, 40px)", letterSpacing: "var(--tracking-display)", lineHeight: 1.05, color: "var(--paper)" }}>
              {recLabel(hero.key)}
            </h3>
            {REC_SUBTEXT[hero.key] && (
              <p style={{ margin: "14px auto 0", maxWidth: "38ch", fontFamily: "var(--font-sans)", fontSize: "clamp(14px,1.2vw,17px)", lineHeight: 1.55, color: "var(--slate-400)" }}>
                {REC_SUBTEXT[hero.key]}
              </p>
            )}
          </div>
        </div>

        {radarItems.length >= 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 3vh, 28px)", alignItems: "center" }}>
            <div style={labelStyle}>Weakness profile · by discipline</div>
            <Radar items={radarItems} />
          </div>
        )}
      </div>

      {/* ── Full ranked list of gaps ─────────────────────────────────── */}
      <div style={{ marginTop: "clamp(56px, 11vh, 120px)" }}>
        <div style={labelStyle}>Every gap, ranked — % of analyzed pages</div>
        <div style={{ marginTop: "clamp(20px, 4vh, 36px)", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", columnGap: "clamp(32px, 5vw, 72px)" }}>
          {gaps.map((rec) => (
            <GapRow key={rec.key} k={rec.key} label={recLabel(rec.key)} pct={Math.round(rec.pct)} />
          ))}
        </div>
      </div>

      {/* ── How to fix it ────────────────────────────────────────────── */}
      {tips.length > 0 && (
        <div style={{ marginTop: "clamp(56px, 11vh, 120px)" }}>
          <div style={labelStyle}>How to fix it</div>
          <div style={{ marginTop: "clamp(20px, 4vh, 36px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
            {tips.map((k) => (
              <div key={k} style={{ border: "1px solid rgba(245,245,243,0.12)", borderRadius: 16, padding: "clamp(20px,2.4vw,28px)", background: "rgba(245,245,243,0.02)" }}>
                <span style={{ color: "var(--teal-300)", display: "inline-flex" }}><Icon name={ICON_FOR[k] || "dot"} size={24} /></span>
                <div style={{ marginTop: 14, fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(14px,1.1vw,16px)", color: "var(--paper)", marginBottom: 8 }}>{recLabel(k)}</div>
                <p style={{ margin: 0, fontFamily: "var(--font-sans)", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.5, color: "var(--slate-400)" }}>{ACTION_TIPS[k]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <p style={{ marginTop: "clamp(40px, 7vh, 72px)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-500)" }}>
        Anonymous opt-out statistics — no URLs or page content.
      </p>
    </section>
  );
}
