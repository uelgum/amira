<script lang="ts">
    export let forId;
</script>

<label for={forId}>
    <slot/>
</label>

<style lang="scss">
    @import "../scss/variables";
    
    label {
        display: flex;
        color: $WHITE_070;
        margin: 1.5em 0em 0.25em 0em;
    }
</style>