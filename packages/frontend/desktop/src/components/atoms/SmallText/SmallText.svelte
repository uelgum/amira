<script context="module" lang="ts">
    // #region Types
    export type Color =
        "white" | "white-light" | "white-lighter" |
        "white-lightest" | "red" | "green";
    // #endregion
</script>

<script lang="ts">
    /**
        Farbe des Textes.
    */
    export let color: Color = "white";
</script>

<span class="small-text {color}">
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .small-text {
        font-size: 0.85em;

        &.white { color: $white; }
        &.white-light { color: $white-light; }
        &.white-lighter { color: $white-lighter; }
        &.white-lightest { color: $white-lightest; }
        &.red { color: $red; }
        &.green { color: $green; }
    }
</style>