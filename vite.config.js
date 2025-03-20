import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
    server: {
        // https://vite.dev/config/server-options.html#server-watch
        // only active when running in a WSL2 environment
        watch: process.env.WSL_DISTRO_NAME ? { usePolling: true } : undefined
    }
});
