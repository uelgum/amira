<script lang="ts">
    import { onMount } from "svelte";
    import { appWindow } from "@tauri-apps/api/window";
    
    // Alle Elemente mit abgerundeten Ecken
    const roundedElements = [
        document.documentElement,
        document.body,
        document.getElementById("root")
    ];

    /**
        Minimiert das Fenster.
    */
    const minimize = () => {
        appWindow.minimize();
    };

    /**
        Schaltet die Maximierung des Fensters um.
    */
    const toggleMaximize = () => {
        appWindow.toggleMaximize();
    };

    /**
        Schließt das Fenster.
    */
    const close = () => {
        appWindow.close();
    };

    onMount(() => {
        appWindow.onResized(async () => {
            const isMaximized = await appWindow.isMaximized();

            // Abgerundete Ecken verstecken, sobald Fenster maximiert wird
            for(const element of roundedElements) {
                element.style.borderRadius = (isMaximized) ? "0em" : "0.5em";
            }
        });
    });
</script>

<div class="titlebar-controls">
    <!-- Minimize -->
    <button class="titlebar-control-button" on:click={minimize}>
        <svg class="titlebar-control-button-icon" x="0px" y="0px" viewBox="0 0 10.2 1">
            <rect fill="rgba(255,255,255,0.8)" width="10.2" height="1"/>
        </svg>
    </button>

    <!-- Maximize -->
    <button class="titlebar-control-button" on:click={toggleMaximize}>
        <svg class="titlebar-control-button-icon" x="0px" y="0px" viewBox="0 0 10.2 10.1">
            <path fill="rgba(255,255,255,0.8)" d="M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z"/>
        </svg>
    </button>

    <!-- Close -->
    <button class="titlebar-control-button close" on:click={close}>
        <svg class="titlebar-control-button-icon" x="0px" y="0px" viewBox="0 0 10.2 10.2">
            <polygon
                fill="rgba(255,255,255,0.8)"
                points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"
            />
        </svg>
    </button>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .titlebar-controls {
        display: flex;
    }

    .titlebar-control-button {
        display: flex;
        background: $black;
        width: 2.5em;
        height: 1.5em;
        border: none;
        outline: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &.close:hover {
            background: $red;
        }

        &:hover {
            background: $black-lighter;
        }
    }

    .titlebar-control-button-icon {
        width: 0.8em;
    }
</style>