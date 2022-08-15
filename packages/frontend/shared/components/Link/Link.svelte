<script lang="ts">
    export let to: string;
</script>

<a class="link" href={to}>
    <slot/>
</a>

<style lang="scss">
    @use "../../scss/colors" as *;

    .link {
        color: $blue;
        font-weight: 600;
        outline: none;
        text-decoration: none;

        &:active, &:focus, &:hover {
            text-decoration: underline;
        }
    }
</style>