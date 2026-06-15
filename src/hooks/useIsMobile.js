import React from "react";

/**
 * Returns true while the viewport is at or below `breakpoint` (px).
 * Used to switch the few inline-styled layouts (two-column grids, the fixed
 * nav) to a stacked, single-column treatment on phones. SSR-safe-ish: starts
 * false, then syncs on mount — this is a client-rendered Vite SPA.
 */
export function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
