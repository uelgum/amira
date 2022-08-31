<span class="dashboard-subtitle">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .dashboard-subtitle {
        color: $white-lighter;
        user-select: none;
    }
</style>