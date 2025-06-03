import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  allowedHosts: ["localhost", "127.0.0.1", ".ngrok-free.app"]
});
