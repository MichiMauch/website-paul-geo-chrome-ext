import React from "react";

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const clamp01 = (v) => Math.max(0, Math.min(1, v));

/**
 * Scroll-driven horizontal card deck. All cards share one sticky 100vh
 * viewport; scrolling down slides the next card in FROM THE RIGHT over the
 * current one, which dims and scales back slightly. Each card gets ~100vh of
 * scroll budget. Children should be <StackCard> elements.
 */
export function StackDeck({ children, dots = true, accent = "var(--teal-500)", style, ...rest }) {
  const ref = React.useRef(null);
  const [p, setP] = React.useState(0); // progress in card units: 0..total-1
  const cards = React.Children.toArray(children);
  const total = cards.length;

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        setP(Math.max(0, Math.min(total - 1, -r.top / vh)));
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
  }, [total]);

  const active = Math.round(p);

  return (
    <div ref={ref} style={{ height: `${total * 100}vh`, position: "relative", ...style }} {...rest}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        {cards.map((child, i) => {
          // slide-in progress for this card (card 0 is always in)
          const tIn = i === 0 ? 1 : easeInOut(clamp01((p - (i - 1) - 0.1) / 0.8));
          // how far the NEXT card covers this one
          const tOut = i === total - 1 ? 0 : easeInOut(clamp01((p - i - 0.1) / 0.8));
          return (
            <div
              key={i}
              aria-hidden={tIn === 0 ? "true" : undefined}
              style={{
                position: "absolute",
                inset: 0,
                zIndex: i + 1,
                transform: `translateX(${(1 - tIn) * 100}%) scale(${1 - tOut * 0.06})`,
                filter: tOut > 0 ? `brightness(${1 - tOut * 0.35})` : "none",
                boxShadow: tIn < 1 && tIn > 0 ? "-40px 0 80px rgba(0,0,0,0.35)" : "none",
                visibility: tIn === 0 ? "hidden" : "visible",
                willChange: "transform, filter",
              }}
            >
              {child}
            </div>
          );
        })}
        {dots && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "clamp(16px, 2.2vw, 32px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: total + 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            {cards.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 8,
                  height: i === active ? 28 : 8,
                  borderRadius: 4,
                  background: i === active ? accent : "rgba(255,255,255,0.25)",
                  transition: "height 0.3s var(--ease-out, ease), background 0.3s ease",
                }}
              ></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * One full-viewport card face. Purely presentational — place inside
 * <StackDeck>, which drives the slide-in-from-right scroll choreography.
 */
export function StackCard({ background = "var(--ink)", color = "var(--paper)", index, total, children, style, ...rest }) {
  return (
    <section
      style={{
        height: "100%",
        overflow: "hidden",
        background,
        color,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...style,
      }}
      {...rest}
    >
      {children}
    </section>
  );
}
