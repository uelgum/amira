<div id="notification-container">
    <slot/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #notification-container {
        display: flex;
        max-height: 12em;
        flex-direction: column;
        gap: 0.5em;
        overflow: hidden auto;
    }
</style>