<script lang="ts" context="module">
    // #region Types
    type Size = "xs" | "sm" | "md" | "lg" | "xl";
    // #endregion
</script>

<script lang="ts">
    import config from "@internal/config";

    /**
        ID des Nutzers.
    */
    export let id: string;

    /**
        Große des Avatars.
    */
    export let size: Size;

    const url = `${config.apiBaseUrl}/avatar/${id}`;
</script>

<img
    src={url}
    class="avatar {size}"
    alt="avatar-{id}"
    draggable="false"
/>

<style lang="scss">
    .avatar {
        display: block;
        border-radius: 0.25em;
        user-select: none;

        &.xs {
            width: 1.25em;
            height: 1.25em;
        }

        &.sm {
            width: 1.75em;
            height: 1.75em;
        }

        &.md {
            width: 5em;
            height: 5em;
        }

        &.lg {
            width: 6.25em;
            height: 6.25em;
        }

        &.xl {
            width: 10em;
            height: 10em;
        }
    }
</style>