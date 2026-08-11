// /v2 — "The Radiograph": the Paul AI GEO Analyzer landing page as a reading room.
//
// The contract for this surface is the HTML comment at the top of index.html.
// Product truth lives in PRODUCT.md; nothing on this page claims anything the
// extension does not do. The specimen page and the domain board are synthetic
// demonstrations and say so; the survey section is real live data.
import React from "react";
import "./radiograph.css";
import {
  Plate,
  Report,
  Meta,
  Expose,
  Stamped,
  StoreBadge,
  EdgeStrip,
  Perforation,
  Icon,
  useLit,
  useVisible,
  useReduced,
  useSettle,
  STORE_URL,
  REPO_URL,
} from "./parts.jsx";
import { Specimen, XrayPlate, FINDINGS } from "./Specimen.jsx";
import { Survey } from "./Survey.jsx";
import storeBadgeUrl from "../assets/chrome-webstore-badge.png";

/* ============================================================
   The film-edge strip: identification along the top of the plate,
   and this site's navigation.
   ============================================================ */
export const HEADER_H = 52 + 24;

function EdgeNav() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: "var(--plate-void)",
      }}
    >
      <nav
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "0 var(--gutter)",
        }}
      >
        <a
          href="/"
          className="rg-stamp"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "var(--d6)",
            textDecoration: "none",
            minWidth: 0,
          }}
        >
          <span style={{ color: "var(--em)" }}>
            <Icon name="plate" size={16} />
          </span>
          <span style={{ whiteSpace: "nowrap" }}>Paul</span>
          <span
            className="rg-nav-sub"
            style={{
              color: "var(--d4)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            AI GEO Analyzer
          </span>
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <a
            href="/changelog"
            className="rg-stamp rg-nav-link"
            style={{ color: "var(--d4)", textDecoration: "none" }}
          >
            Changelog
          </a>
          <Stamped small>Add to Chrome</Stamped>
        </div>
      </nav>

      {/* The film edge itself: sprocket run and the codes a machine prints
          down the side of a plate. This is the page's identification, and it
          is why the header is not a nav bar. */}
      <EdgeStrip style={{ height: 24 }}>
        <span
          className="rg-stamp"
          style={{ fontSize: 9, color: "var(--em)", flexShrink: 0, whiteSpace: "nowrap" }}
        >
          Exp 0—30
        </span>
        <Perforation count={40} />
        <span
          className="rg-stamp rg-nav-sub"
          style={{ fontSize: 9, flexShrink: 0, whiteSpace: "nowrap" }}
        >
          Specimen · the tab you are on
        </span>
        <Perforation count={22} />
        <span
          className="rg-stamp rg-nav-sub"
          style={{ fontSize: 9, flexShrink: 0, whiteSpace: "nowrap" }}
        >
          6 disciplines
        </span>
      </EdgeStrip>
    </div>
  );
}

/* ============================================================
   1 — The first plate
   ============================================================ */
function Hero() {
  return (
    <Plate
      label="What an answer engine actually reads"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: `calc(${HEADER_H}px + clamp(24px, 4.4vh, 56px))`,
        paddingBottom: "clamp(36px, 6vh, 72px)",
      }}
    >
      <Expose>
        <h1
          className="rg-sign"
          style={{ fontSize: "clamp(50px, 11.2vw, 215px)" }}
        >
          AI sees through
          <br />
          <span style={{ color: "var(--em)" }}>your page.</span>
        </h1>
      </Expose>

      <div
        style={{
          marginTop: "clamp(30px, 4.6vh, 60px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: "clamp(32px, 4vw, 76px)",
          alignItems: "start",
        }}
      >
        <div>
          <p className="rg-read" style={{ maxWidth: "44ch" }}>
            ChatGPT, Claude and Perplexity never see your design. They read the
            structure underneath it — headings, sources, entities, schema. Paul
            is the free Chrome extension that reads that structure the same way,
            scores it <strong>0 to 30</strong>, and hands you the fix.
          </p>

          <div
            style={{
              marginTop: "clamp(26px, 3.4vh, 42px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(16px, 2vw, 28px)",
              flexWrap: "wrap",
            }}
          >
            <Stamped>Add to Chrome — free</Stamped>
            <StoreBadge src={storeBadgeUrl} />
          </div>

          {/* The subject is the extension, and the sentence says so — this
              site itself runs cookieless analytics, and a bare "no tracking"
              could be read against it. */}
          <Meta style={{ marginTop: "clamp(20px, 2.6vh, 30px)" }}>
            The extension sends nothing, anywhere · MIT · 6 languages
          </Meta>
        </div>

        <div>
          <Specimen />
          <Meta style={{ marginTop: 14 }}>
            Drag the exposure · demonstration page
          </Meta>
        </div>
      </div>
    </Plate>
  );
}

/* ============================================================
   2 — The reading: six disciplines, and every finding read off the plate
   ============================================================ */
const READINGS = [
  { name: "Content Clarity", score: 3 },
  { name: "Answerability", score: 2 },
  { name: "Trust & Sources", score: 1 },
  { name: "Machine Readability", score: 2 },
  { name: "AI Citation Readiness", score: 2 },
  { name: "On-Page SEO", score: 3 },
];
const TOTAL = READINGS.reduce((s, r) => s + r.score, 0);

function ReadingRow({ name, score }) {
  const [ref, lit] = useLit(0.6);
  return (
    <div ref={ref} style={{ borderTop: "1px solid var(--d2)", paddingTop: 14 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              flex: 1,
              height: 9,
              background: i < score ? "var(--em)" : "var(--d1)",
              transform: lit ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: `transform 0.5s ${120 + i * 70}ms var(--expose)`,
            }}
          />
        ))}
      </span>
      <div
        className="rg-sign"
        style={{
          marginTop: 12,
          fontSize: "clamp(17px, 1.5vw, 25px)",
          fontWeight: 700,
          lineHeight: 1,
          color: "var(--d6)",
        }}
      >
        {name}
      </div>
      <div
        className="rg-num"
        style={{ marginTop: 6, fontSize: 12, color: "var(--d4)" }}
      >
        {score} of 5
      </div>
    </div>
  );
}

/* The leader line: a reader marking a plate draws one from the note in the
   margin to the region it describes. Selecting a finding draws that line
   across the two columns, so "Show on page" is demonstrated, not asserted.
   Below the stacking breakpoint the columns sit one above the other and the
   line would cross the whole layout, so it is simply not drawn. */
function useLeader(active, wrapRef, listRefs, rowRefs) {
  const [leader, setLeader] = React.useState(null);

  React.useLayoutEffect(() => {
    const draw = () => {
      const wrap = wrapRef.current;
      const from = active && listRefs.current[active];
      const to = active && rowRefs.current[active];
      if (!wrap || !from || !to || window.innerWidth < 900) {
        setLeader(null);
        return;
      }
      const w = wrap.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = a.right - w.left + 6;
      const y1 = a.top + a.height / 2 - w.top;
      const x2 = b.left - w.left - 10;
      const y2 = b.top + b.height / 2 - w.top;
      const mid = x1 + (x2 - x1) * 0.42;
      setLeader({
        d: `M${x1} ${y1} H${mid} V${y2} H${x2}`,
        x2,
        y2,
        w: w.width,
        h: w.height,
      });
    };
    draw();
    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [active, wrapRef, listRefs, rowRefs]);

  return leader;
}

/* How long each finding is held while the section reads itself. Long enough
   to follow the leader to its region and read the sentence. */
const AUTO_HOLD_MS = 2600;

function Reading() {
  const [active, setActive] = React.useState(null);
  const [sticky, setSticky] = React.useState(false);
  /* The section demonstrates itself until someone takes the controls. After
     that it never starts again — a display that keeps interrupting the person
     already using it is worse than one that never moved. */
  const [auto, setAuto] = React.useState(true);
  const reduced = useReduced();
  const [ref, lit] = useLit(0.4);
  const [seenRef, onScreen] = useVisible(0.3);
  const total = useSettle(TOTAL, lit, 1400);
  const wrapRef = React.useRef(null);
  const listRefs = React.useRef({});
  const rowRefs = React.useRef({});
  const leader = useLeader(active, wrapRef, listRefs, rowRefs);

  /* Two ways to take the controls. Pointing at a finding hands over and that
     finding is what stays marked. Merely moving across the section hands over
     too, and then the cycle's last pick is released rather than left standing.
     The ref is what makes the order of mousemove and mouseenter irrelevant:
     whichever arrives first wins, the second is a no-op. */
  const autoRef = React.useRef(true);
  const stopAuto = React.useCallback((release) => {
    if (!autoRef.current) return;
    autoRef.current = false;
    setAuto(false);
    if (release) setActive(null);
  }, []);

  React.useEffect(() => {
    if (!auto || reduced || !onScreen) return;
    let i = 0;
    setActive(FINDINGS[0].id);
    const iv = setInterval(() => {
      i = (i + 1) % FINDINGS.length;
      setActive(FINDINGS[i].id);
    }, AUTO_HOLD_MS);
    return () => clearInterval(iv);
  }, [auto, reduced, onScreen]);

  return (
    <Plate label="How a page is scored">
      <Expose>
        <h2 className="rg-sign rg-s2" style={{ maxWidth: "12ch" }}>
          Six readings.
          <br />
          <span style={{ color: "var(--em)" }}>One number.</span>
        </h2>
      </Expose>

      <Expose delay={80}>
        <p className="rg-read" style={{ marginTop: "clamp(24px, 3vh, 40px)" }}>
          Click the toolbar icon and the side panel scores the tab you are on —
          six disciplines, five points each. Every point it takes off arrives as
          a sentence, not a symbol, and <strong>Show on page</strong> outlines
          the finding where it actually lives.
        </p>
      </Expose>

      <div
        ref={(el) => {
          ref.current = el;
          wrapRef.current = el;
        }}
        onMouseMove={() => stopAuto(true)}
        style={{
          position: "relative",
          marginTop: "clamp(48px, 7vh, 96px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "clamp(40px, 5vw, 88px)",
          alignItems: "start",
        }}
      >
        {leader && (
          /* Keyed on the finding: the draw animation runs on mount, so without
             a fresh element the cycle would only ever animate its first step. */
          <svg
            key={active}
            aria-hidden="true"
            width={leader.w}
            height={leader.h}
            viewBox={`0 0 ${leader.w} ${leader.h}`}
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 3,
              overflow: "visible",
            }}
          >
            <path
              className="rg-leader"
              d={leader.d}
              fill="none"
              stroke="var(--mark)"
              strokeWidth="1"
            />
            <circle
              className="rg-leader-end"
              cx={leader.x2}
              cy={leader.y2}
              r="3.5"
              fill="var(--mark)"
            />
          </svg>
        )}

        {/* The findings, in the extension's own words */}
        <div ref={seenRef}>
          <Meta style={{ marginBottom: "clamp(14px, 2vh, 22px)" }}>
            {auto && !reduced
              ? "Findings on this page · point at one to hold it"
              : "Findings on this page · select one to locate it"}
          </Meta>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {FINDINGS.map((f) => (
              <li key={f.id}>
                <button
                  type="button"
                  ref={(el) => {
                    listRefs.current[f.id] = el;
                  }}
                  aria-pressed={active === f.id}
                  onMouseEnter={() => {
                    stopAuto(false);
                    if (!sticky) setActive(f.id);
                  }}
                  onMouseLeave={() => !sticky && setActive(null)}
                  onFocus={() => {
                    stopAuto(false);
                    if (!sticky) setActive(f.id);
                  }}
                  onBlur={() => !sticky && setActive(null)}
                  onClick={() => {
                    stopAuto(false);
                    const same = sticky && active === f.id;
                    setSticky(!same);
                    setActive(same ? null : f.id);
                  }}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto minmax(0,1fr)",
                    gap: 14,
                    width: "100%",
                    textAlign: "left",
                    padding: "clamp(13px, 1.6vh, 19px) 0",
                    border: 0,
                    borderTop: "1px solid var(--d1)",
                    background:
                      active === f.id ? "rgba(255,92,69,0.05)" : "transparent",
                    color: "inherit",
                    cursor: "pointer",
                    font: "inherit",
                    transition: "background 0.25s var(--expose)",
                  }}
                >
                  <span
                    style={{
                      color: active === f.id ? "var(--mark)" : "var(--d4)",
                      marginTop: 2,
                      transition: "color 0.25s var(--expose)",
                    }}
                  >
                    <Icon name="roi" size={17} />
                  </span>
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--read)",
                        fontSize: "clamp(14.5px, 1.05vw, 17px)",
                        lineHeight: 1.45,
                        color: "var(--d6)",
                      }}
                    >
                      {f.text}
                    </span>
                    <span
                      className="rg-stamp"
                      style={{
                        display: "block",
                        marginTop: 7,
                        fontSize: 10,
                        color: "var(--d4)",
                      }}
                    >
                      {f.where} · {f.cat}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* The plate under study */}
        <div>
          <Meta style={{ marginBottom: "clamp(14px, 2vh, 22px)" }}>
            Specimen · demonstration page
          </Meta>
          <XrayPlate active={active} rowRefs={rowRefs.current} />
        </div>
      </div>

      {/* The reading this plate produces, across the full width */}
      <div style={{ marginTop: "clamp(52px, 8vh, 104px)" }}>
        <Meta style={{ marginBottom: "clamp(18px, 2.4vh, 28px)" }}>
          The six disciplines · five points each
        </Meta>
        <div className="rg-six">
          {READINGS.map((r) => (
            <ReadingRow key={r.name} {...r} />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 18,
            flexWrap: "wrap",
            marginTop: "clamp(30px, 4.4vh, 56px)",
            paddingTop: "clamp(18px, 2.4vh, 28px)",
            borderTop: "1px solid var(--d2)",
          }}
        >
          <span className="rg-stamp" style={{ color: "var(--d4)" }}>
            GEO score for this specimen
          </span>
          <span
            className="rg-sign"
            style={{
              fontSize: "clamp(44px, 6vw, 108px)",
              color: "var(--mark)",
              lineHeight: 0.85,
            }}
          >
            {Math.round(total)}
            <span style={{ color: "var(--d4)" }}> / 30</span>
          </span>
        </div>
      </div>
    </Plate>
  );
}

/* ============================================================
   3 — The prescription, printed
   ============================================================ */
const SNIPPET = `{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "10 Best Hiking Trails in the Alps",
  "author": {
    "@type": "Person",
    "name": "Anna Brunner",
    "jobTitle": "Alpine guide, SAC"
  },
  "datePublished": "2026-04-18",
  "citation": "https://www.alpconv.org/en/home/"
}`;

const DELIVERABLES = [
  ["JSON-LD", "Article, FAQPage, HowTo, Organization — filled in from the page."],
  ["Semantic HTML", "The article, section and heading markup the finding asks for."],
  ["llms.txt", "A template that tells AI crawlers which parts of the site matter."],
  ["robots.txt", "Directives for GPTBot, ClaudeBot, PerplexityBot and the rest."],
  ["Canonical", "The tag, with the URL already resolved."],
];

function CopyBlock({ code }) {
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef(0);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };
  React.useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          border: "1px solid var(--paper-rule)",
          background: "var(--paper-lit)",
          padding: "clamp(20px, 2.4vw, 32px)",
          overflowX: "auto",
        }}
      >
        <pre
          style={{
            margin: 0,
            fontFamily: "var(--stamp)",
            fontSize: "clamp(11.5px, 0.92vw, 13.5px)",
            lineHeight: 1.75,
            color: "var(--paper-ink)",
          }}
        >
          {code}
        </pre>
      </div>
      <button
        type="button"
        onClick={copy}
        className="rg-btn rg-btn--sm"
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: copied ? "var(--em-deep)" : "var(--paper-ink)",
          color: copied ? "var(--em-pale)" : "var(--paper-lit)",
        }}
      >
        <Icon name={copied ? "check" : "copy"} size={13} />
        <span>{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

function Prescription() {
  return (
    <Report label="What the extension hands back">
      <Expose>
        <h2 className="rg-sign rg-s2" style={{ maxWidth: "15ch" }}>
          A diagnosis
          <br />
          you can paste.
        </h2>
      </Expose>

      <div
        style={{
          marginTop: "clamp(36px, 5vh, 72px)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: "clamp(36px, 5vw, 88px)",
          alignItems: "start",
        }}
      >
        <div>
          <Expose>
            <p className="rg-read">
              Naming a problem is the cheap half. Every finding Paul reports
              comes with the artifact that closes it — filled in from the page
              you are on, not a generic snippet you still have to edit.
            </p>
          </Expose>

          <dl style={{ margin: "clamp(28px, 4vh, 48px) 0 0" }}>
            {DELIVERABLES.map(([term, def]) => (
              <div
                key={term}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(130px, 26%) minmax(0,1fr)",
                  gap: "clamp(12px, 2vw, 28px)",
                  padding: "clamp(12px, 1.6vh, 18px) 0",
                  borderTop: "1px solid var(--paper-rule)",
                }}
              >
                <dt
                  className="rg-stamp"
                  style={{ color: "var(--paper-ink)", letterSpacing: "0.12em" }}
                >
                  {term}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: "var(--read)",
                    fontSize: "clamp(14px, 1vw, 16px)",
                    lineHeight: 1.5,
                    color: "var(--paper-d3)",
                  }}
                >
                  {def}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <Meta tone="paper" style={{ marginBottom: 14 }}>
            Fix for “No JSON-LD found” · ready to paste
          </Meta>
          <CopyBlock code={SNIPPET} />

          <div
            style={{
              marginTop: "clamp(34px, 5vh, 62px)",
              paddingTop: "clamp(24px, 3.4vh, 40px)",
              borderTop: "2px solid var(--paper-ink)",
            }}
          >
            <h3
              className="rg-sign rg-s4"
              style={{ color: "var(--paper-ink)", maxWidth: "18ch" }}
            >
              And one file your client keeps.
            </h3>
            <p
              className="rg-read"
              style={{ marginTop: 16, fontSize: "clamp(15px, 1.05vw, 17px)" }}
            >
              Export a standalone HTML report: the score, every finding in plain
              language, every snippet included, Save&nbsp;as&nbsp;PDF built in.
              One file, no account, nothing to log into.
            </p>
          </div>
        </div>
      </div>
    </Report>
  );
}

/* ============================================================
   4 — The board: one domain, every page it has read
   ============================================================ */
const BOARD = [
  { path: "/blog/best-hiking-trails-in-the-alps", gap: "No JSON-LD · no author", score: 13, prev: 11, hist: [9, 10, 11, 11, 13] },
  { path: "/blog/gear-guide-winter-2026", gap: "Claims without a source", score: 15, prev: 15, hist: [14, 15, 15, 15, 15] },
  { path: "/about", gap: "No key-term definitions", score: 17, prev: 14, hist: [12, 13, 14, 16, 17] },
  { path: "/blog/via-alpina-stage-guide", gap: "Key answer buried", score: 19, prev: 21, hist: [21, 22, 21, 20, 19] },
  { path: "/pricing", gap: "No FAQ section", score: 22, prev: 18, hist: [17, 18, 18, 20, 22] },
  { path: "/blog/how-to-read-a-swiss-map", gap: "Meta description too short", score: 26, prev: 24, hist: [20, 22, 24, 25, 26] },
];
const BOARD_COLS = "minmax(0, 1.15fr) minmax(0, 0.85fr) 90px 84px 66px";

function Spark({ points }) {
  const w = 84;
  const h = 26;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const span = Math.max(1, max - min);
  const d = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / span) * (h - 4) - 2;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} aria-hidden="true" style={{ display: "block", overflow: "visible" }}>
      <path d={d} fill="none" stroke="var(--d4)" strokeWidth="1.5" />
    </svg>
  );
}

function Board() {
  return (
    <Plate label="Every page of a domain, worst first">
      {/* The heading holds the margin here and the board runs beside it,
          the way a reading room hangs a series next to its case note. */}
      <div className="rg-margin">
        <Expose>
          <div>
            <h2 className="rg-sign rg-margin-head">
              One domain.
              <br />
              <span style={{ color: "var(--em)" }}>Worst first.</span>
            </h2>
            <p
              className="rg-read"
              style={{ marginTop: "clamp(18px, 2.4vh, 32px)", fontSize: "clamp(15px, 1vw, 17px)" }}
            >
              Every page you have analysed on a domain lands on one board,
              sorted by the score that needs you most. Up to fifty analyses of
              history per URL, so a fix is something you can watch take effect.
            </p>
          </div>
        </Expose>

      <Expose delay={100}>
        <div>
          <div
            className="rg-board-head"
            style={{
              gridTemplateColumns: BOARD_COLS,
              gap: "clamp(12px, 1.8vw, 28px)",
              paddingBottom: 12,
            }}
          >
            <Meta>URL</Meta>
            <Meta>Worst finding</Meta>
            <Meta style={{ textAlign: "right" }}>Score</Meta>
            <Meta style={{ textAlign: "right" }}>History</Meta>
            <Meta style={{ textAlign: "right" }}>Trend</Meta>
          </div>
          {BOARD.map((r) => {
            const delta = r.score - r.prev;
            return (
              <div
                key={r.path}
                className="rg-board-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: BOARD_COLS,
                  gap: "clamp(12px, 1.8vw, 28px)",
                  alignItems: "center",
                  padding: "clamp(12px, 1.6vh, 20px) 0",
                  borderTop: "1px solid var(--d1)",
                }}
              >
                <span
                  className="rg-stamp rg-board-url"
                  style={{
                    fontSize: "clamp(11px, 0.92vw, 13px)",
                    letterSpacing: "0.03em",
                    textTransform: "none",
                    color: "var(--d5)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.path}
                </span>
                <span
                  className="rg-board-gap"
                  style={{
                    fontFamily: "var(--read)",
                    fontSize: "clamp(13px, 1vw, 15px)",
                    color: "var(--d4)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {r.gap}
                </span>
                <span
                  className="rg-sign rg-board-score"
                  style={{
                    fontSize: "clamp(26px, 2.6vw, 44px)",
                    textAlign: "right",
                    lineHeight: 0.9,
                    color: r.score < 18 ? "var(--mark)" : "var(--d6)",
                  }}
                >
                  {r.score}
                  <span
                    className="rg-num rg-board-max"
                    style={{ fontSize: 12, color: "var(--d4)", marginLeft: 6 }}
                  >
                    / 30
                  </span>
                </span>
                <span
                  className="rg-board-spark"
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Spark points={r.hist} />
                </span>
                <span
                  className="rg-num rg-board-trend"
                  style={{
                    fontSize: 13,
                    textAlign: "right",
                    color: delta > 0 ? "var(--em)" : delta < 0 ? "var(--mark)" : "var(--d4)",
                  }}
                >
                  {delta > 0 ? `+${delta}` : delta < 0 ? delta : "—"}
                </span>
              </div>
            );
          })}
          <Meta style={{ marginTop: "clamp(20px, 2.8vh, 34px)" }}>
            Demonstration data · your own board is built from the pages you analyse
          </Meta>
        </div>
      </Expose>
      </div>
    </Plate>
  );
}

/* ============================================================
   5 — The specification: nothing leaves the room
   ============================================================ */
const SPEC = [
  ["Analysis", "Runs entirely in your browser"],
  ["Host permissions", "None — activeTab only"],
  ["Install warnings", "None"],
  ["Page content sent", "Nothing, ever"],
  ["Statistics", "Anonymous, opt-out, percentages only"],
  ["Account", "Not required"],
  ["Interface", "Deutsch · English · Français · Español · Português · Italiano"],
  ["Licence", "MIT — source on GitHub"],
  ["Price", "Free"],
];

function Specification() {
  return (
    <Report label="Privacy and licensing">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "clamp(36px, 5vw, 96px)",
          alignItems: "start",
        }}
      >
        <div>
          <Expose>
            <h2 className="rg-sign rg-s2" style={{ maxWidth: "9ch" }}>
              Nothing leaves the room.
            </h2>
          </Expose>
          <Expose delay={80}>
            <p className="rg-read" style={{ marginTop: "clamp(22px, 3vh, 36px)" }}>
              Paul reads the tab you are already looking at, using Chrome's
              activeTab model. There is no crawler, no server round-trip and no
              account — which is also why it can score a staging site behind a
              login.
            </p>
          </Expose>
          <div style={{ marginTop: "clamp(28px, 4vh, 46px)" }}>
            <Stamped ghost style={{ color: "var(--em-deep)", boxShadow: "inset 0 0 0 1px var(--paper-rule)" }}>
              Add to Chrome — free
            </Stamped>
          </div>
        </div>

        <Expose delay={120}>
          <dl style={{ margin: 0 }}>
            {SPEC.map(([term, def]) => (
              <div
                key={term}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "clamp(11px, 1.5vh, 17px) 0",
                  borderTop: "1px solid var(--paper-rule)",
                }}
              >
                <dt
                  className="rg-stamp"
                  style={{ color: "var(--paper-d3)", flexShrink: 0 }}
                >
                  {term}
                </dt>
                <span
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    minWidth: 12,
                    borderBottom: "1px dotted var(--paper-rule)",
                    transform: "translateY(-3px)",
                  }}
                />
                <dd
                  style={{
                    margin: 0,
                    fontFamily: "var(--read)",
                    fontWeight: 600,
                    fontSize: "clamp(13.5px, 1vw, 16px)",
                    color: "var(--paper-ink)",
                    textAlign: "right",
                  }}
                >
                  {def}
                </dd>
              </div>
            ))}
          </dl>
        </Expose>
      </div>
    </Report>
  );
}

/* ============================================================
   6 — Close
   ============================================================ */
function Close() {
  return (
    <Plate
      label="Install the extension"
      style={{
        paddingTop: "clamp(96px, 16vh, 200px)",
        paddingBottom: 0,
      }}
    >
      <Expose>
        <h2 className="rg-sign rg-s1" style={{ maxWidth: "11ch" }}>
          Put your page on the <span style={{ color: "var(--em)" }}>light box.</span>
        </h2>
      </Expose>

      <div
        style={{
          marginTop: "clamp(38px, 6vh, 76px)",
          display: "flex",
          alignItems: "center",
          gap: "clamp(18px, 2.4vw, 32px)",
          flexWrap: "wrap",
        }}
      >
        <Stamped>Add to Chrome — free</Stamped>
        <StoreBadge src={storeBadgeUrl} height={52} />
      </div>

      <Meta style={{ marginTop: "clamp(20px, 2.6vh, 30px)" }}>
        Works on any page you can open · no account · nothing to configure
      </Meta>

      <footer
        style={{
          marginTop: "clamp(80px, 14vh, 170px)",
          borderTop: "1px solid var(--d1)",
          padding: "24px 0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <Meta>Paul AI GEO Analyzer · NETNODE</Meta>
        <div
          style={{
            display: "flex",
            gap: "clamp(14px, 2vw, 30px)",
            flexWrap: "wrap",
          }}
        >
          {[
            ["Changelog", "/changelog"],
            ["Tech-Changelog", "/tech-changelog"],
            ["Privacy", "/privacy"],
            ["Legal Notice", "/legal-notice"],
            ["Chrome Web Store", STORE_URL],
            ["GitHub", REPO_URL],
          ].map(([t, href]) => (
            <a
              key={t}
              href={href}
              className="rg-stamp rg-link"
              style={{ color: "var(--d4)", borderBottomColor: "transparent" }}
            >
              {t}
            </a>
          ))}
        </div>
      </footer>
    </Plate>
  );
}

/* ============================================================ */
export default function RadiographLanding() {
  return (
    <div className="rg">
      <EdgeNav />
      <Hero />
      <Reading />
      <Survey />
      <Prescription />
      <Board />
      <Specification />
      <Close />
    </div>
  );
}
