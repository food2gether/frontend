import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://192.168.129.71", // Dein Backend-Server
                changeOrigin: true,
                secure: false, // Falls du HTTPS nutzt und selbstsignierte Zertifikate hast
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern-compiler",
            },
        },
    },
});
