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
            { find: "@components", replacement: path.join(__dirname, "src/components") },
            { find: "@utils", replacement: path.join(__dirname, "src/utils") },
            { find: "@views", replacement: path.join(__dirname, "src/views") }
        ]
    }
});