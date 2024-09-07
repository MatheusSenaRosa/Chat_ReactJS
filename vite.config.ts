import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/shared/services"),
      "@contexts": path.resolve(__dirname, "src/shared/contexts"),
      "@websockets": path.resolve(__dirname, "src/shared/websockets"),
      "@types": path.resolve(__dirname, "src/shared/types"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
    },
  },
});
