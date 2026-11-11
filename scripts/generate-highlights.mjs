// Build-time generation of the layperson-friendly changelog highlights.
//
// Fetches the extension's CHANGELOG.md and asks Claude (Anthropic) to rewrite it into a
// short, jargon-free "what Paul can do / what's new" overview. The result is
// written to src/changelog/highlights.generated.json and bundled by Vite.
//
// Resilient by design: if ANTHROPIC_API_KEY is missing or the API call fails, the
// script logs a warning and exits 0 WITHOUT touching the existing JSON, so the
// build always succeeds and the last good highlights remain in place.
//
// Env:
//   ANTHROPIC_API_KEY  (required to (re)generate; absent → skip)
//   ANTHROPIC_MODEL    (optional, default "claude-haiku-5-5")

import { writeFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "../src/changelog/highlights.generated.json");
const CHANGELOG_URL =
  "https://raw.githubusercontent.com/MichiMauch/geo-chrome-ext/main/CHANGELOG.md";
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";

function skip(reason) {
  console.warn(`[highlights] skipped: ${reason} — keeping existing highlights.generated.json`);
  process.exit(0);
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) skip("ANTHROPIC_API_KEY not set");

const SYSTEM = `You are a product marketing writer for the Chrome extension "Paul AI GEO Analyzer".
Paul scores web pages on how well they are prepared for AI search (ChatGPT, Perplexity, Google AI Overviews) and classic SEO.
Task: Summarize the (technical, German-language) changelog into ONE compact, layperson-friendly highlights overview that any marketer or website owner without technical background can understand.
Rules:
- Write in English. Friendly, concrete, no developer jargon (no cache prefixes, test counts, module names, permissions).
- NO version numbers, NO dates.
- Describe the BENEFIT to the user, not the technical implementation.
- 5 to 8 highlights, most important first.
Respond only by calling the save_highlights tool.`;

const USER = (changelog) => `Here is the full changelog (in German). Produce the highlights overview with exactly this structure, written in English:
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

  // Structured output via a forced tool call: the model must return its
  // answer as the tool input, which the API delivers as parsed JSON.
  const client = new Anthropic({ apiKey });
  const msg = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: SYSTEM,
    tools: [
      {
        name: "save_highlights",
        description: "Save the layperson-friendly highlights overview.",
        input_schema: {
          type: "object",
          properties: {
            intro: { type: "string" },
            highlights: {
              type: "array",
              items: {
                type: "object",
                properties: { title: { type: "string" }, description: { type: "string" } },
                required: ["title", "description"],
              },
            },
          },
          required: ["intro", "highlights"],
        },
      },
    ],
    tool_choice: { type: "tool", name: "save_highlights" },
    messages: [{ role: "user", content: USER(md) }],
  });

  const parsed = msg.content.find((b) => b.type === "tool_use")?.input;
  if (!parsed) throw new Error(`no tool_use in response (stop_reason: ${msg.stop_reason})`);

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
