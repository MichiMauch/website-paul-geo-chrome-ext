// Looping mock-UI demo panels for the landing feature cards.
import React from "react";

const DEMO_ACCENT = "var(--landing-accent, #33CCCC)";

/* ---------- tiny helpers ---------- */
function useCycle(period) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const iv = setInterval(() => setTick((t) => t + 1), period);
    return () => clearInterval(iv);
  }, [period]);
  return tick;
}

function useFlag(delay) {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, []);
  return on;
}

function useCountUp(target, duration, delay) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    let raf = 0, start = null;
    const t = setTimeout(() => {
      const step = (ts) => {
        if (start == null) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); };
  }, [target]);
  return v;
}

function DemoFrame({ title, children }) {
  return (
    <div style={{ aspectRatio: "4 / 3", borderRadius: "var(--radius-lg)", overflow: "hidden", background: "#101314", border: "1px solid rgba(255,255,255,0.09)", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--slate-500)", flexShrink: 0 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: DEMO_ACCENT }}></span>
        {title}
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>{children}</div>
    </div>
  );
}

function MiniBar({ pct, delay, color, height = 7 }) {
  const on = useFlag(80);
  return (
    <div style={{ height, background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
      <div style={{ height: "100%", width: on ? `${pct * 100}%` : 0, borderRadius: "var(--radius-full)", background: color, transition: `width 0.9s var(--ease-reveal) ${delay}ms` }}></div>
    </div>
  );
}

/* ---------- 1 · Instant Analysis: side panel scoring ---------- */
const SCORE_CATS = [["Content", 4], ["Answers", 3], ["Trust", 5], ["Machine", 4], ["Citation", 3], ["SEO", 5]];

function DemoScore() {
  const tick = useCycle(7000);
  return (
    <DemoFrame title="paul — analyzing example.com">
      <ScoreInner key={tick} />
    </DemoFrame>
  );
}
function ScoreInner() {
  const total = useCountUp(24, 1300, 400);
  return (
    <div style={{ position: "absolute", inset: 0, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", fontSize: "clamp(34px, 3vw, 52px)", lineHeight: 1, color: DEMO_ACCENT }}>{total}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-500)" }}>/ 30 · GEO score</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: 4 }}>
        {SCORE_CATS.map(([label, s], i) => (
          <div key={label} style={{ display: "grid", gridTemplateColumns: "76px 1fr 22px", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate-400)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
            <MiniBar pct={s / 5} delay={350 + i * 160} color={s >= 4 ? "var(--score-excellent)" : "var(--score-good)"} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate-500)", textAlign: "right" }}>{s}/5</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 2 · In-page highlighting ---------- */
function Finding({ children, label, delay }) {
  const on = useFlag(delay);
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div style={{ position: "absolute", inset: -4, border: `2px solid ${DEMO_ACCENT}`, borderRadius: 6, opacity: on ? 1 : 0, transition: "opacity 0.3s ease" }}></div>
      <div style={{ position: "absolute", top: -10, right: 2, fontFamily: "var(--font-mono)", fontSize: 9, padding: "3px 7px", background: DEMO_ACCENT, color: "#0A0A0A", borderRadius: 3, opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(5px)", transition: "opacity 0.3s ease, transform 0.3s var(--ease-reveal)", whiteSpace: "nowrap", zIndex: 1 }}>{label}</div>
    </div>
  );
}
function GreyBar({ w, h = 9 }) {
  return <div style={{ height: h, width: w, background: "#DDDDD8", borderRadius: 3 }}></div>;
}
function DemoHighlight() {
  const tick = useCycle(7500);
  return (
    <DemoFrame title="Show on page">
      <div key={tick} style={{ position: "absolute", inset: 16, background: "#F5F5F3", borderRadius: 8, padding: 18, display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }}>
        <GreyBar w="62%" h={16} />
        <GreyBar w="90%" />
        <Finding delay={700} label="This H4 should be an H3">
          <GreyBar w="44%" h={13} />
        </Finding>
        <Finding delay={1800} label="Missing alt text">
          <div style={{ height: 56, background: "#E6E6E1", borderRadius: 5 }}></div>
        </Finding>
        <Finding delay={2900} label="Paragraph too long (873 chars)">
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <GreyBar w="100%" /><GreyBar w="96%" /><GreyBar w="74%" />
          </div>
        </Finding>
      </div>
    </DemoFrame>
  );
}

/* ---------- 3 · Fix snippets ---------- */
const CODE_LINES = [
  ['<script type="application/ld+json">', "#6FBFBF"],
  ["{", "#A8A8A2"],
  ['  "@context": "https://schema.org",', "#A8A8A2"],
  ['  "@type": "Article",', "#E8E8E4"],
  ['  "headline": "AI meets Geo-Data",', "#E8E8E4"],
  ['  "author": { "@type": "Person" },', "#A8A8A2"],
  ['  "datePublished": "2026-06-12"', "#A8A8A2"],
  ["}", "#A8A8A2"],
];
function CodeLine({ text, color, delay }) {
  const on = useFlag(delay);
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.7, color, whiteSpace: "pre", opacity: on ? 1 : 0, transform: on ? "translateX(0)" : "translateX(-8px)", transition: "opacity 0.25s ease, transform 0.25s ease" }}>{text}</div>
  );
}
function CopiedChip() {
  const on = useFlag(2400);
  return (
    <div style={{ position: "absolute", top: 12, right: 14, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", padding: "5px 10px", background: DEMO_ACCENT, color: "#0A0A0A", borderRadius: 3, opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(0.8)", transition: "opacity 0.25s ease, transform 0.3s var(--ease-reveal)" }}>COPIED ✓</div>
  );
}
function DemoSnippets() {
  const tick = useCycle(7000);
  return (
    <DemoFrame title="Fix snippet — JSON-LD">
      <div key={tick} style={{ position: "absolute", inset: 0, padding: "16px 18px" }}>
        {CODE_LINES.map(([text, color], i) => <CodeLine key={i} text={text} color={color} delay={250 + i * 170} />)}
        <CopiedChip />
      </div>
    </DemoFrame>
  );
}

/* ---------- 4 · Domain dashboard ---------- */
const DASH_ROWS = [["/pricing", 11], ["/blog/geo-guide", 17], ["/docs/setup", 22], ["/", 27]];
function DashRow({ url, score, i }) {
  const on = useFlag(250 + i * 200);
  const n = useCountUp(score, 900, 350 + i * 200);
  const color = score < 15 ? "var(--score-poor)" : score < 24 ? "var(--score-moderate)" : "var(--score-excellent)";
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 56px 64px", alignItems: "center", gap: 12, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.07)", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(10px)", transition: "opacity 0.35s ease, transform 0.35s var(--ease-reveal)" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate-300, #C9C9C4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{url}</span>
      <MiniBar pct={score / 30} delay={400 + i * 200} color={color} height={6} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate-400)", textAlign: "right" }}>{n} / 30</span>
    </div>
  );
}
function DemoDashboard() {
  const tick = useCycle(7500);
  return (
    <DemoFrame title="example.com — domain overview">
      <div key={tick} style={{ position: "absolute", inset: 0, padding: "14px 18px" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--slate-500)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>4 pages · worst first ↓</div>
        {DASH_ROWS.map(([url, score], i) => <DashRow key={url} url={url} score={score} i={i} />)}
      </div>
    </DemoFrame>
  );
}

/* ---------- 5 · Report export ---------- */
function DemoReport() {
  const tick = useCycle(7000);
  return (
    <DemoFrame title="HTML report — example.com">
      <ReportInner key={tick} />
    </DemoFrame>
  );
}
function ReportInner() {
  const on = useFlag(350);
  const chip = useFlag(1900);
  return (
    <div style={{ position: "absolute", inset: 16, display: "flex", justifyContent: "center" }}>
      <div style={{ width: "78%", background: "#F5F5F3", borderRadius: 6, padding: 20, display: "flex", flexDirection: "column", gap: 11, opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.5s ease, transform 0.55s var(--ease-reveal)", boxShadow: "0 18px 50px rgba(0,0,0,0.45)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <GreyBar w="46%" h={13} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", fontSize: 22, color: "#0A0A0A" }}>24<span style={{ fontSize: 11, color: "#8A8A85" }}>/30</span></span>
        </div>
        <GreyBar w="100%" /><GreyBar w="93%" /><GreyBar w="97%" /><GreyBar w="68%" />
        <div style={{ height: 1, background: "#DDDDD8" }}></div>
        <GreyBar w="88%" /><GreyBar w="52%" />
        <div style={{ marginTop: 4, alignSelf: "flex-start", fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.1em", padding: "4px 9px", background: chip ? DEMO_ACCENT : "#DDDDD8", color: "#0A0A0A", borderRadius: 3, transition: "background 0.3s ease" }}>SAVE AS PDF</div>
      </div>
    </div>
  );
}

export const DEMOS = [DemoScore, DemoHighlight, DemoSnippets, DemoDashboard, DemoReport];
