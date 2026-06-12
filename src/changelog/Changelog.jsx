// Changelog page — fetched live from the extension repo's CHANGELOG.md.
// Source stays the single source of truth on GitHub; no rebuild needed when
// the extension ships a new version.
import React from "react";
import { marked } from "marked";
import mascotUrl from "../assets/paul-mascot.svg";

const CHANGELOG_URL =
  "https://raw.githubusercontent.com/MichiMauch/geo-chrome-ext/main/CHANGELOG.md";
const REPO_CHANGELOG = "https://github.com/MichiMauch/geo-chrome-ext/blob/main/CHANGELOG.md";

marked.setOptions({ gfm: true, breaks: false });

// Split the "Keep a Changelog" markdown into one entry per "## [version] - date".
function parseChangelog(md) {
  const blocks = md.split(/^##\s+/m).slice(1); // drop the leading "# Changelog"
  return blocks.map((block) => {
    const nl = block.indexOf("\n");
    const heading = (nl === -1 ? block : block.slice(0, nl)).trim();
    const body = nl === -1 ? "" : block.slice(nl + 1).trim();
    const m = heading.match(/\[?([^\]\s]+)\]?\s*-\s*(.+)/);
    return {
      version: m ? m[1] : heading,
      date: m ? m[2].trim() : "",
      html: marked.parse(body),
    };
  });
}

const wrap = { background: "var(--paper)", color: "var(--ink)", minHeight: "100vh", fontFamily: "var(--font-sans)" };
const inner = { maxWidth: "76ch", margin: "0 auto", padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 48px) 120px" };
const h1 = { fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", textTransform: "uppercase", letterSpacing: "var(--tracking-display, 0.01em)", fontSize: "clamp(34px, 6vw, 64px)", lineHeight: 1.05, margin: "0 0 10px" };
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

function VersionEntry({ entry }) {
  return (
    <article style={{ padding: "28px 0", borderTop: "1px solid var(--gray-200)" }}>
      <header style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 32px)", color: "var(--ink)" }}>
          {entry.version}
        </span>
        {entry.date && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--slate-500)" }}>{entry.date}</span>
        )}
      </header>
      <div className="cl-prose" dangerouslySetInnerHTML={{ __html: entry.html }} />
    </article>
  );
}

export function ChangelogPage() {
  const [state, setState] = React.useState({ status: "loading", entries: [] });

  React.useEffect(() => {
    let alive = true;
    fetch(CHANGELOG_URL)
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.text(); })
      .then((md) => { if (alive) setState({ status: "ok", entries: parseChangelog(md) }); })
      .catch(() => { if (alive) setState({ status: "error", entries: [] }); });
    return () => { alive = false; };
  }, []);

  return (
    <div style={wrap}>
      <TopBar />
      <div style={inner}>
        <h1 style={h1}>Changelog</h1>
        <p style={{ fontSize: "clamp(15px, 1.2vw, 17px)", lineHeight: 1.6, color: "var(--slate-600)", margin: "0 0 8px" }}>
          Alle Änderungen der Paul AI GEO Analyzer Chrome-Extension. Live aus dem{" "}
          <a style={link} href={REPO_CHANGELOG}>GitHub-Repository</a>.
        </p>

        {state.status === "loading" && (
          <p style={{ marginTop: 40, fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--slate-500)" }}>Lädt Changelog …</p>
        )}

        {state.status === "error" && (
          <p style={{ marginTop: 40, fontSize: 15, color: "var(--slate-600)" }}>
            Der Changelog konnte gerade nicht geladen werden. Du findest ihn jederzeit{" "}
            <a style={link} href={REPO_CHANGELOG}>direkt auf GitHub</a>.
          </p>
        )}

        {state.status === "ok" && (
          <div style={{ marginTop: 36 }}>
            {state.entries.map((e, i) => <VersionEntry key={`${e.version}-${i}`} entry={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}
