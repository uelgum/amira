<button class="button" on:click>
    <slot/>
</button>

<style lang="scss">
    @use "../../scss/colors" as *;

    .button {
        background: $blue;
        color: $white;
        width: 100%;
        padding: 0.75em 2em 0.75em 2em;
        border: none;
        border-radius: 0.5em;
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 1px;
        cursor: pointer;
    }
</style>