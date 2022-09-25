<div class="card">
    <slot/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .card {
        position: relative;
        background: $black-lighter;
        padding: 1.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
    }
</style>