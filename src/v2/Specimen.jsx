// /v2 — The specimen on the light box.
//
// One page, laid out once, rendered twice: the way a visitor sees it, and the
// way an answer engine reads it. A draggable exposure divider wipes between the
// two, so the product's whole thesis is one gesture instead of a paragraph.
// Both layers share identical block geometry — that is what makes the wipe
// register instead of smearing.
import React from "react";
import { useReduced, useLit, Icon } from "./parts.jsx";

/* The specimen is a synthetic demonstration page — every finding on it is a
   real finding the extension reports, applied to invented content. */
const SPEC_URL = "example.com/blog/best-hiking-trails-in-the-alps";

/* Shared geometry. Both modes read from this so the wipe lines up exactly.
   Every block also sets flexShrink: 0 — inside the layer's overflow-hidden
   column, a shrinking block would slide the two layers out of register. */
const H = {
  chrome: 32,
  h1: 40,
  h4: 20,
  fig: 104,
  line: 8,
  lineGap: 8,
  claim: 18,
  author: 34,
  schema: 30,
  gap: 12,
};
H.body = H.line * 5 + H.lineGap * 4;
const noShrink = { flexShrink: 0 };

/* ---------- Rendered mode: what a visitor sees ---------- */
function RenderedBlocks() {
  return (
    <>
      <div
        style={{
          ...noShrink,
          height: H.h1,
          display: "flex",
          alignItems: "center",
          fontFamily: "var(--sign)",
          fontWeight: 800,
          fontSize: 30,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          color: "#12181b",
          whiteSpace: "nowrap",
        }}
      >
        10 Best Hiking Trails in the Alps
      </div>

      <div
        style={{
          ...noShrink,
          height: H.h4,
          display: "flex",
          alignItems: "center",
          fontFamily: "var(--read)",
          fontWeight: 600,
          fontSize: 13.5,
          color: "#59635f",
        }}
      >
        Why we love them
      </div>

      {/* Flat vector figure — geometry, not a photograph. */}
      <div
        style={{ ...noShrink, height: H.fig, overflow: "hidden", background: "#dfe3e1" }}
      >
        <svg
          viewBox="0 0 600 150"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <rect width="600" height="150" fill="#dfe3e1" />
          <circle cx="468" cy="42" r="19" fill="#c3cac6" />
          <path d="M0 150 L152 44 L268 150 Z" fill="#a8b2ae" />
          <path d="M196 150 L342 26 L488 150 Z" fill="#8d9a95" />
          <path d="M404 150 L516 68 L600 150 Z" fill="#b3bcb8" />
        </svg>
      </div>

      <div
        style={{
          ...noShrink,
          height: H.body,
          display: "flex",
          flexDirection: "column",
          gap: H.lineGap,
        }}
      >
        {["100%", "97%", "99%", "94%", "62%"].map((w, i) => (
          <div
            key={i}
            style={{ ...noShrink, height: H.line, width: w, background: "#ccd2cf" }}
          />
        ))}
      </div>

      <div
        style={{
          ...noShrink,
          height: H.claim,
          display: "flex",
          alignItems: "center",
          fontFamily: "var(--read)",
          fontSize: 12.5,
          color: "#3d4643",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        “The Alps are the most visited mountain range on Earth.”
      </div>

      <div
        style={{
          ...noShrink,
          height: H.author,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ width: 28, height: 28, background: "#d5dad7" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ height: 7, width: 92, background: "#ccd2cf" }} />
          <div style={{ height: 7, width: 58, background: "#dde1df" }} />
        </div>
      </div>

      <div
        style={{
          ...noShrink,
          height: H.schema,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        {["Share", "Print", "Subscribe"].map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "var(--read)",
              fontSize: 10.5,
              color: "#7b8480",
              border: "1px solid #d3d8d6",
              padding: "4px 10px",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
}

/* ---------- Radiograph mode: what the machine reads ---------- */
function Mark({ children, bad }) {
  return (
    <span
      className="rg-stamp"
      style={{
        fontSize: 9.5,
        letterSpacing: "0.16em",
        color: bad ? "var(--mark)" : "var(--em)",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}

/* A region of the plate. When another region is under study, this one drops
   in density instead of disappearing — the way a reader dims the rest of the
   film to concentrate on one finding. */
function Row({ children, mark, bad, height, id, active, rowRefs }) {
  const dim = active != null && active !== id;
  const on = active != null && active === id;
  return (
    <div
      ref={(el) => {
        if (rowRefs && id) rowRefs[id] = el;
      }}
      style={{
        ...noShrink,
        height,
        display: "flex",
        alignItems: "center",
        gap: 14,
        position: "relative",
        /* Quiet, not erased: the other findings are still findings. */
        opacity: dim ? 0.45 : 1,
        transition: "opacity 0.35s var(--expose)",
      }}
    >
      {on && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-6px -8px",
            boxShadow: `inset 0 0 0 1px ${bad ? "var(--mark)" : "var(--em)"}`,
          }}
        />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {mark && <Mark bad={bad}>{mark}</Mark>}
    </div>
  );
}

export const FINDINGS = [
  {
    id: "h4",
    text: "This H4 follows an H1 and should be an H2.",
    where: "Heading structure",
    cat: "Content Clarity",
  },
  {
    id: "alt",
    text: "Image is missing alt text.",
    where: "Figure 1",
    cat: "On-Page SEO",
  },
  {
    id: "body",
    text: "Paragraph too long (873 characters) — split it or make it a list.",
    where: "Body copy",
    cat: "Answerability",
  },
  {
    id: "claim",
    text: "Claim with no source: “the most visited mountain range on Earth.”",
    where: "Paragraph 3",
    cat: "AI Citation Readiness",
  },
  {
    id: "author",
    text: "No named author and no publication date.",
    where: "Byline",
    cat: "Trust & Sources",
  },
  {
    id: "schema",
    text: "No JSON-LD found — nothing describes this page to a crawler.",
    where: "Document head",
    cat: "Machine Readability",
  },
];

function XrayBlocks({ active, rowRefs }) {
  return (
    <>
      <Row height={H.h1} mark="H1 · unique" id="h1" active={active} rowRefs={rowRefs}>
        <div
          style={{
            height: 22,
            width: "84%",
            background: "var(--em)",
            boxShadow: "0 0 26px rgba(51,204,204,0.32)",
          }}
        />
      </Row>

      <Row height={H.h4} mark="H4 ↯ EXPECTED H2" bad id="h4" active={active} rowRefs={rowRefs}>
        <div
          style={{
            height: 11,
            width: "34%",
            background: "transparent",
            boxShadow: "inset 0 0 0 1px var(--mark)",
          }}
        />
      </Row>

      <Row height={H.fig} bad id="alt" active={active} rowRefs={rowRefs}>
        <div style={{ height: H.fig, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--plate-void)",
              boxShadow: "inset 0 0 0 1px var(--mark)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: "var(--mark)",
            }}
          >
            <Icon name="bang" size={16} />
            <Mark bad>Image · no alt text</Mark>
          </div>
        </div>
      </Row>

      <Row height={H.body} mark="873 chars" bad id="body" active={active} rowRefs={rowRefs}>
        <div style={{ display: "flex", flexDirection: "column", gap: H.lineGap }}>
          {["100%", "97%", "99%", "94%", "62%"].map((w, i) => (
            <div
              key={i}
              style={{ height: H.line, width: w, background: "var(--d2)" }}
            />
          ))}
        </div>
      </Row>

      <Row height={H.claim} mark="Claim · no source" bad id="claim" active={active} rowRefs={rowRefs}>
        <div
          style={{
            height: 9,
            width: "72%",
            background: "var(--d3)",
            borderBottom: "1px solid var(--mark)",
          }}
        />
      </Row>

      <Row height={H.author} mark="No author · no date" bad id="author" active={active} rowRefs={rowRefs}>
        <div
          style={{
            height: 30,
            width: 168,
            boxShadow: "inset 0 0 0 1px var(--d2)",
            background:
              "repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,92,69,0.16) 6px 7px)",
          }}
        />
      </Row>

      <Row height={H.schema} mark="No JSON-LD" bad id="schema" active={active} rowRefs={rowRefs}>
        <div
          style={{
            height: 24,
            width: "46%",
            boxShadow: "inset 0 0 0 1px var(--d2)",
          }}
        />
      </Row>
    </>
  );
}

/* ---------- The plate ---------- */
function Chrome({ xray }) {
  return (
    <div
      style={{
        height: H.chrome,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 14px",
        borderBottom: `1px solid ${xray ? "var(--d1)" : "#d3d8d6"}`,
        background: xray ? "var(--plate-void)" : "#e2e6e4",
        flexShrink: 0,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 8,
            height: 8,
            background: xray ? "var(--d1)" : "#c4cbc8",
          }}
        />
      ))}
      <span
        className="rg-stamp"
        style={{
          marginLeft: 8,
          fontSize: 9.5,
          letterSpacing: "0.1em",
          textTransform: "none",
          color: xray ? "var(--d4)" : "#79837f",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {SPEC_URL}
      </span>
      {xray && (
        <span
          className="rg-stamp"
          style={{
            fontSize: 9.5,
            color: "var(--mark)",
            marginLeft: "auto",
            paddingLeft: 10,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Title 78ch
        </span>
      )}
    </div>
  );
}

function Layer({ xray, style, active, rowRefs, absolute = true }) {
  return (
    <div
      style={{
        position: absolute ? "absolute" : "relative",
        inset: absolute ? 0 : undefined,
        display: "flex",
        flexDirection: "column",
        background: xray ? "var(--plate)" : "#eef1ef",
        ...style,
      }}
    >
      <Chrome xray={xray} />
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          gap: H.gap,
          padding: "18px clamp(18px, 3.4%, 26px)",
          overflow: "hidden",
        }}
      >
        {xray ? <XrayBlocks active={active} rowRefs={rowRefs} /> : <RenderedBlocks />}
      </div>
    </div>
  );
}

/* The same plate, held still for study — used where findings are read off it
   one at a time rather than wiped between two readings. */
export const XrayPlate = React.forwardRef(function XrayPlate(
  { active, rowRefs },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width: "100%",
        boxShadow: "inset 0 0 0 1px var(--d1), 0 40px 80px rgba(0,0,0,0.5)",
      }}
    >
      <Layer xray active={active} rowRefs={rowRefs} absolute={false} />
    </div>
  );
});

export function Specimen({ label = true }) {
  const reduced = useReduced();
  const [ref, lit] = useLit(0.3);
  const boxRef = React.useRef(null);
  const [x, setX] = React.useState(100);
  const [dragging, setDragging] = React.useState(false);
  const swept = React.useRef(false);

  /* The one-time sweep: the beam crosses the specimen the first time it is
     seen, then parks where both readings stay comparable. */
  React.useEffect(() => {
    if (!lit || swept.current) return;
    swept.current = true;
    if (reduced) {
      setX(48);
      return;
    }
    let raf = 0;
    let start = 0;
    const from = 100;
    const to = 48;
    const dur = 1500;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setX(from + (to - from) * e);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [lit, reduced]);

  const fromEvent = (clientX) => {
    const box = boxRef.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    const pct = ((clientX - r.left) / r.width) * 100;
    setX(Math.max(0, Math.min(100, pct)));
  };

  const onPointerDown = (e) => {
    swept.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    fromEvent(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    fromEvent(e.clientX);
  };
  const stop = (e) => {
    setDragging(false);
    if (e.currentTarget.hasPointerCapture?.(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 12 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      swept.current = true;
      setX((v) => Math.max(0, v - step));
      e.preventDefault();
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      swept.current = true;
      setX((v) => Math.min(100, v + step));
      e.preventDefault();
    } else if (e.key === "Home") {
      setX(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setX(100);
      e.preventDefault();
    }
  };

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <div
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stop}
        onPointerCancel={stop}
        className="rg-specimen"
        style={{
          position: "relative",
          width: "100%",
          background: "var(--plate-void)",
          boxShadow: "inset 0 0 0 1px var(--d1), 0 50px 90px rgba(0,0,0,0.55)",
          overflow: "hidden",
          touchAction: "pan-y",
          cursor: dragging ? "grabbing" : "ew-resize",
          userSelect: "none",
        }}
      >
        <Layer xray={false} />
        <Layer
          xray
          style={{ clipPath: `inset(0 0 0 ${x}%)` }}
        />

        {/* Scanner sweep, bounded to the exposed side of the plate */}
        {!reduced && lit && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              clipPath: `inset(0 0 0 ${x}%)`,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 76,
                background:
                  "linear-gradient(180deg, transparent, rgba(51,204,204,0.15) 45%, rgba(94,234,234,0.5) 50%, rgba(51,204,204,0.15) 55%, transparent)",
                animation: "rg-sweep 5.5s var(--expose) infinite",
              }}
            />
          </div>
        )}

        {/* The exposure handle */}
        <div
          role="slider"
          tabIndex={0}
          aria-label="Exposure — wipe between the rendered page and its radiograph"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(x)}
          aria-valuetext={`${Math.round(100 - x)}% radiograph`}
          onKeyDown={onKeyDown}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${x}%`,
            width: 2,
            marginLeft: -1,
            background: "var(--em-hot)",
            
            cursor: "ew-resize",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 40,
              background: "var(--em-hot)",
              color: "var(--plate-void)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              clipPath:
                "polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%)",
            }}
          >
            <Icon name="roi" size={19} />
          </span>
        </div>

        {/* The film's own bottom edge: opaque, so the two readings are
            always legible and never sit on top of the specimen. */}
        {label && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 26,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              padding: "0 12px",
              background: "var(--plate-void)",
              borderTop: "1px solid var(--d1)",
              pointerEvents: "none",
            }}
          >
            <span
              className="rg-stamp"
              style={{
                fontSize: 9,
                color: "var(--d4)",
                opacity: x > 14 ? 1 : 0.25,
                transition: "opacity 0.3s",
              }}
            >
              What you see
            </span>
            <span
              className="rg-stamp"
              style={{
                fontSize: 9,
                color: "var(--em)",
                opacity: x < 86 ? 1 : 0.25,
                transition: "opacity 0.3s",
              }}
            >
              What the machine reads
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
