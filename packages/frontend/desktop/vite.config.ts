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
            { find: "@atoms", replacement: path.join(__dirname, "src/components/atoms") },
            { find: "@molecules", replacement: path.join(__dirname, "src/components/molecules") },
            { find: "@organisms", replacement: path.join(__dirname, "src/components/organisms") },
            { find: "@internal", replacement: path.join(__dirname, "src/internal") },
            { find: "@layouts", replacement: path.join(__dirname, "src/layouts") },
            { find: "@stores", replacement: path.join(__dirname, "src/stores") },
            { find: "@views", replacement: path.join(__dirname, "src/views") }
        ]
    }
});