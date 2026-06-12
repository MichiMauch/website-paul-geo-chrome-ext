// Build-time generation of the layperson-friendly changelog highlights.
//
// Fetches the extension's CHANGELOG.md and asks OpenAI to rewrite it into a
// short, jargon-free "what Paul can do / what's new" overview. The result is
// written to src/changelog/highlights.generated.json and bundled by Vite.
//
// Resilient by design: if OPENAI_API_KEY is missing or the API call fails, the
// script logs a warning and exits 0 WITHOUT touching the existing JSON, so the
// build always succeeds and the last good highlights remain in place.
//
// Env:
//   OPENAI_API_KEY  (required to (re)generate; absent → skip)
//   OPENAI_MODEL    (optional, default "gpt-4o-mini")

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/changelog/highlights.generated.json");
const CHANGELOG_URL =
  "https://raw.githubusercontent.com/MichiMauch/geo-chrome-ext/main/CHANGELOG.md";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function skip(reason) {
  console.warn(`[highlights] skipped: ${reason} — keeping existing highlights.generated.json`);
  process.exit(0);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) skip("OPENAI_API_KEY not set");

const SYSTEM = `Du bist Produkt-Marketing-Texter für die Chrome-Erweiterung "Paul AI GEO Analyzer".
Paul bewertet Webseiten darauf, wie gut sie für KI-Suche (ChatGPT, Perplexity, Google AI Overviews) und klassisches SEO aufgestellt sind.
Aufgabe: Fasse das (technische, deutschsprachige) Changelog zu EINER kompakten, laienverständlichen Highlights-Übersicht zusammen, die jede Marketing-/Website-Person ohne Technikwissen versteht.
Regeln:
- Deutsch, freundlich, konkret, kein Entwickler-Jargon (keine Cache-Prefixes, Testzahlen, Modulnamen, Permissions).
- KEINE Versionsnummern, KEINE Datumsangaben.
- Beschreibe den NUTZEN für den Anwender, nicht die technische Umsetzung.
- 5 bis 8 Highlights, vom Wichtigsten zum Detail.
Antworte ausschließlich als JSON.`;

const USER = (changelog) => `Hier ist das vollständige Changelog. Erzeuge die Highlights-Übersicht als JSON mit exakt dieser Struktur:
{
  "intro": "1-2 Sätze, was Paul grundsätzlich für den Nutzer tut",
  "highlights": [ { "title": "kurze Überschrift (max ~6 Wörter)", "description": "1-2 einfache Sätze zum Nutzen" } ]
}

CHANGELOG:
${changelog}`;

try {
  const md = await fetch(CHANGELOG_URL).then((r) => {
    if (!r.ok) throw new Error(`fetch CHANGELOG.md -> HTTP ${r.status}`);
    return r.text();
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: USER(md) },
      ],
    }),
  });

  if (!res.ok) throw new Error(`OpenAI -> HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("empty completion");

  const parsed = JSON.parse(content);
  if (!parsed.intro || !Array.isArray(parsed.highlights) || parsed.highlights.length === 0) {
    throw new Error("unexpected JSON shape from model");
  }

  const out = {
    intro: String(parsed.intro),
    highlights: parsed.highlights
      .filter((h) => h && h.title && h.description)
      .map((h) => ({ title: String(h.title), description: String(h.description) })),
    model: MODEL,
  };

  writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
  console.log(`[highlights] generated ${out.highlights.length} highlights via ${MODEL}`);
} catch (err) {
  skip(err.message || String(err));
}
