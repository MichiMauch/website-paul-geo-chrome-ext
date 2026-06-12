import React from "react";

/**
 * Uppercase tracked label above landing headlines, optionally numbered
 * ("01 — Instant Analysis"). Teal on light, brighter teal on dark.
 */
export function Eyebrow({ index, children, dark = false, style, ...rest }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "var(--display-eyebrow)",
        fontWeight: 600,
        letterSpacing: "var(--tracking-eyebrow)",
        textTransform: "uppercase",
        color: dark ? "var(--teal-300)" : "var(--teal-500)",
        ...style,
      }}
      {...rest}
    >
      {index ? `${index} — ` : ""}
      {children}
    </div>
  );
}
