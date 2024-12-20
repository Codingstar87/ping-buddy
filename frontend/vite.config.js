import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1/api": {
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1\/api/, ""), 
      },
    },
  },
});
