import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@blocks": path.resolve(__dirname, "./src/blocks"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@composables": path.resolve(__dirname, "./src/composables"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
