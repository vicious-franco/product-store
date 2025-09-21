import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwind from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
