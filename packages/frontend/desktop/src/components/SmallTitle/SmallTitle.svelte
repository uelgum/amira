<span class="small-title">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .small-title {
        color: $white-lightest;
        margin-bottom: 0.85em;
        font-weight: 600;
        text-transform: uppercase;
    }
</style>