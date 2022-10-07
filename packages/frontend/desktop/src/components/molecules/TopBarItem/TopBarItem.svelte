<div class="top-bar-item" on:click>
    <slot/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .top-bar-item {
        position: relative;
        padding: 0.5em;
        border-radius: 0.25em;
        transition: background 0.25s ease-in-out;
        cursor: pointer;

        &:hover {
            background: $black-even-lighter;
        }
    }
</style>