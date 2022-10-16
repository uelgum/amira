<div class="value-field">
    <slot/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .value-field {
        display: flex;
        background: $black-even-lighter;
        color: $white-light;
        padding: 0.75em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        align-items: center;
        word-break: break-all;
    }
</style>