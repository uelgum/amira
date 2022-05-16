import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";

const production = !process.env.ROLLUP_WATCH;

const serve = () => {
    let server;

    const handleExit = () => {
        if(server) server.kill(0);
    };

    return {
        writeBundle: () => {
            if(server) return;

            server = require("child_process").spawn("sirv", [ "./public", "--no-clear" ], {
                stdio: [ "ignore", "inherit", "inherit" ],
                shell: true
            });

            process.on("SIGTERM", handleExit);
            process.on("exit", handleExit);
        }
    };
};

export default {
    input: "./src/main.ts",
    output: {
        sourcemap: true,
        format: "iife",
        name: "app",
        file: "./public/build/bundle.js"
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                dev: !production
            }
        }),
        css({ output: "bundle.css" }),
        resolve({
            browser: true,
            dedupe: [ "svelte" ]
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production
        }),
        alias({
            entries: []
        }),
        !production && serve(),
        !production && livereload("./public"),
        production && terser()
    ],
    watch: {
        clearScreen: true
    }
};