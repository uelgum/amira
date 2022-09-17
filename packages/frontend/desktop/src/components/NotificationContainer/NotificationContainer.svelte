<script lang="ts">
    import Notification from "@components/Notification";
    import Link from "@amira/shared/components/Link";
</script>

<div class="notification-container">
    <span class="description">Benachrichtigungen</span>
    <div class="seperator"/>
    <Notification>
        Das ist ein Test
    </Notification>
    <Notification>
        Das ist auch ein Test
    </Notification>
    <!-- TODO Konditionell anzeigen -->
    <!-- <span class="empty">Du bist auf dem neusten Stand!</span> -->
    <div class="seperator"/>
    <Link to="/notifications">Alle ansehen</Link>
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
        padding: 1em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        flex-direction: column;
        overflow-y: auto;

        .description {
            display: block;
            color: $white-lighter;
            padding: 0em 0em 0.5em 0.5em;
            font-size: 0.85em;
            user-select: none;
        }

        .empty {
            color: $white-light;
            padding: 1.5em 0em 1.5em 0em;
            font-size: 0.85em;
            text-align: center;
        }

        .seperator {
            background: $black-lightest;
            width: 100%;
            height: 1px;
            margin: 0.5em 0em 0.5em 0em;
        }

        & > :global(.link) {
            margin-top: 0.5em;
            font-size: 0.85em;
            text-align: center;
        }
    }
</style>