// Privacy Policy — stable path route /privacy.
// This URL is registered as the Chrome Web Store privacy policy link for the
// "Paul AI GEO Analyzer" extension, so it must stay permanently reachable.
// English is the primary language (international extension users); a German
// section follows. Covers both the extension and the geo.mauch.rocks website.
import React from "react";
import mascotUrl from "../assets/paul-mascot.svg";

const EFFECTIVE_DATE = "June 12, 2026";
const CONTACT = {
  name: "Michael Mauch",
  street: "Hardstrasse 15c",
  city: "5037 Muhen",
  country: "Switzerland",
  email: "michi@mauch.ai",
};

const wrap = { background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", fontFamily: "var(--font-sans)" };
const inner = { maxWidth: "72ch", margin: "0 auto", padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 48px) 120px" };
const h1 = { fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", textTransform: "uppercase", letterSpacing: "var(--tracking-display, 0.01em)", fontSize: "clamp(34px, 6vw, 64px)", lineHeight: 1.05, margin: "0 0 6px" };
const h2 = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(19px, 2.1vw, 26px)", margin: "52px 0 14px" };
const h3 = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 19px)", margin: "30px 0 8px" };
const p = { fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.65, color: "var(--slate-700)", margin: "0 0 14px" };
const li = { fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.6, color: "var(--slate-700)", margin: "0 0 8px" };
const link = { color: "var(--teal-500)", textDecoration: "none", borderBottom: "1px solid var(--teal-border)" };
const code = { fontFamily: "var(--font-mono)", fontSize: "0.9em", background: "var(--gray-100)", border: "1px solid var(--gray-200)", borderRadius: 4, padding: "0.06em 0.34em" };

function TopBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(24px, 5vw, 48px)", position: "fixed", top: 0, left: 0, right: 0, background: "color-mix(in srgb, var(--paper) 88%, transparent)", backdropFilter: "blur(8px)", zIndex: 100 }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--ink)" }}>
        <img src={mascotUrl} alt="Paul" style={{ width: 26, height: 26 }} />
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 13, letterSpacing: "0.04em" }}>PAUL — AI GEO ANALYZER</span>
      </a>
      <a href="/" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-600)", textDecoration: "none" }}>← Back to home</a>
    </div>
  );
}

function Code({ children }) {
  return <code style={code}>{children}</code>;
}

export function PrivacyPolicyPage() {
  return (
    <div style={wrap}>
      <TopBar />
      <div style={inner}>
        <h1 style={h1}>Privacy Policy</h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--slate-500)", margin: "0 0 28px" }}>
          Effective date: {EFFECTIVE_DATE}
        </p>
        <p style={p}>
          This policy covers the Chrome extension <strong>“Paul AI GEO Analyzer”</strong> (by NETNODE)
          and the website <strong>geo.mauch.rocks</strong>.
        </p>

        {/* ---------- TL;DR ---------- */}
        <div style={{ marginTop: 28, padding: "22px 24px", background: "var(--teal-tint)", border: "1px solid var(--teal-border-soft)", borderRadius: 12 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--teal-500)", marginBottom: 12 }}>TL;DR</div>
          <ul style={{ margin: 0, paddingLeft: "1.2em" }}>
            <li style={li}>Page analysis runs <strong>100% locally</strong> in your browser. No accounts, no cookies, no persistent host permissions.</li>
            <li style={li}>Per fresh analysis the extension sends <strong>one anonymous, non-personal usage record</strong> (opt-out): scores and which recommendations triggered — <strong>never URLs, hostnames, titles or page content</strong>.</li>
            <li style={li}>The website uses <strong>cookieless, self-hosted analytics</strong>. There are no cookies anywhere, so there is no cookie banner.</li>
            <li style={li}>You can turn statistics off at any time, and remove all local data by uninstalling the extension.</li>
          </ul>
        </div>

        {/* ===================== EXTENSION ===================== */}
        <h2 style={h2}>A. The “Paul AI GEO Analyzer” extension</h2>

        <h3 style={h3}>1. Local analysis &amp; permissions</h3>
        <p style={p}>
          The page analysis runs <strong>entirely locally in your browser</strong>. There are no user
          accounts, no cookies and no persistent host permissions. The extension uses Chrome’s
          <Code>activeTab</Code> model: it can access a page only after you click the extension icon,
          and only for the currently active tab.
        </p>

        <h3 style={h3}>2. Requests to the page being analyzed</h3>
        <p style={p}>
          For each analysis the extension may make up to two requests to the analyzed website itself —
          <Code>/llms.txt</Code> and <Code>/robots.txt</Code>. Their contents are evaluated only locally
          and are never forwarded anywhere.
        </p>

        <h3 style={h3}>3. HTML report &amp; Google Fonts</h3>
        <p style={p}>
          The generated HTML report loads the <strong>Inter</strong> font from
          <Code>fonts.googleapis.com</Code>. This is a standard Google Fonts request, which transmits
          the usual technical data (such as your IP address and browser/user-agent) to Google.
        </p>

        <h3 style={h3}>4. Anonymous usage statistics (opt-out)</h3>
        <p style={p}>
          After each fresh analysis the extension sends one anonymous record to
          <Code>https://api.geo.mauch.rocks/v1/analyses</Code>. The record contains
          <strong> exclusively</strong>:
        </p>
        <ul style={{ margin: "0 0 14px", paddingLeft: "1.2em" }}>
          <li style={li}>a random installation ID (UUID, with no personal reference)</li>
          <li style={li}>the extension version</li>
          <li style={li}>the UI language</li>
          <li style={li}>the total score and the category scores</li>
          <li style={li}>the keys of the triggered recommendations (e.g. <Code>no_llms_txt</Code>)</li>
          <li style={li}>the rating tier</li>
        </ul>
        <p style={p}>
          It <strong>explicitly does not</strong> contain URLs, hostnames, page content or titles —
          not even in hashed form. Deduplication (at most one report per page per day) happens locally
          in your browser. On the first run you see a notice; a toggle in the panel footer disables the
          statistics at any time (the setting is stored locally).
        </p>

        <h3 style={h3}>5. Server-side processing</h3>
        <p style={p}>
          The statistics endpoint runs on a server in <strong>Germany (Hetzner)</strong>. IP addresses
          are used only transiently in memory for rate limiting and are <strong>never stored</strong>.
          Only the anonymous records described in section 4 are stored (in a PostgreSQL database).
          Anything published from this data is <strong>aggregated only</strong> (for example,
          “X% of pages have no llms.txt”).
        </p>

        <h3 style={h3}>6. Local storage in the browser</h3>
        <p style={p}>
          The following is stored via <Code>chrome.storage.local</Code> and <strong>never leaves your
          device</strong>: the analysis history (max. 50 entries per URL), a result cache, settings
          (language, theme, statistics toggle) and the installation ID. You can delete it through the
          extension (history / domain overview) or by uninstalling the extension.
        </p>

        <h3 style={h3}>7. UTM parameters on links</h3>
        <p style={p}>
          Links in the extension, the report and the dashboard that point to geo.mauch.rocks contain
          UTM parameters. Data is only transmitted when you actively click such a link.
        </p>

        {/* ===================== WEBSITE ===================== */}
        <h2 style={h2}>B. The geo.mauch.rocks website</h2>

        <h3 style={h3}>8. Web analytics</h3>
        <p style={p}>
          The website is static. Web analytics is provided by a <strong>self-hosted Matomo</strong>
          instance (<Code>matomo.kokomo.house</Code>), configured <strong>cookieless</strong>.
        </p>

        <h3 style={h3}>9. Aggregated statistics shown on the site</h3>
        <p style={p}>
          The website may display aggregated statistics derived from sections 4–5, fetched from
          <Code>api.geo.mauch.rocks/v1/stats</Code>. These are aggregates only — no individual records.
        </p>

        {/* ===================== CONTROLLER / RIGHTS ===================== */}
        <h2 style={h2}>C. Controller &amp; contact</h2>
        <p style={p}>
          {CONTACT.name}<br />
          {CONTACT.street}, {CONTACT.city}, {CONTACT.country}<br />
          E-mail: <a style={link} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </p>

        <h2 style={h2}>D. Your rights</h2>
        <p style={p}>
          Within the limits of the Swiss Federal Act on Data Protection (FADP/DSG) and the EU General
          Data Protection Regulation (GDPR), you have the right to information about, rectification of,
          and erasure of personal data we process about you. To exercise these rights, contact the
          address above.
        </p>
        <p style={p}>
          Please note: the usage statistics (sections 4–5) are <strong>anonymous</strong> and contain no
          personal reference. Because they cannot be linked to an individual person, we are unable to
          assign such records to a specific person or to fulfil access/erasure requests for them.
        </p>

        <h2 style={h2}>E. Cookies</h2>
        <p style={p}>
          Neither the extension nor the website sets cookies. Accordingly, there is no cookie banner.
        </p>

        <h2 style={h2}>F. Changes to this policy</h2>
        <p style={p}>
          We may update this policy so that it always reflects current legal requirements. The effective
          date above indicates the latest version.
        </p>

        {/* ===================== GERMAN SECTION ===================== */}
        <h2 style={{ ...h2, marginTop: 72, paddingTop: 40, borderTop: "1px solid var(--gray-200)" }}>
          Deutsche Fassung
        </h2>
        <p style={{ ...p, fontStyle: "italic" }}>
          Bei Abweichungen ist die englische Fassung oben massgeblich. Stand: 12. Juni 2026.
        </p>

        <h3 style={h3}>Kurz zusammengefasst</h3>
        <ul style={{ margin: "0 0 14px", paddingLeft: "1.2em" }}>
          <li style={li}>Die Seiten-Analyse läuft <strong>zu 100% lokal</strong> im Browser. Keine Konten, keine Cookies, keine persistenten Host-Berechtigungen.</li>
          <li style={li}>Pro frischer Analyse sendet die Extension <strong>einen anonymen, nicht personenbezogenen Datensatz</strong> (Opt-out): Scores und ausgelöste Empfehlungen — <strong>nie URLs, Hostnamen, Titel oder Seiteninhalte</strong>.</li>
          <li style={li}>Die Website nutzt <strong>cookieless, selbst gehostete Web-Analyse</strong>. Es gibt keine Cookies — daher kein Cookie-Banner.</li>
          <li style={li}>Die Statistik lässt sich jederzeit abschalten; alle lokalen Daten werden durch Deinstallation entfernt.</li>
        </ul>

        <h3 style={h3}>Extension „Paul AI GEO Analyzer“</h3>
        <p style={p}>
          <strong>1. Lokale Analyse &amp; Berechtigungen:</strong> Die Analyse läuft vollständig lokal im
          Browser. Keine Konten, keine Cookies, keine persistenten Host-Berechtigungen — Chrome
          <Code>activeTab</Code>-Modell (Zugriff nur auf den aktiven Tab nach Klick auf das Icon).
        </p>
        <p style={p}>
          <strong>2. Requests an die analysierte Website:</strong> Pro Analyse bis zu zwei Requests an die
          Seite selbst (<Code>/llms.txt</Code> und <Code>/robots.txt</Code>). Inhalte werden nur lokal
          ausgewertet und nie weitergeleitet.
        </p>
        <p style={p}>
          <strong>3. HTML-Report &amp; Google Fonts:</strong> Der HTML-Report lädt die Schriftart Inter von
          <Code>fonts.googleapis.com</Code> (Google-Fonts-Request mit den üblichen technischen Daten an
          Google).
        </p>
        <p style={p}>
          <strong>4. Anonyme Nutzungsstatistik (Opt-out):</strong> Nach jeder frischen Analyse wird ein
          anonymer Datensatz an <Code>https://api.geo.mauch.rocks/v1/analyses</Code> gesendet. Inhalt
          ausschliesslich: zufällige Installations-ID (UUID, kein Personenbezug), Extension-Version,
          UI-Sprache, Gesamt-Score, Kategorie-Scores, Schlüssel der ausgelösten Empfehlungen (z.B.
          <Code>no_llms_txt</Code>), Bewertungsstufe. <strong>Explizit nicht</strong> enthalten: URLs,
          Hostnamen, Seiteninhalte, Titel — auch nicht gehasht. Die Deduplizierung (max. 1 Meldung pro
          Seite/Tag) passiert lokal im Browser. Beim ersten Lauf erscheint ein Hinweis; ein Schalter im
          Panel-Footer deaktiviert die Statistik jederzeit (Einstellung lokal gespeichert).
        </p>
        <p style={p}>
          <strong>5. Server-Verarbeitung:</strong> Der Statistik-Endpoint läuft auf einem Server in
          Deutschland (Hetzner). IP-Adressen werden nur flüchtig im Speicher fürs Rate-Limiting verwendet
          und nie gespeichert. Gespeichert werden nur die anonymen Datensätze aus Punkt 4 (PostgreSQL).
          Veröffentlichungen daraus nur aggregiert (z.B. „X% der Seiten haben keine llms.txt“).
        </p>
        <p style={p}>
          <strong>6. Lokale Speicherung im Browser:</strong> Über <Code>chrome.storage.local</Code>
          (verlässt das Gerät nicht): Analyse-Verlauf (max. 50 pro URL), Ergebnis-Cache, Einstellungen
          (Sprache, Theme, Statistik-Schalter), Installations-ID. Löschbar über die Extension
          (Verlauf/Domain-Übersicht) oder durch Deinstallation.
        </p>
        <p style={p}>
          <strong>7. UTM-Parameter:</strong> Links in Extension/Report/Dashboard zu geo.mauch.rocks
          enthalten UTM-Parameter — Daten fliessen nur beim aktiven Klick.
        </p>

        <h3 style={h3}>Website geo.mauch.rocks</h3>
        <p style={p}>
          <strong>8.</strong> Statische Website, Web-Analyse via selbst gehostetem Matomo
          (<Code>matomo.kokomo.house</Code>), cookieless konfiguriert.
        </p>
        <p style={p}>
          <strong>9.</strong> Die Website zeigt aggregierte Statistiken aus Punkt 4/5 an (Abruf von
          <Code>api.geo.mauch.rocks/v1/stats</Code> — nur Aggregate, keine Einzeldaten).
        </p>

        <h3 style={h3}>Verantwortliche Stelle &amp; Ihre Rechte</h3>
        <p style={p}>
          {CONTACT.name}, {CONTACT.street}, {CONTACT.city}, {CONTACT.country} —{" "}
          <a style={link} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
        </p>
        <p style={p}>
          Rechtsrahmen: Schweizer DSG und DSGVO. Sie haben das Recht auf Auskunft, Berichtigung und
          Löschung der zu Ihrer Person bearbeiteten Daten. Hinweis: Die Statistikdaten (Punkt 4/5) sind
          anonym und haben keinen Personenbezug — mangels Zuordenbarkeit zu einer Person ist eine
          Zuordnung zu einer konkreten Person nicht möglich.
        </p>
      </div>
    </div>
  );
}
