<h1 class="dashboard-title">
    <slot/>
</h1>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .dashboard-title {
        padding-bottom: 0.25em;
        font-size: 1.25em;
        font-weight: 400;
        user-select: none;
    }
</style>