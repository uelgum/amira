<script lang="ts">
    import presence from "@stores/presence";

    // Komponente
    import PresenceStatus from "@amira/shared/components/PresenceStatus";

    export let width = "2.25em";
    export let height = "2.25em";
</script>

<div class="avatar" style="--width: {width}; --height: {height}">
    <div class="presence-status-container">
        <PresenceStatus type={$presence}/>
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .avatar {
        position: relative;
        background: $black-lightest;
        width: var(--width);
        height: var(--height);
        border-radius: 50%;
        pointer-events: none;

        .presence-status-container {
            position: absolute;
            right: -0.15em;
            bottom: 0em;
        }
    }
</style>