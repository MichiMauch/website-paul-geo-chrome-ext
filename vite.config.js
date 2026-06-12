import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "/" → absolute asset paths. The site is served at the domain root and
// uses stable path routes (e.g. /privacy, the permanent Chrome Web Store
// privacy-policy URL). Absolute paths keep assets resolvable on those routes
// regardless of path depth or a trailing slash.
export default defineConfig({
  plugins: [react()],
  base: "/",
});
