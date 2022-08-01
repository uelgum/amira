<script lang="ts">
    // Komponente
    import TitleBar from "@components/TitleBar.svelte";

    const isTauri = !!window.__TAURI_METADATA__;
</script>

<main>
    {#if isTauri}
        <TitleBar/>
    {/if}
</main>