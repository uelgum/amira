<script lang="ts">
    import { onMount } from "svelte";

    // Intern
    import envStore from "@stores/env";

    // Komponente
    import TitleBar from "@components/TitleBar.svelte";

    let isTauri: boolean;

    onMount(() => {
        envStore.subscribe((env) => {
            isTauri = (env === "tauri");
        });
    });
</script>

<main>
    {#if isTauri}
        <TitleBar/>
    {/if}
</main>