<button class="button" on:click>
    <slot/>
</button>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .button {
        display: flex;
        background: $blue;
        color: $white-light;
        padding: 0.75em;
        border: 1px solid $blue;
        border-radius: 0.5em;
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 0.1em;
        justify-content: center;
        gap: 0.75em;
        cursor: pointer;
        transition: background 0.1s ease-in;

        &:hover {
            background: darken($blue, 3);
        }
    }
</style>