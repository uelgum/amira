<span class="input-error">
    <slot/>
</span>

<style lang="scss">
    @use "../../scss/colors" as *;
    
    .input-error {
        color: $red;
        max-width: fit-content;
        font-size: 0.85em;
        font-weight: 600;
        user-select: none;
    }
</style>