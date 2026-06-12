// Live stats section for geo.mauch.rocks.
// Fetches aggregated, anonymous numbers from the analytics API client-side —
// same pattern as the tech-changelog fetch. On any error (or too little
// volume) the section renders nothing, so it never breaks the static layout.
import React from "react";
import { Eyebrow } from "../components/Eyebrow.jsx";
import { DisplayHeadline } from "../components/DisplayHeadline.jsx";

const STATS_URL = "https://api.geo.mauch.rocks/v1/stats";
const MIN_ANALYSES = 100; // only show once there's meaningful volume

// Recommendation keys → human-readable claim for the stat line.
const REC_LABELS = {
  no_llms_txt: "have no llms.txt",
  no_schema: "have no structured data (Schema.org)",
  schema_incomplete: "have incomplete schema markup",
  canonical_missing: "have no canonical tag",
  no_h1: "lack a clean H1 heading",
  bad_hierarchy: "skip heading levels",
  images_missing_alts: "have images without alt text",
  no_sourced_claims: "make factual claims without sources",
  no_author: "don't name an author",
  no_faq: "have no FAQ section",
  description_missing: "have no meta description",
  low_readability: "are hard to read",
};

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

  if (!stats || stats.totalAnalyses < MIN_ANALYSES) return null;

  const findings = (stats.topRecommendations || [])
    .filter((rec) => REC_LABELS[rec.key])
    .slice(0, 4);

  if (findings.length === 0) return null;

  const updated = (() => {
    try { return new Date(stats.updatedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
    catch { return null; }
  })();

  return (
    <section data-screen-label="GEO in numbers" style={{ background: "var(--paper)", color: "var(--ink)", padding: "clamp(80px, 14vh, 160px) clamp(24px, 5vw, 72px)", boxSizing: "border-box" }}>
      <Eyebrow>GEO in numbers</Eyebrow>
      <DisplayHeadline size="xl" style={{ marginTop: 20, maxWidth: "16ch" }}>
        The data is *clear.*
      </DisplayHeadline>
      <p style={{ marginTop: 28, maxWidth: "52ch", fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.3vw, 19px)", lineHeight: 1.55, color: "var(--slate-600)" }}>
        Based on {stats.totalAnalyses.toLocaleString("en-US")} anonymous analyses with the
        Paul AI GEO Analyzer (avg. score {Number(stats.avgScore).toFixed(1)}/{stats.maxScore}):
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(24px, 4vw, 56px)", marginTop: "clamp(40px, 7vh, 72px)" }}>
        {findings.map((rec) => (
          <div key={rec.key} style={{ borderTop: "1px solid var(--gray-200)", paddingTop: 18 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", fontSize: "clamp(44px, 6vw, 88px)", lineHeight: 1, letterSpacing: "var(--tracking-display)", color: "var(--teal-500)" }}>
              {rec.pct}%
            </div>
            <div style={{ marginTop: 12, fontFamily: "var(--font-sans)", fontSize: "clamp(14px, 1.1vw, 17px)", lineHeight: 1.45, color: "var(--slate-700)" }}>
              of analyzed pages {REC_LABELS[rec.key]}
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "clamp(32px, 6vh, 56px)", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-400)" }}>
        Anonymous opt-out statistics — no URLs or page content.{updated ? ` Updated ${updated}.` : ""}
      </p>
    </section>
  );
}
