// Legal pages — Impressum & Datenschutzerklärung.
// Rendered via hash routing (#impressum / #datenschutz) from main.jsx,
// so no router dependency is needed. Styled to match the landing palette.
import React from "react";
import mascotUrl from "../assets/paul-mascot.svg";

const PROVIDER = {
  name: "Michael Mauch",
  street: "Hardstrasse 15c",
  city: "5037 Muhen",
  country: "Schweiz",
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
      <a href="#" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-600)", textDecoration: "none" }}>← Zurück zur Startseite</a>
    </div>
  );
}

function Impressum() {
  return (
    <>
      <h1 style={h1}>Impressum</h1>
      <p style={{ ...p, marginTop: 24 }}>Angaben gemäss schweizerischem Recht.</p>

      <h2 style={h2}>Verantwortlich für diese Website</h2>
      <p style={p}>
        {PROVIDER.name}<br />
        {PROVIDER.street}<br />
        {PROVIDER.city}<br />
        {PROVIDER.country}
      </p>

      <h2 style={h2}>Kontakt</h2>
      <p style={p}>
        E-Mail: <a style={link} href={`mailto:${PROVIDER.email}`}>{PROVIDER.email}</a>
      </p>

      <h2 style={h2}>Haftungsausschluss</h2>
      <p style={p}>
        Die Inhalte dieser Website wurden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit,
        Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
      </p>
      <p style={p}>
        Diese Website verweist mit Links auf externe Websites Dritter, auf deren Inhalte kein Einfluss
        besteht. Für diese fremden Inhalte ist stets der jeweilige Anbieter verantwortlich.
      </p>

      <h2 style={h2}>Urheberrecht</h2>
      <p style={p}>
        Die durch den Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
        schweizerischen Urheberrecht. Die Chrome-Erweiterung „Paul AI GEO Analyzer" ist quelloffen
        unter der MIT-Lizenz verfügbar: {" "}
        <a style={link} href="https://github.com/MichiMauch/geo-chrome-ext">github.com/MichiMauch/geo-chrome-ext</a>.
      </p>
    </>
  );
}

function Datenschutz() {
  return (
    <>
      <h1 style={h1}>Datenschutz&shy;erklärung</h1>
      <p style={{ ...p, marginTop: 24 }}>
        Diese Datenschutzerklärung informiert über die Bearbeitung von Personendaten beim Besuch
        dieser Website gemäss dem schweizerischen Datenschutzgesetz (revDSG) und – soweit anwendbar –
        der EU-Datenschutz-Grundverordnung (DSGVO).
      </p>

      <h2 style={h2}>Verantwortliche Stelle</h2>
      <p style={p}>
        {PROVIDER.name}<br />
        {PROVIDER.street}, {PROVIDER.city}, {PROVIDER.country}<br />
        E-Mail: <a style={link} href={`mailto:${PROVIDER.email}`}>{PROVIDER.email}</a>
      </p>

      <h2 style={h2}>Bearbeitung von Personendaten</h2>
      <p style={p}>
        Grundsätzlich können Sie diese Website besuchen, ohne Angaben zu Ihrer Person zu machen.
        Beim Aufruf der Seiten werden durch den Hosting-Provider technisch notwendige Daten in
        Server-Logfiles bearbeitet (u. a. anonymisierte IP-Adresse, Datum und Uhrzeit des Zugriffs,
        aufgerufene Seite, übertragene Datenmenge, Browsertyp). Diese Bearbeitung dient dem sicheren
        und stabilen Betrieb der Website.
      </p>

      <h2 style={h2}>Hosting</h2>
      <p style={p}>
        Diese Website wird auf Infrastruktur der Hetzner Online GmbH (Industriestr. 25, 91710
        Gunzenhausen, Deutschland) betrieben. Die Daten werden in Rechenzentren innerhalb der EU
        verarbeitet.
      </p>

      <h2 style={h2}>Webanalyse mit Matomo</h2>
      <p style={p}>
        Zur statistischen Auswertung der Websitenutzung setzen wir Matomo ein – eine Open-Source-
        Analysesoftware, die auf eigener Infrastruktur ({" "}
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.92em" }}>matomo.kokomo.house</span>{" "})
        gehostet wird. Es werden keine Analysedaten an Dritte weitergegeben.
      </p>
      <p style={p}>
        Matomo ist hier <strong>cookielos</strong> konfiguriert – es werden keine Cookies gesetzt und
        keine geräteübergreifende Wiedererkennung vorgenommen. IP-Adressen werden anonymisiert
        verarbeitet. Aus diesem Grund ist für die Nutzung keine Einwilligung über ein Cookie-Banner
        erforderlich; die Bearbeitung erfolgt auf Grundlage des berechtigten Interesses an einer
        bedarfsgerechten Gestaltung der Website.
      </p>

      <h2 style={h2}>Keine Daten der Chrome-Erweiterung</h2>
      <p style={p}>
        Die beworbene Chrome-Erweiterung „Paul AI GEO Analyzer" analysiert Webseiten zu 100 % lokal
        im Browser. Es werden dabei keine Inhalte oder Analyseergebnisse an Server übermittelt – weder
        an uns noch an Dritte.
      </p>

      <h2 style={h2}>Ihre Rechte</h2>
      <p style={p}>
        Sie haben im Rahmen der gesetzlichen Vorgaben das Recht auf Auskunft über die zu Ihrer Person
        bearbeiteten Daten sowie auf deren Berichtigung oder Löschung. Wenden Sie sich dazu an die oben
        genannte Kontaktadresse.
      </p>

      <h2 style={h2}>Änderungen</h2>
      <p style={p}>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen
        rechtlichen Anforderungen entspricht.
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
          <a href="#tech-changelog" style={{ ...link, marginRight: 20 }}>Tech-Changelog</a>
          <a href="#impressum" style={{ ...link, marginRight: 20 }}>Impressum</a>
          <a href="#datenschutz" style={link}>Datenschutz</a>
        </p>
      </div>
    </div>
  );
}
