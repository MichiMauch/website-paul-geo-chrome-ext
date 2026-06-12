// What's-new page — a layperson-friendly overview of what Paul does, summarized
// by AI from the extension's CHANGELOG.md at build time (see
// scripts/generate-highlights.mjs). Renders the bundled highlights.generated.json.
import React from "react";
import mascotUrl from "../assets/paul-mascot.svg";
import data from "./highlights.generated.json";

const STORE_URL =
  "https://chromewebstore.google.com/detail/paul-ai-geo-analyzer/eemhdjjmecfgooahgoknmolojnjmiiic";

const wrap = { background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", fontFamily: "var(--font-sans)" };
const inner = { maxWidth: "72ch", margin: "0 auto", padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 48px) 120px" };
const h1 = { fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", textTransform: "uppercase", letterSpacing: "var(--tracking-display, 0.01em)", fontSize: "clamp(34px, 6vw, 64px)", lineHeight: 1.05, margin: "0 0 18px" };
const link = { color: "var(--teal-500)", textDecoration: "none", borderBottom: "1px solid var(--teal-border)" };

function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(24px, 5vw, 48px)", position: "fixed", top: 0, left: 0, right: 0, background: "color-mix(in srgb, var(--paper) 88%, transparent)", backdropFilter: "blur(8px)", zIndex: 100 }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
        <img src={mascotUrl} alt="Paul" style={{ width: 26, height: 26 }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em" }}>PAUL — AI GEO ANALYZER</span>
      </a>
      <a href="#" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-600)", textDecoration: "none" }}>← Zurück zur Startseite</a>
    </div>
  );
}

export function HighlightsPage() {
  const highlights = Array.isArray(data.highlights) ? data.highlights : [];
  return (
    <div style={wrap}>
      <TopBar />
      <div style={inner}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--teal-500)" }}>Was Paul kann</span>
        <h1 style={{ ...h1, marginTop: 12 }}>Changelog</h1>
        {data.intro && (
          <p style={{ fontSize: "clamp(16px, 1.5vw, 21px)", lineHeight: 1.55, color: "var(--slate-700)", maxWidth: "52ch", margin: "0 0 8px" }}>
            {data.intro}
          </p>
        )}

        <div style={{ marginTop: 44, display: "grid", gap: 4 }}>
          {highlights.map((h, i) => (
            <article key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "clamp(14px, 2.5vw, 28px)", padding: "22px 0", borderTop: "1px solid var(--gray-200)" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)", color: "var(--gray-200)", lineHeight: 1.2, fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(18px, 1.8vw, 23px)", margin: "0 0 8px", color: "var(--ink)" }}>{h.title}</h2>
                <p style={{ fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.6, color: "var(--slate-600)", margin: 0 }}>{h.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 48, display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center" }}>
          <a href={STORE_URL} style={{ ...link, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: 14, borderBottom: "2px solid var(--teal-400)" }}>
            Add to Chrome →
          </a>
          <a href="#tech-changelog" style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--slate-500)", textDecoration: "none" }}>
            Vollständiger technischer Changelog →
          </a>
        </div>
      </div>
    </div>
  );
}
