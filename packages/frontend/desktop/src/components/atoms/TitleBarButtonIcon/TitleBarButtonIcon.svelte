<script context="module" lang="ts">
    // #region Types
    export type TopBarIconButtonType = "minimize" | "maximize" | "close";
    // #endregion
</script>

<script lang="ts">
    import minimizeIcon from "@amira/shared/png/minimize.png";
    import maximizeIcon from "@amira/shared/png/maximize.png";
    import closeIcon from "@amira/shared/png/close.png";

    /**
        Typ des Icons. Kann entweder `minimize`, `maxmimize` oder `close` sein.
    */
    export let type: TopBarIconButtonType;

    const icons = {
        minimize: minimizeIcon,
        maximize: maximizeIcon,
        close: closeIcon
    };
</script>

<img
    src={icons[type]}
    class="title-bar-button-icon"
    alt="title-bar-button-icon"
    draggable="false"
/>

<style lang="scss">
    .title-bar-button-icon {
        width: 0.75em;
    }
</style>