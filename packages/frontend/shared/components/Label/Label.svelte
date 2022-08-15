<script lang="ts">
    let forId: string;

    export { forId as for };
</script>

<label class="label" for={forId}>
    <slot/>
</label>

<style lang="scss">
    @use "../../scss/colors" as *;
    
    .label {
        color: $white-lighter;
        user-select: none;
    }
</style>