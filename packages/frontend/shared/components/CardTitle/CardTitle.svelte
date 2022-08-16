<span class="card-title">
    <slot/>
</span>

<style lang="scss">
    @use "../../scss/colors" as *;

    .card-title {
        display: block;
        color: $white;
        margin-bottom: 1em;
        font-weight: 600;
        user-select: none;
    }
</style>