<script lang="ts">
    /**
        Knöpfe mit dem Attribut `close` werden beim Hovern rot eingefärbt.
    */
    export let close = false;
</script>

<button class="title-bar-button" class:close={close} on:click>
    <slot/>
</button>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .title-bar-button {
        display: flex;
        background: $black;
        color: $white;
        width: 2.5em;
        padding: 0.5em;
        border: none;
        outline: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
            background: $black-light;
        }
    }

    .title-bar-button.close {
        border-top-right-radius: 0.5em;

        &:hover {
            background: $red;
        }
    }
</style>