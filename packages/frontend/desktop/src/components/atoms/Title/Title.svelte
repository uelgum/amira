<span class="title">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .title {
        color: $white;
        font-size: 1.25em;
        user-select: none;
    }
</style>