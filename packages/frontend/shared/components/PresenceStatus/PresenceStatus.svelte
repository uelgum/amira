<script context="module" lang="ts">
    // #region Types
    export type PresenceStatusType = "online" | "away" | "dnd" | "offline";
    // #endregion
</script>

<script lang="ts">
    export let type: PresenceStatusType;
</script>

<div class="presence-status {type}"></div>

<style lang="scss">
    @use "../../scss/colors" as *;

    .presence-status {
        width: 0.85em;
        height: 0.85em;
        border: 1px solid $black-lighter;
        border-radius: 50%;

        &.online {
            background: $green;
        }

        &.away {
            background: $yellow;
        }

        &.dnd {
            background: $red;
        }

        &.offline {
            background: lighten($black-lightest, 15);
        }
    }
</style>