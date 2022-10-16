<script lang="ts">
    import Loader from "@atoms/Loader";

    // Layouts
    import Center from "@layouts/Center";

    /**
        Ob der Inhalt geladen ist.
    */
    export let isLoaded: boolean;
</script>

{#if !isLoaded}
    <Center>
        <Loader/>
    </Center>
{:else}
    <slot/>
{/if}