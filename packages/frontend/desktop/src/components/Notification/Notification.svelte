<div class="notification">
    <span>
        <slot/>
    </span>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .notification {
        background: $black-light;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.25em;
        font-size: 0.85em;
        transition: all 0.25s;
        cursor: pointer;

        &:hover {
            background: $black-lighter;
        }
    }
</style>