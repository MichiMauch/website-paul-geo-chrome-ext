import React from "react";

/**
 * Large media placeholder for the landing page — a beautifully framed slot
 * for a video/GIF/screenshot the user supplies later. Subtle parallax: the
 * inner surface translates slower than scroll. Dashed center label.
 */
export function MediaPlaceholder({ label = "Video / GIF placeholder", ratio = "16 / 9", parallax = 24, dark = false, style, ...rest }) {
  const outer = React.useRef(null);
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    if (!parallax) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!outer.current) return;
        const r = outer.current.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5-ish
        setOffset(Math.max(-1, Math.min(1, progress)) * -parallax);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  return (
    <div
      ref={outer}
      style={{
        aspectRatio: ratio,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        background: dark ? "#141414" : "var(--slate-100)",
        border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--slate-200)",
        position: "relative",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "absolute",
          inset: -Math.abs(parallax) - 8,
          transform: `translateY(${offset}px)`,
          willChange: "transform",
          background: dark
            ? "radial-gradient(120% 90% at 50% 0%, rgba(51,204,204,0.12), transparent 60%)"
            : "radial-gradient(120% 90% at 50% 0%, rgba(51,204,204,0.16), transparent 60%)",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
          justifyContent: "center",
          color: dark ? "var(--slate-500)" : "var(--slate-400)",
        }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="3"></rect>
          <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none"></path>
        </svg>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
