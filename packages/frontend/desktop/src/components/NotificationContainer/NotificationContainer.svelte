<script lang="ts">

</script>

<div class="notification-container">
    Notification Container
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .notification-container {
        position: absolute;
        background: $black-light;
        width: 25vw;
        max-width: 25em;
        max-height: 25em;
        top: 3.5em;
        right: 0em;
        margin-right: auto;
        padding: 1em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
    }
</style>