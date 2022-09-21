import path from "path";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
    plugins: [
        svelte({
            preprocess: sveltePreprocess()
        })
    ],
    build: {
        outDir: "build",
        assetsDir: "public"
    },
    resolve: {
        alias: [
            { find: "@apps", replacement: path.join(__dirname, "src/apps") },
            { find: "@components", replacement: path.join(__dirname, "src/components") },
            { find: "@internal", replacement: path.join(__dirname, "src/internal") },
            { find: "@stores", replacement: path.join(__dirname, "src/stores") },
            { find: "@views", replacement: path.join(__dirname, "src/views") }
        ]
    }
});