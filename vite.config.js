import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes all asset paths relative, so the built `dist/` folder works
// whether you serve it from a domain root or any sub-directory on your server.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
