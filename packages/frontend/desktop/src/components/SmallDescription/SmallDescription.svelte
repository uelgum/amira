<span class="small-description">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .small-description {
        color: $white-light;
        font-size: 0.85em;
        user-select: none;
    }
</style>