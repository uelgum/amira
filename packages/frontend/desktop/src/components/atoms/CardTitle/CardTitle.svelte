<span class="card-title">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .card-title {
        display: block;
        color: $white-light;
        margin-bottom: 2em;
        font-size: 0.85em;
        font-weight: 600;
        text-align: center;
        user-select: none;
    }
</style>