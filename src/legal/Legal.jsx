// Legal Notice (Impressum) page — rendered via hash routing (#impressum)
// from main.jsx, so no router dependency is needed. Styled to match the
// landing palette. English is the primary language. The privacy policy
// lives separately at /privacy.
import React from "react";
import mascotUrl from "../assets/paul-mascot.svg";

const PROVIDER = {
  name: "Michael Mauch",
  street: "Hardstrasse 15c",
  city: "5037 Muhen",
  country: "Switzerland",
  email: "michi@mauch.ai",
};

const wrap = {
  background: "var(--paper)",
  color: "var(--ink)",
  minHeight: "100vh",
  fontFamily: "var(--font-sans)",
};
const inner = {
  maxWidth: "68ch",
  margin: "0 auto",
  padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 48px) 120px",
};
const h1 = {
  fontFamily: "var(--font-display)",
  fontWeight: 900,
  fontStretch: "110%",
  textTransform: "uppercase",
  letterSpacing: "var(--tracking-display, 0.01em)",
  fontSize: "clamp(34px, 6vw, 64px)",
  lineHeight: 1.05,
  margin: "0 0 8px",
};
const h2 = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: "clamp(18px, 2vw, 24px)",
  margin: "48px 0 12px",
};
const p = {
  fontSize: "clamp(15px, 1.2vw, 17px)",
  lineHeight: 1.65,
  color: "var(--slate-700)",
  margin: "0 0 14px",
};
const link = { color: "var(--teal-500)", textDecoration: "none", borderBottom: "1px solid var(--teal-border)" };

function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(24px, 5vw, 48px)", position: "fixed", top: 0, left: 0, right: 0, background: "color-mix(in srgb, var(--paper) 88%, transparent)", backdropFilter: "blur(8px)", zIndex: 100 }}>
      <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
        <img src={mascotUrl} alt="Paul" style={{ width: 26, height: 26 }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em" }}>PAUL — AI GEO ANALYZER</span>
      </a>
      <a href="#" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-600)", textDecoration: "none" }}>← Back to home</a>
    </div>
  );
}

function Impressum() {
  return (
    <>
      <h1 style={h1}>Legal Notice</h1>
      <p style={{ ...p, marginTop: 24 }}>Information pursuant to Swiss law.</p>

      <h2 style={h2}>Responsible for this website</h2>
      <p style={p}>
        {PROVIDER.name}<br />
        {PROVIDER.street}<br />
        {PROVIDER.city}<br />
        {PROVIDER.country}
      </p>

      <h2 style={h2}>Contact</h2>
      <p style={p}>
        E-mail: <a style={link} href={`mailto:${PROVIDER.email}`}>{PROVIDER.email}</a>
      </p>

      <h2 style={h2}>Disclaimer</h2>
      <p style={p}>
        The contents of this website were created with the greatest possible care. However, no
        guarantee is given for the accuracy, completeness or timeliness of the content.
      </p>
      <p style={p}>
        This website contains links to external third-party websites over whose content we have no
        influence. The respective provider is always responsible for such third-party content.
      </p>

      <h2 style={h2}>Copyright</h2>
      <p style={p}>
        The content and works created by the operator on these pages are subject to Swiss copyright
        law. The “Paul AI GEO Analyzer” Chrome extension is open source under the MIT license:{" "}
        <a style={link} href="https://github.com/MichiMauch/geo-chrome-ext">github.com/MichiMauch/geo-chrome-ext</a>.
      </p>
    </>
  );
}

export function LegalPage() {
  return (
    <div style={wrap}>
      <TopBar />
      <div style={inner}>
        <Impressum />
        <p style={{ ...p, marginTop: 56, fontSize: 13, color: "var(--slate-500)" }}>
          <a href="#tech-changelog" style={{ ...link, marginRight: 20 }}>Tech Changelog</a>
          <a href="/privacy" style={{ ...link, marginRight: 20 }}>Privacy</a>
          <a href="#impressum" style={link}>Legal Notice</a>
        </p>
      </div>
    </div>
  );
}
