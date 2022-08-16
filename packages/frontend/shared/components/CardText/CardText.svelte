<p class="card-text">
    <slot/>
</p>

<style lang="scss">
    @use "../../scss/colors" as *;

    .card-text {
        color: $white-light;
        user-select: none;
    }
</style>