<script lang="ts">
    /**
        Ziel des Links.
    */
    export let to: string;
</script>

<a class="link" href={to}>
    <slot/>
</a>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .link {
        color: $blue;
        border-bottom: 1px solid transparent;
        text-decoration: none;

        &:hover {
            border-bottom: 1px solid $blue;
        }

        &::selection {
            color: invert($blue);   
        }
    }
</style>