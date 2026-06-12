// Legal pages — Legal Notice (Impressum) & Privacy Policy (Datenschutz).
// Rendered via hash routing (#impressum / #datenschutz) from main.jsx,
// so no router dependency is needed. Styled to match the landing palette.
// English is the primary language. The comprehensive policy lives at /privacy.
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

function Datenschutz() {
  return (
    <>
      <h1 style={h1}>Privacy Policy</h1>
      <p style={{ ...p, marginTop: 24 }}>
        This policy explains how personal data is processed when you visit this website, under the
        Swiss Federal Act on Data Protection (FADP/revDSG) and — where applicable — the EU General
        Data Protection Regulation (GDPR).
      </p>
      <p style={{ ...p, fontStyle: "italic" }}>
        For the full privacy policy that also covers the Paul AI GEO Analyzer Chrome extension, see{" "}
        <a style={link} href="/privacy">geo.mauch.rocks/privacy</a>.
      </p>

      <h2 style={h2}>Controller</h2>
      <p style={p}>
        {PROVIDER.name}<br />
        {PROVIDER.street}, {PROVIDER.city}, {PROVIDER.country}<br />
        E-mail: <a style={link} href={`mailto:${PROVIDER.email}`}>{PROVIDER.email}</a>
      </p>

      <h2 style={h2}>Processing of personal data</h2>
      <p style={p}>
        In principle you can visit this website without providing any personal information. When pages
        are requested, the hosting provider processes technically necessary data in server log files
        (including an anonymized IP address, date and time of access, the page requested, the volume
        of data transferred and the browser type). This processing serves the secure and stable
        operation of the website.
      </p>

      <h2 style={h2}>Hosting</h2>
      <p style={p}>
        This website is operated on infrastructure of Hetzner Online GmbH (Industriestr. 25, 91710
        Gunzenhausen, Germany). Data is processed in data centers within the EU.
      </p>

      <h2 style={h2}>Web analytics with Matomo</h2>
      <p style={p}>
        To analyze website usage statistically we use Matomo — open-source analytics software hosted on
        our own infrastructure ({" "}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>matomo.kokomo.house</span>{" "}).
        No analytics data is shared with third parties.
      </p>
      <p style={p}>
        Matomo is configured <strong>cookieless</strong> here — no cookies are set and no cross-device
        recognition takes place. IP addresses are processed anonymized. For this reason no consent via a
        cookie banner is required; the processing is based on the legitimate interest in a
        needs-based design of the website.
      </p>

      <h2 style={h2}>No data from the Chrome extension</h2>
      <p style={p}>
        The advertised “Paul AI GEO Analyzer” Chrome extension analyzes web pages 100% locally in the
        browser. No content or analysis results are transmitted to any server — neither to us nor to
        third parties.
      </p>

      <h2 style={h2}>Your rights</h2>
      <p style={p}>
        Within the limits of the applicable law, you have the right to information about the personal
        data we process about you, as well as the right to its rectification or erasure. To exercise
        these rights, please use the contact address above.
      </p>

      <h2 style={h2}>Changes</h2>
      <p style={p}>
        We reserve the right to update this privacy policy so that it always complies with current
        legal requirements.
      </p>
    </>
  );
}

export function LegalPage({ page }) {
  return (
    <div style={wrap}>
      <TopBar />
      <div style={inner}>
        {page === "impressum" ? <Impressum /> : <Datenschutz />}
        <p style={{ ...p, marginTop: 56, fontSize: 13, color: "var(--slate-500)" }}>
          <a href="#tech-changelog" style={{ ...link, marginRight: 20 }}>Tech Changelog</a>
          <a href="/privacy" style={{ ...link, marginRight: 20 }}>Privacy</a>
          <a href="#impressum" style={{ ...link, marginRight: 20 }}>Legal Notice</a>
          <a href="#datenschutz" style={link}>Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
