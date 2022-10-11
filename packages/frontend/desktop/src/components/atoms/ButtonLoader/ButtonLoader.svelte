<script lang="ts" context="module">
    // #region Types
    type Color = "blue" | "red" | "yellow" | "green";
    // #endregion
</script>

<script lang="ts">
    /**
        Farbe des Loaders.
    */
    export let color: Color = "blue";
</script>

<div class="button-loader {color}"/>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .button-loader {
        width: 1.25em;
        height: 1.25em;
        border: 0.15em solid $black-lightest;
        border-radius: 50%;
        animation: loader-spin 2s linear infinite;

        &.blue { border-top: 0.15em solid $blue; }
        &.red { border-top: 0.15em solid $red; }
        &.yellow { border-top: 0.15em solid $yellow; }
        &.green { border-top: 0.15em solid $green; }
    }

    @keyframes loader-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>