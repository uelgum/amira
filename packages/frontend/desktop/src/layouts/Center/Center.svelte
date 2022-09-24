<div class="center">
    <slot/>
</div>

<style lang="scss">
    .center {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1em;
    }
</style>