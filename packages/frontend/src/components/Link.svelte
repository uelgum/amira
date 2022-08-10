<script lang="ts">
    export let to;
</script>

<a class="link" href={to}>
    <slot/>
</a>

<style lang="scss">
    @import "../scss/variables";

    .link {
        color: $PURPLE;
        font-weight: 600;
        text-decoration: none;

        &:hover, &:active, &:focus {
            outline: none;
            text-decoration: underline;         
        }
    }
</style>