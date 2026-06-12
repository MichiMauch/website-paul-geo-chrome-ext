// Full-screen sections: "Watch Paul analyze" sticky scroll-telling + Privacy.
import React from "react";
import { Eyebrow } from "../components/Eyebrow.jsx";
import { DisplayHeadline } from "../components/DisplayHeadline.jsx";
import { Ambient } from "../components/Ambient.jsx";

/* ---------- "Watch Paul analyze" — sticky scroll-telling ---------- */
const ANALYZE_STEPS = [
  { name: "Content Clarity", desc: "Paul reads your headings first — checking for one clear H1 and a hierarchy that doesn't skip levels.", score: 4 },
  { name: "Answerability", desc: "Dense intros become invisible to AI. Paul flags prose that should be a list, definition or Q&A block.", score: 3 },
  { name: "Trust & Sources", desc: "AI cites pages it can trust. Missing author and publication dates cost you credibility.", score: 2 },
  { name: "Machine Readability", desc: "Paul generates the Schema.org and semantic markup that lets machines actually parse your page.", score: 5 },
  { name: "AI Citation Readiness", desc: "Claims without sources don't get quoted. Paul spots unsourced statements and FAQ gaps.", score: 3 },
  { name: "On-Page SEO", desc: "The fundamentals still count — image alt text, title, meta and canonical tags.", score: 4 },
];
const ANALYZE_TOTAL = ANALYZE_STEPS.reduce((s, x) => s + x.score, 0);
const ISSUE = "#FF5C45";

/* Annotation wrapper for a block in the mock page. */
function Anno({ active, tone = "good", label, side = "right", children }) {
  const color = tone === "bad" ? ISSUE : "var(--teal-500)";
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div aria-hidden="true" style={{ position: "absolute", inset: -7, border: `2px solid ${color}`, borderRadius: 7, opacity: active ? 1 : 0, transform: active ? "scale(1)" : "scale(1.03)", transition: "opacity 0.4s ease, transform 0.4s var(--ease-reveal)", pointerEvents: "none" }}></div>
      <div aria-hidden="true" style={{ position: "absolute", top: -13, [side]: 6, background: color, color: "#0A0A0A", fontFamily: "var(--font-mono)", fontSize: 10.5, fontWeight: 600, padding: "3px 8px", borderRadius: 4, whiteSpace: "nowrap", opacity: active ? 1 : 0, transform: active ? "translateY(0)" : "translateY(6px)", transition: "opacity 0.4s ease, transform 0.4s var(--ease-reveal)", zIndex: 4, boxShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>{label}</div>
    </div>
  );
}

function PageBar({ w, dark }) {
  return <div style={{ height: 8, width: w, background: dark ? "#C7C7C2" : "#E2E2DD", borderRadius: 3 }}></div>;
}

/* Self-contained scanning line. */
function ScanLine({ active }) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => setP((v) => (v + 1.4) % 116), 38);
    return () => clearInterval(iv);
  }, [active]);
  const y = p - 8;
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, top: `${y}%`, height: 2, background: "linear-gradient(90deg, transparent, var(--teal-500), transparent)", boxShadow: "0 0 22px 3px color-mix(in srgb, var(--teal-500) 45%, transparent)", opacity: active ? 0.9 : 0, transition: "opacity 0.4s ease", pointerEvents: "none", zIndex: 5 }}></div>
  );
}

/* The mock webpage being analyzed. `step` drives which annotations show. */
function MockPage({ step }) {
  return (
    <div style={{ position: "relative", background: "#F6F6F3", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", boxShadow: "0 40px 90px rgba(0,0,0,0.5)", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "11px 14px", borderBottom: "1px solid #E5E5E0", background: "#ECECE8", flexShrink: 0 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#D8453B" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#E0A93B" }}></span>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#4FB05A" }}></span>
        <Anno active={step === 5} tone="bad" label="Title 78 chars · too long" side="left">
          <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "#8A8A85", display: "inline-block" }}>example.com/blog/alpine-hiking-trails-guide</span>
        </Anno>
      </div>
      <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
        <ScanLine active={true} />
        <div style={{ position: "absolute", inset: 0, padding: "26px clamp(20px, 2.4vw, 38px)", display: "flex", flexDirection: "column", gap: 20, overflow: "hidden" }}>
          <Anno active={step === 0} tone="good" label="H1 · clear & unique">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 2.2vw, 34px)", lineHeight: 1.05, color: "#1A1A18", letterSpacing: "-0.02em" }}>
              10 Best Hiking Trails in the Alps
            </div>
          </Anno>

          <Anno active={step === 0} tone="bad" label="H4 after H1 → should be H2" side="left">
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(13px, 1.1vw, 16px)", color: "#56564F" }}>
              Why we love them
            </div>
          </Anno>

          <Anno active={step === 1} tone="good" label="→ turn into a scannable list">
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <PageBar w="100%" /><PageBar w="97%" /><PageBar w="92%" /><PageBar w="74%" />
            </div>
          </Anno>

          <Anno active={step === 2} tone="bad" label="Author & date missing" side="left">
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#E2E2DD" }}></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <PageBar w={88} /><PageBar w={56} />
              </div>
            </div>
          </Anno>

          <Anno active={step === 4} tone="bad" label="Unsourced claim">
            <div style={{ fontFamily: "var(--font-sans)", fontSize: "clamp(12px, 1vw, 15px)", color: "#3A3A36", lineHeight: 1.5 }}>
              The Alps are the most visited mountain range on Earth.
            </div>
          </Anno>

          <Anno active={step === 5} tone="bad" label="Missing alt text" side="left">
            <div style={{ height: "clamp(60px, 9vh, 104px)", background: "linear-gradient(135deg, #DEDED8, #E9E9E4)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#B4B4AE" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M21 15l-5-5L5 21"></path></svg>
            </div>
          </Anno>

          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            <PageBar w="96%" /><PageBar w="88%" />
          </div>
        </div>

        <div aria-hidden="true" style={{ position: "absolute", left: "clamp(20px, 2.4vw, 38px)", right: "clamp(20px, 2.4vw, 38px)", bottom: 18, background: "#0E1112", border: "1px solid var(--teal-border, rgba(51,204,204,0.4))", borderRadius: 8, padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: 11, lineHeight: 1.6, color: "#9FE6E6", opacity: step === 3 ? 1 : 0, transform: step === 3 ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.4s ease, transform 0.45s var(--ease-reveal)", boxShadow: "0 18px 40px rgba(0,0,0,0.45)" }}>
          <div style={{ color: "var(--teal-300)", marginBottom: 3 }}>✓ JSON-LD injected · semantic HTML</div>
          <div style={{ color: "#6FBFBF" }}>{'{ "@type": "Article", "author": {…} }'}</div>
        </div>
      </div>
    </div>
  );
}

export function Categories() {
  const ref = React.useRef(null);
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(1, total));
      const p = total > 0 ? scrolled / total : 0;
      const s = Math.min(ANALYZE_STEPS.length - 1, Math.floor(p * ANALYZE_STEPS.length + 0.0001));
      setStep((prev) => (prev === s ? prev : s));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const cur = ANALYZE_STEPS[step];
  const runningTotal = ANALYZE_STEPS.slice(0, step + 1).reduce((s, x) => s + x.score, 0);

  return (
    <section ref={ref} data-screen-label="Watch Paul analyze" style={{ position: "relative", height: `${ANALYZE_STEPS.length * 80}vh`, background: "var(--ink)", color: "var(--paper)" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", alignItems: "center", gap: "clamp(20px, 4vw, 72px)", padding: "0 clamp(24px, 5vw, 72px)", boxSizing: "border-box" }}>
        <div style={{ height: "min(74vh, 620px)" }}>
          <MockPage step={step} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "clamp(16px, 3vh, 30px)" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "var(--teal-400)", boxShadow: "0 0 0 0 var(--teal-500)", animation: "paul-pulse 1.6s ease-in-out infinite" }}></span>
            <Eyebrow dark style={{ margin: 0 }}>Live analysis</Eyebrow>
            <span style={{ flex: 1 }}></span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--slate-500)" }}>scroll to scan ↓</span>
          </div>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px, 1vw, 15px)", color: "var(--teal-300)", marginBottom: 8 }}>
            0{step + 1} <span style={{ color: "var(--slate-500)" }}>/ 0{ANALYZE_STEPS.length}</span>
          </div>

          <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: 600, fontStretch: "100%", fontSize: "clamp(32px, 4.6vw, 84px)", lineHeight: 1.0, letterSpacing: "var(--tracking-tight)", color: "var(--paper)" }}>
            {cur.name}
          </h2>

          <p style={{ margin: "clamp(16px, 2.4vh, 26px) 0 0", maxWidth: "40ch", fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.25vw, 19px)", lineHeight: 1.5, color: "var(--slate-400)" }}>
            {cur.desc}
          </p>

          <div style={{ marginTop: "clamp(22px, 4vh, 44px)", display: "flex", alignItems: "flex-end", gap: "clamp(20px, 3vw, 44px)" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate-500)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 8 }}>This signal</div>
              <div style={{ display: "flex", gap: 6 }}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <span key={n} style={{ width: "clamp(14px, 1.4vw, 22px)", height: "clamp(14px, 1.4vw, 22px)", borderRadius: 3, background: n < cur.score ? "var(--teal-500)" : "rgba(245,245,243,0.12)", transition: "background 0.35s ease" }}></span>
                ))}
              </div>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--slate-500)", textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 4 }}>Running score</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontStretch: "110%", fontSize: "clamp(34px, 4vw, 64px)", lineHeight: 1, letterSpacing: "var(--tracking-display)", color: "var(--landing-accent)" }}>
                {runningTotal}<span style={{ fontSize: "0.4em", color: "var(--slate-500)" }}> / {ANALYZE_TOTAL}</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: "clamp(22px, 4vh, 40px)" }}>
            {ANALYZE_STEPS.map((_, i) => (
              <span key={i} style={{ height: 4, flex: 1, borderRadius: 2, background: i <= step ? "var(--teal-500)" : "rgba(245,245,243,0.14)", transition: "background 0.35s ease" }}></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Privacy statement ---------- */
const PRIVACY_STATS = [
  ["100%", "local analysis"],
  ["0", "host permissions"],
  ["0", "install warnings"],
  ["6", "languages"],
];

function StatNumber({ value, entered, delay = 0 }) {
  const m = String(value).match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const suffix = m ? m[2] : "";
  const [disp, setDisp] = React.useState("0");
  React.useEffect(() => {
    if (!entered) return;
    let raf = 0, iv = 0, start = null;
    const t = setTimeout(() => {
      if (target > 0) {
        const dur = 1300;
        const step = (ts) => {
          if (start == null) start = ts;
          const p = Math.min(1, (ts - start) / dur);
          setDisp(String(Math.round(target * (1 - Math.pow(1 - p, 3)))));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      } else {
        let n = 0;
        iv = setInterval(() => {
          n++;
          if (n >= 9) { setDisp("0"); clearInterval(iv); }
          else setDisp(String(Math.floor(Math.random() * 9) + 1));
        }, 75);
      }
    }, delay);
    return () => { clearTimeout(t); cancelAnimationFrame(raf); clearInterval(iv); };
  }, [entered]);
  return <span>{disp}{suffix}</span>;
}

export function Privacy({ ambient = "aurora" }) {
  const AmbientBg = Ambient;
  const ref = React.useRef(null);
  const [entered, setEntered] = React.useState(false);
  React.useEffect(() => {
    let raf = 0, done = false;
    const check = () => {
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (r.top < vh * 0.55 && r.bottom > 0) {
        done = true;
        setEntered(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(check); };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { done = true; window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section ref={ref} data-screen-label="Privacy" style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--paper)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 72px)", boxSizing: "border-box", position: "relative", overflow: "hidden" }}>
      <AmbientBg variant={ambient} seed={6} />
      <Eyebrow dark style={{ position: "relative" }}>Privacy-first</Eyebrow>
      <DisplayHeadline size="xl" style={{ marginTop: 20, maxWidth: "13ch", position: "relative" }}>
        Nothing leaves *your browser.*
      </DisplayHeadline>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "12px 32px", marginTop: 24, position: "relative" }}>
        <p style={{ margin: 0, maxWidth: "46ch", fontFamily: "var(--font-sans)", fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.55, color: "var(--slate-400)" }}>
          Built on the activeTab model — no tracking, no data sent anywhere. Auto-detects your language: Deutsch, English, Français, Español, Português, Italiano.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "clamp(16px, 3vw, 48px)", marginTop: "clamp(32px, 6vh, 64px)", position: "relative" }}>
        {PRIVACY_STATS.map(([num, label], i) => (
          <div key={label} style={{ borderTop: "1px solid rgba(255,255,255,0.16)", paddingTop: 18 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontStretch: "110%", fontSize: "clamp(36px, 4.5vw, 80px)", lineHeight: 1, letterSpacing: "var(--tracking-display)", color: "var(--landing-accent)" }}>
              <StatNumber value={num} entered={entered} delay={i * 160} />
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(10px, 0.9vw, 13px)", color: "var(--slate-400)", marginTop: 10, textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
