import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path to use absolute imports

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
    },
  },
});
