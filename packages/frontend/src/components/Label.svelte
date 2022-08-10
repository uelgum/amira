<script lang="ts">
    export let forId;
</script>

<label class="label" for={forId}>
    <slot/>
</label>

<style lang="scss">
    @import "../scss/variables";

    .label {
        display: flex;
        color: $WHITE_070;
        padding-bottom: 0.25em;
        user-select: none;
    }
</style>