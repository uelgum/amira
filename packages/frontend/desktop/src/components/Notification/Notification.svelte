<div class="notification">
    <span>
        <slot/>
    </span>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .notification {
        background: $black-lighter;
        padding: 0.5em;
        border-radius: 0.25em;
    }
</style>