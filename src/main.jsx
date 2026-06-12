import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./landing/Landing.jsx";
import { LegalPage } from "./legal/Legal.jsx";
import { ChangelogPage } from "./changelog/Changelog.jsx";
import "./styles/index.css";

// Tiny hash router — keeps the build a single static bundle, no router dep.
function useHashRoute() {
  const get = () => window.location.hash.replace(/^#\/?/, "");
  const [route, setRoute] = React.useState(get);
  React.useEffect(() => {
    const onChange = () => { setRoute(get()); window.scrollTo(0, 0); };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function App() {
  const route = useHashRoute();
  if (route === "impressum" || route === "datenschutz") {
    return <LegalPage page={route} />;
  }
  if (route === "changelog") {
    return <ChangelogPage />;
  }
  return <Landing />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
