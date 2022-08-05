<script lang="ts">
    export let forId;
</script>

<label for={forId}>
    <slot/>
</label>

<style lang="scss">
    @import "../scss/variables";
    
    label {
        color: $WHITE_070;
    }
</style>