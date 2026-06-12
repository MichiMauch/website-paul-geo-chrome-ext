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

const SYSTEM = `You are a product marketing writer for the Chrome extension "Paul AI GEO Analyzer".
Paul scores web pages on how well they are prepared for AI search (ChatGPT, Perplexity, Google AI Overviews) and classic SEO.
Task: Summarize the (technical, German-language) changelog into ONE compact, layperson-friendly highlights overview that any marketer or website owner without technical background can understand.
Rules:
- Write in English. Friendly, concrete, no developer jargon (no cache prefixes, test counts, module names, permissions).
- NO version numbers, NO dates.
- Describe the BENEFIT to the user, not the technical implementation.
- 5 to 8 highlights, most important first.
Respond as JSON only.`;

const USER = (changelog) => `Here is the full changelog (in German). Produce the highlights overview as JSON with exactly this structure, written in English:
{
  "intro": "1-2 sentences on what Paul fundamentally does for the user",
  "highlights": [ { "title": "short heading (max ~6 words)", "description": "1-2 simple sentences about the benefit" } ]
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
