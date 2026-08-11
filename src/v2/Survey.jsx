// /v2 — The survey: every plate the instrument has read so far.
//
// Real aggregate numbers from the public stats API, drawn as instrument
// readings: a calibrated 0–30 scale with a needle, a six-axis discipline plot,
// and the ranked incidence of every gap. Percentages and averages only — no
// URLs, no page content, no absolute counts.
// On any error or missing data this renders nothing, so the page never breaks.
import React from "react";
import { Plate, Meta, Expose, useLit, useSettle } from "./parts.jsx";

const STATS_URL = "https://api.geo.mauch.rocks/v1/stats";

const REC_LABELS = {
  no_facts: "No verifiable facts",
  low_readability: "Hard to read",
  no_author: "No named author",
  no_sourced_claims: "Claims without a source",
  no_definitions: "No key-term definitions",
  few_sections: "Weak section structure",
  no_lists: "No lists or tables",
  no_faq: "No FAQ section",
  no_key_info_upfront: "Key answer buried",
  no_h1: "No clean H1 heading",
  weak_semantic_html: "Weak semantic HTML",
  canonical_missing: "No canonical tag",
  few_entities: "Too few entities",
  no_llms_txt: "No llms.txt",
  low_scanability: "Hard to scan",
  no_schema: "No structured data",
  schema_incomplete: "Incomplete schema markup",
  bad_hierarchy: "Skipped heading levels",
  images_missing_alts: "Images without alt text",
  description_missing: "No meta description",
  description_too_short: "Meta description too short",
  few_sources: "Too few sources",
  no_date: "No publication date",
};

/* Axis labels stay terse — an instrument plot labels its axes, it does not
   caption them, and the short forms keep the hexagon readable on a phone. */
const CATEGORY_META = {
  aiCitation: "AI cite",
  trustSources: "Trust",
  contentClarity: "Clarity",
  onPageSeo: "SEO",
  machineReadability: "Machine",
  answerability: "Answers",
};
const CATEGORY_ORDER = [
  "aiCitation",
  "trustSources",
  "contentClarity",
  "onPageSeo",
  "machineReadability",
  "answerability",
];

function label(key) {
  return (
    REC_LABELS[key] ||
    String(key).replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase())
  );
}

/* ---------- The 0–30 scale, ruled and needled ---------- */
function Scale({ value, max = 30 }) {
  const [ref, lit] = useLit(0.4);
  const v = useSettle(value, lit, 2000);
  const pct = (v / max) * 100;
  const ticks = Array.from({ length: max + 1 }, (_, i) => i);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "clamp(10px, 1.4vw, 22px)",
          flexWrap: "wrap",
        }}
      >
        <span
          className="rg-sign"
          style={{
            fontSize: "clamp(72px, 12vw, 190px)",
            color: "var(--em)",
            lineHeight: 0.8,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {v.toFixed(1)}
        </span>
        <span
          className="rg-sign"
          style={{
            fontSize: "clamp(28px, 3.4vw, 56px)",
            color: "var(--d4)",
            lineHeight: 1,
          }}
        >
          / 30
        </span>
      </div>

      <div style={{ position: "relative", marginTop: "clamp(26px, 3.5vh, 44px)" }}>
        <div
          style={{
            position: "relative",
            height: 3,
            background: "var(--d1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              right: `${100 - pct}%`,
              background: "var(--em)",
            }}
          />
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -13,
              left: `${pct}%`,
              width: 2,
              height: 29,
              marginLeft: -1,
              background: "var(--em-hot)",
              
            }}
          />
        </div>
        <div
          aria-hidden="true"
          style={{ display: "flex", marginTop: 10, height: 12 }}
        >
          {ticks.map((t) => (
            <span
              key={t}
              style={{
                flex: t === max ? "0 0 0" : 1,
                borderLeft: `1px solid ${t % 5 === 0 ? "var(--d3)" : "var(--d1)"}`,
                height: t % 5 === 0 ? 12 : 6,
              }}
            />
          ))}
        </div>
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 6,
          }}
        >
          {[0, 5, 10, 15, 20, 25, 30].map((t) => (
            <span
              key={t}
              className="rg-stamp"
              style={{ fontSize: 10, color: "var(--d4)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Six-axis discipline plot ---------- */
function Profile({ items }) {
  const [ref, lit] = useLit(0.3);
  const CX = 140;
  const CY = 132;
  const R = 88;
  const MAX = 5;
  const n = items.length;
  const ang = (i) => (-90 + (360 / n) * i) * (Math.PI / 180);
  const pt = (i, f) => [CX + R * f * Math.cos(ang(i)), CY + R * f * Math.sin(ang(i))];
  const poly = (f) => items.map((_, i) => pt(i, f).join(",")).join(" ");
  const data = items
    .map((it, i) => pt(i, Math.max(0.05, it.score / MAX)).join(","))
    .join(" ");

  return (
    <div ref={ref} style={{ width: "100%", maxWidth: 460 }}>
      {/* The viewBox carries the axis labels too, so nothing is clipped when
          the section's overflow is hidden. */}
      <svg viewBox="-48 -18 376 300" width="100%" style={{ display: "block" }}>
        {[0.2, 0.4, 0.6, 0.8, 1].map((f) => (
          <polygon
            key={f}
            points={poly(f)}
            fill="none"
            stroke="var(--d1)"
            strokeWidth="1"
          />
        ))}
        {items.map((_, i) => {
          const [x, y] = pt(i, 1);
          return (
            <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="var(--d1)" strokeWidth="1" />
          );
        })}
        <polygon
          points={data}
          fill="rgba(51,204,204,0.14)"
          stroke="var(--em)"
          strokeWidth="1.5"
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            transform: lit ? "scale(1)" : "scale(0.05)",
            transition: "transform 1.6s var(--expose)",
          }}
        />
        {items.map((it, i) => {
          const [x, y] = pt(i, Math.max(0.05, it.score / MAX));
          return <rect key={it.key} x={x - 2.5} y={y - 2.5} width="5" height="5" fill="var(--em-hot)" opacity={lit ? 1 : 0} style={{ transition: "opacity 0.8s 0.9s var(--expose)" }} />;
        })}
        {items.map((it, i) => {
          const [x, y] = pt(i, 1.3);
          const anchor = x < CX - 8 ? "end" : x > CX + 8 ? "start" : "middle";
          return (
            <text
              key={it.key}
              x={x}
              y={y + 4}
              textAnchor={anchor}
              style={{
                fontFamily: "var(--stamp)",
                fontSize: 9.5,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fill: "var(--d4)",
              }}
            >
              {it.label}
            </text>
          );
        })}
        {items.map((it, i) => {
          const [x, y] = pt(i, 1.3);
          const anchor = x < CX - 8 ? "end" : x > CX + 8 ? "start" : "middle";
          return (
            <text
              key={`${it.key}-v`}
              x={x}
              y={y + 18}
              textAnchor={anchor}
              style={{
                fontFamily: "var(--stamp)",
                fontSize: 12,
                fontWeight: 700,
                fill: it.score < 2.5 ? "var(--mark)" : "var(--d6)",
              }}
            >
              {it.score.toFixed(1)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------- Ranked incidence ---------- */
function GapRow({ rank, name, pct }) {
  const [ref, lit] = useLit(0.5);
  const v = useSettle(pct, lit, 1500);
  const heavy = pct >= 50;
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "34px minmax(0,1fr) 66px",
        alignItems: "center",
        gap: "clamp(12px, 1.4vw, 22px)",
        padding: "clamp(11px, 1.3vh, 16px) 0",
        borderTop: "1px solid var(--d1)",
      }}
    >
      <span className="rg-stamp" style={{ fontSize: 10, color: "var(--d4)" }}>
        {String(rank).padStart(2, "0")}
      </span>
      <div style={{ minWidth: 0 }}>
        <div
          className="rg-s4"
          style={{
            fontFamily: "var(--sign)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(17px, 1.7vw, 27px)",
            lineHeight: 1.05,
            letterSpacing: "-0.005em",
            color: "var(--d6)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            marginTop: 7,
            height: 2,
            background: "var(--d1)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              right: `${100 - (lit ? pct : 0)}%`,
              background: heavy ? "var(--mark)" : "var(--em)",
              transition: "right 1.6s var(--expose)",
            }}
          />
        </div>
      </div>
      <span
        className="rg-num"
        style={{
          fontSize: "clamp(15px, 1.3vw, 20px)",
          textAlign: "right",
          color: heavy ? "var(--mark)" : "var(--d5)",
        }}
      >
        {Math.round(v)}%
      </span>
    </div>
  );
}

export function Survey() {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    let alive = true;
    fetch(STATS_URL)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setStats(d))
      .catch(() => alive && setStats(null));
    return () => {
      alive = false;
    };
  }, []);

  const recs = (stats && stats.topRecommendations) || [];
  if (recs.length === 0) return null;

  const gaps = recs.slice(0, 12);
  const cats = (stats && stats.categoryAverages) || {};
  const profile = CATEGORY_ORDER.filter((k) => cats[k] != null).map((k) => ({
    key: k,
    label: CATEGORY_META[k],
    score: Number(cats[k]),
  }));
  const avg = Number(stats.avgScore) || 0;

  return (
    <Plate label="What the instrument has measured so far">
      {/* This section opens on the measurement rather than on a headline: the
          reading is the argument, and the sentence follows it. */}
      <Expose>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          <div>
            <Meta style={{ marginBottom: "clamp(16px, 2.2vh, 28px)" }}>
              Average GEO score, every analysis so far
            </Meta>
            <Scale value={avg} />
          </div>

          <div>
            <h2 className="rg-sign rg-s2" style={{ maxWidth: "13ch" }}>
              Most pages
              <br />
              <span style={{ color: "var(--em)" }}>read thin.</span>
            </h2>
            <p className="rg-read" style={{ marginTop: "clamp(20px, 2.6vh, 34px)" }}>
              These are not projections. Every page anyone has put on this light
              box feeds one anonymous number, and the numbers keep saying the
              same thing: the web is written for readers who already trust it,
              not for a machine that has to verify it first.
            </p>

            {profile.length >= 3 && (
              <div style={{ marginTop: "clamp(34px, 5vh, 64px)" }}>
                <Meta style={{ marginBottom: "clamp(14px, 2vh, 24px)" }}>
                  Where the weakness sits, by discipline · 0–5
                </Meta>
                <Profile items={profile} />
              </div>
            )}
          </div>
        </div>
      </Expose>

      {/* Ranked incidence */}
      <Expose delay={80}>
        <div style={{ marginTop: "clamp(60px, 10vh, 128px)" }}>
          <Meta style={{ marginBottom: "clamp(14px, 2vh, 24px)" }}>
            Every gap, ranked · share of pages affected
          </Meta>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              columnGap: "clamp(36px, 5vw, 88px)",
            }}
          >
            {gaps.map((r, i) => (
              <GapRow
                key={r.key}
                rank={i + 1}
                name={label(r.key)}
                pct={Math.round(r.pct)}
              />
            ))}
          </div>
        </div>
      </Expose>

      {/* PRODUCT.md: percentages only, no absolute counts — so the sample size
          is not printed here even though the API returns it. */}
      <Meta style={{ marginTop: "clamp(34px, 5vh, 60px)" }}>
        Anonymous opt-out statistics · no URLs, no page content
      </Meta>
    </Plate>
  );
}
