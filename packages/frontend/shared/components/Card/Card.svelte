<div class="card">
    <slot/>
</div>

<style lang="scss">
    @use "../../scss/colors" as *;

    .card {
        background: $black-light;
        max-width: 40em;
        padding: 2em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
    }
</style>