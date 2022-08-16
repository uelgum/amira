<script lang="ts">
    import { fly } from "svelte/transition";

    // Types
    import type { FlyParams } from "svelte/transition";

    const inFly: FlyParams = {
        x: -window.innerWidth,
        delay: 350,
    };

    const outFly: FlyParams = {
        x: window.innerWidth,
        duration: 350
    };
</script>

<div class="tab" in:fly={inFly} out:fly={outFly}>
    <slot/>
</div>

<style lang="scss">
    .tab {
        width: 100%;
        height: 100%;
    }
</style>