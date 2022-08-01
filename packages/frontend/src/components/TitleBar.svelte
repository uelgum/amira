<script lang="ts">
    import { appWindow } from "@tauri-apps/api/window";

    // Icons
    import minimizeIcon from "../../assets/svg/minimize.svg";
    import maximizeIcon from "../../assets/svg/maximize.svg";
    import closeIcon from "../../assets/svg/close.svg";

    const minimize = () => {
        appWindow.minimize();
    };

    const toggleMaximize = () => {
        appWindow.toggleMaximize();
    };

    const close = () => {
        appWindow.close();
    };
</script>

<div data-tauri-drag-region class="titlebar">
    <!-- TODO Icon einfügen -->
    
    <div class="titlebar-title">
        <span>Amira</span>
    </div>

    <div class="titlebar-controls">
        <button on:click={minimize}>
            <img src={minimizeIcon} alt="minimize-icon"/>
        </button>
        
        <button on:click={toggleMaximize}>
            <img src={maximizeIcon} alt="maximize-icon"/>
        </button>

        <button class="titlebar-controls-close" on:click={close}>
            <img src={closeIcon} alt="close-icon"/>
        </button>
    </div>
</div>

<style lang="scss">
    @import "../scss/variables";

    .titlebar {
        display: flex;
        background: $BLACKEST;
        color: $WHITE_090;
        justify-content: space-between;
        user-select: none;
    }

    .titlebar-title {
        padding: 0.25em;
        padding-left: 0.5em;
        font-size: 0.75em;
    }

    .titlebar-controls {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .titlebar-controls button {
        display: flex;
        background: $BLACKEST;
        color: $WHITE_090;
        width: 2.5em;
        height: 100%;
        outline: none;
        border: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            width: 0.75em;
        }

        &:hover {
            background: $GRAY;
        }

        &.titlebar-controls-close:hover {
            background: $RED;
        }
    }
</style>