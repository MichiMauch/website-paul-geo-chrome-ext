// /v2 "The Radiograph" — the shared instrument parts.
// Every piece here belongs to the light box: the film-edge stamp strip, the
// stamped controls, the drawn icon set, the exposure reveal, and the calibrated
// section shells. Nothing generic lives in this file.
import React from "react";

export const STORE_URL =
  "https://chromewebstore.google.com/detail/paul-ai-geo-analyzer/eemhdjjmecfgooahgoknmolojnjmiiic";
export const REPO_URL = "https://github.com/MichiMauch/geo-chrome-ext";

/* ---------- Reduced motion, read once ---------- */
export function useReduced() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

/* ---------- Exposure: the one motion the page owns.
   Content is dim and unresolved until the beam reaches it, then it develops.
   Not a fade-up — a density change, which is what this world does. ---------- */
export function useLit(threshold = 0.22) {
  const ref = React.useRef(null);
  const [lit, setLit] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, lit];
}

/* Unlike useLit, this keeps watching: a demonstration that plays itself should
   run while it is on screen and stop when it is not. */
export function useVisible(threshold = 0.25) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

export function Expose({ delay = 0, as: As = "div", style, children, ...rest }) {
  const [ref, lit] = useLit();
  return (
    <As
      ref={ref}
      className="rg-ex"
      data-lit={lit ? "1" : "0"}
      style={{ "--ex-delay": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </As>
  );
}

/* ---------- Counting up is the needle settling, not a party trick ---------- */
export function useSettle(target, active, duration = 1700) {
  const reduced = useReduced();
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setVal(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration, reduced]);
  return val;
}

/* ---------- Drawn icons. One family, 1.5 stroke, 24 grid. ---------- */
const PATHS = {
  arrow: ["M3.5 12h15.5", "M13 6l6 6-6 6"],
  roi: ["M12 2.5v3.5", "M12 18v3.5", "M2.5 12h3.5", "M18 12h3.5"],
  copy: ["M9 9h11v11H9z", "M15 5.5H4.5v11H7"],
  check: ["M4 12.5l5 5L20 6"],
  bang: ["M12 4.5L21.5 20h-19L12 4.5z", "M12 10v4.5", "M12 17.6v.01"],
  down: ["M12 4v15", "M6 13l6 6 6-6"],
  bone: ["M6 6h12", "M6 12h12", "M6 18h12", "M12 6v12"],
  lock: ["M6 11h12v9H6z", "M8.5 11V8a3.5 3.5 0 017 0v3"],
  plate: ["M4 4h16v16H4z", "M4 9.5h16", "M9.5 9.5V20"],
};

export function Icon({ name, size = 20, ...rest }) {
  const d = PATHS[name] || PATHS.roi;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
      {...rest}
    >
      {name === "roi" && (
        <circle cx="12" cy="12" r="5.2" strokeWidth="1.5" />
      )}
      {d.map((seg, i) => (
        <path key={i} d={seg} />
      ))}
    </svg>
  );
}

/* ---------- The stamped control ---------- */
export function Stamped({
  children,
  href = STORE_URL,
  small = false,
  ghost = false,
  style,
  ...rest
}) {
  return (
    <a
      href={href}
      className={`rg-btn${small ? " rg-btn--sm" : ""}${ghost ? " rg-btn--ghost" : ""}`}
      style={style}
      {...rest}
    >
      <span>{children}</span>
      <Icon name="arrow" size={small ? 14 : 17} />
    </a>
  );
}

/* ---------- Official Chrome Web Store badge.
   Google artwork: link out, resize only, never recolour. ---------- */
export function StoreBadge({ src, height = 46, style }) {
  return (
    <a
      href={STORE_URL}
      aria-label="Available in the Chrome Web Store"
      style={{ display: "inline-block", lineHeight: 0, ...style }}
    >
      <img
        src={src}
        alt="Available in the Chrome Web Store"
        style={{ height, width: "auto", display: "block" }}
      />
    </a>
  );
}

/* ---------- Film-edge stamp strip.
   The identification a machine prints along the edge of a plate — and,
   here, the site's navigation. ---------- */
export function EdgeStrip({ children, tone = "plate", style }) {
  const dark = tone === "plate";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "0 var(--gutter)",
        height: 34,
        borderBottom: `1px solid ${dark ? "var(--d1)" : "var(--paper-rule)"}`,
        background: dark ? "var(--plate-void)" : "var(--paper-lit)",
        color: dark ? "var(--d4)" : "var(--paper-d3)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Perforation run — the sprocket edge of the film, drawn as geometry. */
export function Perforation({ count = 26, tone = "plate" }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: "flex",
        gap: 6,
        alignItems: "center",
        flex: 1,
        minWidth: 0,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: 5,
            flexShrink: 0,
            background:
              tone === "plate" ? "var(--d1)" : "var(--paper-rule)",
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Section shells ---------- */
export function Plate({ id, label, children, grid = true, style, ...rest }) {
  return (
    <section
      id={id}
      aria-label={label}
      style={{
        position: "relative",
        background: "var(--plate)",
        padding: "clamp(76px, 12vh, 156px) var(--gutter)",
        overflow: "hidden",
        ...style,
      }}
      {...rest}
    >
      {grid && <div className="rg-grid" aria-hidden="true" />}
      {/* width:100% matters — a flex-column section with `margin: 0 auto`
          would otherwise shrink-wrap this wrapper to its content. */}
      <div
        style={{ position: "relative", width: "100%", maxWidth: 1560, margin: "0 auto" }}
      >
        {children}
      </div>
    </section>
  );
}

export function Report({ id, label, children, style, ...rest }) {
  return (
    <section
      id={id}
      aria-label={label}
      className="rg-paper"
      style={{
        position: "relative",
        padding: "clamp(76px, 12vh, 156px) var(--gutter)",
        ...style,
      }}
      {...rest}
    >
      {/* width:100% matters — a flex-column section with `margin: 0 auto`
          would otherwise shrink-wrap this wrapper to its content. */}
      <div
        style={{ position: "relative", width: "100%", maxWidth: 1560, margin: "0 auto" }}
      >
        {children}
      </div>
    </section>
  );
}

/* ---------- A measured caption: the small print a machine sets ---------- */
export function Meta({ children, tone = "plate", style }) {
  return (
    <p
      className="rg-stamp"
      style={{
        margin: 0,
        color: tone === "plate" ? "var(--d4)" : "var(--paper-d3)",
        letterSpacing: "0.18em",
        lineHeight: 1.7,
        ...style,
      }}
    >
      {children}
    </p>
  );
}
