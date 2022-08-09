<script lang="ts">
    import { fly } from "svelte/transition";

    // Types
    import type { FlyParams } from "svelte/transition";

    const flyIn: FlyParams = {
        x: -window.innerWidth,
        delay: 350
    };

    const flyOut: FlyParams = {
        x: window.innerWidth,
        duration: 350
    };
</script>

<div class="tab" in:fly={flyIn} out:fly={flyOut}>
    <slot/>
</div>

<style lang="scss">
    .tab {
        width: 100%;
        height: 100%;
    }
</style>