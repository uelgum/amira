<div class="loader"/>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .loader {
        width: 2.5em;
        height: 2.5em;
        border: 0.25em solid $black-lightest;
        border-top: 0.25em solid $blue;
        border-radius: 50%;
        animation: loader-spin 2s linear infinite;
    }

    @keyframes loader-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>