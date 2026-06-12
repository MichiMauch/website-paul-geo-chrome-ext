import React from "react";

/**
 * Animated ambient background for dark full-bleed sections. Absolutely fills
 * its nearest positioned ancestor (give the section position:relative and
 * keep content in a position:relative wrapper so it paints on top).
 * Variants: "aurora" (drifting blurred accent fields), "pulse" (breathing
 * glow), "grid" (fine data grid + scanning beam), "none". All variants lay a
 * very fine diagonal accent gradient over the flat background.
 */
export function Ambient({ variant = "aurora", accent = "var(--landing-accent, #33CCCC)", intensity = 1, seed = 0, style }) {
  if (variant === "none") return null;
  const mix = (pct) => `color-mix(in srgb, ${accent} ${Math.round(pct * intensity)}%, transparent)`;
  const gridMask = "radial-gradient(ellipse 90% 80% at 60% 40%, #000 30%, transparent 75%)";
  // Fade everything out toward the section's top/bottom edges so adjacent
  // sections never show a hard seam.
  const edgeMask = "linear-gradient(180deg, transparent 0%, #000 14%, #000 86%, transparent 100%)";
  const delay = (base) => `${-(seed * 2.7 + base)}s`;
  const flip = seed % 2 === 1;
  return (
    <div
      aria-hidden="true"
      data-ambient={variant}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", maskImage: edgeMask, WebkitMaskImage: edgeMask, transform: flip ? "scaleX(-1)" : "none", ...style }}
    >
      {/* fine diagonal accent tint over the flat ink (masked at the edges) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, transparent 45%, ${mix(6)})` }}></div>

      {variant === "aurora" && (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", top: "-25%", left: "-15%", width: "65%", height: "85%", borderRadius: "50%", background: `radial-gradient(closest-side, ${mix(20)}, transparent 70%)`, filter: "blur(40px)", animation: "paul-drift-a 13s ease-in-out infinite", animationDelay: delay(0), willChange: "transform" }}></div>
          <div style={{ position: "absolute", bottom: "-30%", right: "-12%", width: "70%", height: "95%", borderRadius: "50%", background: `radial-gradient(closest-side, ${mix(15)}, transparent 70%)`, filter: "blur(52px)", animation: "paul-drift-b 19s ease-in-out infinite", animationDelay: delay(4), willChange: "transform" }}></div>
        </div>
      )}

      {variant === "pulse" && (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", top: "5%", right: "-12%", width: "80vmin", height: "80vmin", borderRadius: "50%", background: `radial-gradient(closest-side, ${mix(28)}, transparent 70%)`, animation: "paul-pulse 5s ease-in-out infinite", animationDelay: delay(1), willChange: "transform, opacity" }}></div>
          <div style={{ position: "absolute", bottom: "-18%", left: "-10%", width: "70vmin", height: "70vmin", borderRadius: "50%", background: `radial-gradient(closest-side, ${mix(20)}, transparent 70%)`, animation: "paul-pulse 8s ease-in-out infinite", animationDelay: delay(3.2), willChange: "transform, opacity" }}></div>
        </div>
      )}

      {variant === "grid" && (
        <div style={{ position: "absolute", inset: 0 }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${mix(9)} 1px, transparent 1px), linear-gradient(90deg, ${mix(9)} 1px, transparent 1px)`, backgroundSize: "72px 72px", maskImage: gridMask, WebkitMaskImage: gridMask }}></div>
          <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent 8%, ${mix(55)}, transparent 92%)`, boxShadow: `0 0 28px 2px ${mix(35)}`, animation: "paul-scan 9s linear infinite", animationDelay: delay(2) }}></div>
        </div>
      )}
    </div>
  );
}
