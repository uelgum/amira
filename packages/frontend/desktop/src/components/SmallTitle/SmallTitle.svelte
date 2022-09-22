<span class="small-title">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .small-title {
        display: block;
        color: $white-lightest;
        font-size: 0.85em;
        font-weight: 600;
        text-transform: uppercase;
        user-select: none;
    }
</style>