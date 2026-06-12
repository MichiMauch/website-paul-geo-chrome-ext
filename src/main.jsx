import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./landing/Landing.jsx";
import { LegalPage } from "./legal/Legal.jsx";
import { PrivacyPolicyPage } from "./legal/PrivacyPolicy.jsx";
import { ChangelogPage } from "./changelog/Changelog.jsx";
import { HighlightsPage } from "./changelog/Highlights.jsx";
import "./styles/index.css";

// Tiny in-app router, no router dep:
//  - stable PATH routes (e.g. /privacy) for URLs that must be permanent
//    (the Chrome Web Store privacy-policy link). Served by nginx's SPA
//    fallback, so a direct load / refresh of /privacy works.
//  - HASH routes (#impressum, #changelog, …) for the rest.
function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/privacy") return { kind: "path", value: "privacy" };
  const hash = window.location.hash.replace(/^#\/?/, "");
  return { kind: "hash", value: hash };
}

function useRoute() {
  const [route, setRoute] = React.useState(getRoute);
  React.useEffect(() => {
    const onChange = () => { setRoute(getRoute()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
      window.removeEventListener("hashchange", onChange);
      window.removeEventListener("popstate", onChange);
    };
  }, []);
  return route;
}

function App() {
  const route = useRoute();

  if (route.kind === "path" && route.value === "privacy") {
    return <PrivacyPolicyPage />;
  }
  if (route.value === "impressum" || route.value === "datenschutz") {
    return <LegalPage page={route.value} />;
  }
  if (route.value === "changelog") {
    return <HighlightsPage />;
  }
  if (route.value === "tech-changelog") {
    return <ChangelogPage />;
  }
  return <Landing />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
