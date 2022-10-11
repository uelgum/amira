<script lang="ts">
    import { fade } from "svelte/transition";

    // Types
    import type { FadeParams } from "svelte/transition";

    const fadeParams: FadeParams = {
        duration: 250
    };
</script>

<div class="dot" in:fade={fadeParams} out:fade={fadeParams}/>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .dot {
        position: absolute;
        display: block;
        background: $red;
        width: 6px;
        height: 6px;
        right: 0.25em;
        bottom: 0.35em;
        border-radius: 50%;
        pointer-events: none;
    }
</style>