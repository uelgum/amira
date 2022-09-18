<script lang="ts">
    export let fullWidth = false;
</script>

<button class="button" class:full-width={fullWidth} on:click>
    <slot/>
</button>

<style lang="scss">
    @use "../../scss/colors" as *;

    .button {
        background: $blue;
        color: $white;
        padding: 0.75em 2em 0.75em 2em;
        border: none;
        border-radius: 0.5em;
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 1px;
        cursor: pointer;

        &.full-width {
            width: 100%;
        }
    }
</style>