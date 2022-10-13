<script lang="ts" context="module">
    // #region Types
    type Status = "online" | "away" | "dnd" | "offline";
    // #endregion
</script>

<script lang="ts">
    /**
        Typ des Presence-Status.
    */
    export let type: Status;
</script>

<div class="presence-status {type}"/>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .presence-status {
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        transition: background 0.25s ease;

        &.online { background: $green; }
        &.away { background: $yellow; }
        &.dnd { background: $red; }
        &.offline { background: lighten($black-lightest, 15); }
    }
</style>