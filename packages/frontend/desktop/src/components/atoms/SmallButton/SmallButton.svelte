<button class="small-button" on:click>
    <slot/>
</button>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .small-button {
        display: flex;
        background: $black-lighter;
        color: $white-light;
        width: fit-content;
        padding: 0.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        transition: 0.25s ease;
        justify-content: space-between;
        gap: 0.5em;
        cursor: pointer;

        &:hover {
            background: $black-even-lighter;
        }
    }
</style>