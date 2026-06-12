import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./landing/Landing.jsx";
import { LegalPage } from "./legal/Legal.jsx";
import { PrivacyPolicyPage } from "./legal/PrivacyPolicy.jsx";
import { ChangelogPage } from "./changelog/Changelog.jsx";
import { HighlightsPage } from "./changelog/Highlights.jsx";
import "./styles/index.css";

// Path-based routing, no router dep. Served by nginx's SPA fallback
// (try_files … /index.html) + absolute asset paths (vite base "/"), so a
// direct load or refresh of any of these paths works.
const PATH_VIEW = {
  "/privacy": "privacy",
  "/legal-notice": "legal-notice",
  "/changelog": "changelog",
  "/tech-changelog": "tech-changelog",
};

// Legacy #-links → new paths, so old URLs (e.g. shared #impressum) keep working.
const LEGACY_HASH = {
  impressum: "/legal-notice",
  datenschutz: "/privacy",
  changelog: "/changelog",
  "tech-changelog": "/tech-changelog",
};

function getView() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return PATH_VIEW[path] || "home";
}

function App() {
  const [view, setView] = React.useState(getView);

  React.useEffect(() => {
    // One-time migration of any legacy hash to its new path.
    const hash = window.location.hash.replace(/^#\/?/, "");
    if (hash && LEGACY_HASH[hash]) {
      window.history.replaceState(null, "", LEGACY_HASH[hash]);
      setView(getView());
      window.scrollTo(0, 0);
    }
    const onPop = () => { setView(getView()); window.scrollTo(0, 0); };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  switch (view) {
    case "privacy": return <PrivacyPolicyPage />;
    case "legal-notice": return <LegalPage />;
    case "changelog": return <HighlightsPage />;
    case "tech-changelog": return <ChangelogPage />;
    default: return <Landing />;
  }
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
