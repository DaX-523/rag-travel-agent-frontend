import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0, // Disable inlining assets
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // Use relative path to ensure assets work in any deployment environment
  base: "./",
});
