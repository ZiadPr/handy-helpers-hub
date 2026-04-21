import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "node:module";
import { componentTagger } from "lovable-tagger";

const require = createRequire(import.meta.url);
const reactRoot = path.dirname(require.resolve("react/package.json"));
const reactDomRoot = path.dirname(require.resolve("react-dom/package.json"));

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: [
      { find: /^react$/, replacement: path.join(reactRoot, "index.js") },
      { find: /^react\/jsx-runtime$/, replacement: path.join(reactRoot, "jsx-runtime.js") },
      { find: /^react\/jsx-dev-runtime$/, replacement: path.join(reactRoot, "jsx-dev-runtime.js") },
      { find: /^react-dom$/, replacement: path.join(reactDomRoot, "index.js") },
      { find: /^react-dom\/client$/, replacement: path.join(reactDomRoot, "client.js") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"],
    force: true,
  },
}));
