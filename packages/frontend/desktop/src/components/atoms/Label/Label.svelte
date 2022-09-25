<script lang="ts">
    /**
        ID des Elements, zu dem das Label gehört.
    */
    let forId: string;
    export { forId as for };
</script>

<label class="label" for={forId}>
    <slot/>    
</label>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .label {
        display: flex;
        color: $white-lighter;
        font-size: 0.85em;
        font-weight: 600;
        flex-direction: column;
        gap: 0.5em;
        user-select: none;
    }
</style>