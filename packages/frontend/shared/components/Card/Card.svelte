<script lang="ts">
    export let maxWidth = "40em";
</script>

<div class="card" style="--max-width: {maxWidth}">
    <slot/>
</div>

<style lang="scss">
    @use "../../scss/colors" as *;

    .card {
        background: $black-light;
        max-width: var(--max-width);
        padding: 2em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
    }
</style>