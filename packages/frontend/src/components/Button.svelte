<script lang="ts">
    export let id = "";
</script>

<button id={id} on:click>
    <slot/>
</button>

<style lang="scss">
    @import "../scss/variables";
    
    button {
        background: $PURPLE_080;
        color: $WHITE_090;
        width: 100%;
        padding: 1em;
        border: 1px solid $GRAY;
        border-radius: 0.5em;
        outline: 0px;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 0.025em;
        cursor: pointer;

        &:hover {
            background: $PURPLE;
        }
    }
</style>