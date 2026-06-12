import React from "react";

/** Recursively extract plain text from children (the host may wrap strings in spans). */
function flattenText(node) {
  if (node == null || node === false || node === true) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (node.props) return flattenText(node.props.children);
  return "";
}

/**
 * Oversized landing headline (Archivo Black, tracking −0.03em, leading 0.92)
 * with a word-by-word scroll reveal. Words wrapped in *asterisks* render in
 * the teal accent. size: hero | xl | lg | md → the display scale tokens.
 */
export function DisplayHeadline({ children, size = "xl", reveal = true, as = "h2", style, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(!reveal);

  React.useEffect(() => {
    if (!reveal || !ref.current) return;
    let raf = 0;
    let done = false;
    const check = () => {
      if (done || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // shown once ~35% of the headline has entered the viewport
      if (r.top < vh * 0.85 && r.bottom > 0) {
        done = true;
        setShown(true);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      done = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reveal]);

  const text = flattenText(children);
  // Parse *accent spans* (may cover multiple words), then split into words.
  const words = [];
  if (text) {
    text.trim().split(/(\*[^*]+\*)/).forEach((seg) => {
      if (!seg) return;
      const accent = /^\*[^*]+\*$/.test(seg);
      const clean = accent ? seg.slice(1, -1) : seg;
      clean.split(/\s+/).forEach((w) => {
        if (w) words.push({ word: w, accent });
      });
    });
  }

  const Tag = as;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <Tag
      ref={ref}
      style={{
        margin: 0,
        fontFamily: "var(--font-display)",
        fontWeight: "var(--weight-black)",
        fontStretch: "110%",
        fontSize: `var(--display-${size})`,
        letterSpacing: "var(--tracking-display)",
        lineHeight: "var(--leading-display)",
        textWrap: "balance",
        ...style,
      }}
      {...rest}
    >
      {text
        ? words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", padding: "0.08em 0.06em 0.22em", margin: "-0.08em -0.06em -0.22em" }}>
              <span
                style={{
                  display: "inline-block",
                  color: w.accent ? "var(--landing-accent)" : "inherit",
                  transform: shown || reduced ? "translateY(0)" : "translateY(110%)",
                  transition: `transform var(--dur-reveal) var(--ease-reveal) ${i * 70}ms`,
                }}
              >
                {w.word}
              </span>
              {i < words.length - 1 ? "\u00A0" : ""}
            </span>
          ))
        : children}
    </Tag>
  );
}
