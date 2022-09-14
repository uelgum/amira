<script lang="ts">
    import Notification from "@components/Notification";
</script>

<div class="notification-container">
    <Notification>
        Das ist ein Test
    </Notification>
    <Notification>
        Das ist auch ein Test
    </Notification>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .notification-container {
        position: absolute;
        display: flex;
        background: $black-light;
        color: $white-light;
        width: 25vw;
        max-width: 25em;
        max-height: 25em;
        top: 3.5em;
        right: 0em;
        margin-right: auto;
        padding: 1em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        flex-direction: column;
        gap: 0.5em;
        overflow-y: auto;
    }
</style>