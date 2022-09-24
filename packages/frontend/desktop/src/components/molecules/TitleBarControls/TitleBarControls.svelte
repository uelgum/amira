<script lang="ts">
    import { onMount } from "svelte";
    import { appWindow } from "@tauri-apps/api/window";

    // Komponente
    import TitleBarButton from "@atoms/TitleBarButton";
    import TitleBarButtonIcon from "@atoms/TitleBarButtonIcon";

    /**
        Minimiert das Fenster.
    */
    const minimize = () => {
        appWindow.minimize();
    };

    /**
        Schaltet den maxmimierten Fenstermodus um.
    */
    const toggleMaximize = async () => {
        await appWindow.toggleMaximize();
    };

    /**
        Schließt das Fenster.
    */
    const close = () => {
        appWindow.close();
    };

    /**
        On-Mount.
    */
    onMount(async () => {
        // Gerundete Ecken im maximierten Fenstermodus verstecken
        const unlisten = await appWindow.onResized(async () => {
            const root = document.getElementById("root");
            const isMaximized = await appWindow.isMaximized();

            root.style.borderRadius = (isMaximized) ? "0em" : "0.5em";
        });

        return unlisten;
    });
</script>

<div id="title-bar-controls">
    <!-- Minimize -->
    <TitleBarButton on:click={minimize}>
        <TitleBarButtonIcon type="minimize"/>
    </TitleBarButton>
    
    <!-- Maximize -->
    <TitleBarButton on:click={toggleMaximize}>
        <TitleBarButtonIcon type="maximize"/>
    </TitleBarButton>
    
    <!-- Close -->
    <TitleBarButton close on:click={close}>
        <TitleBarButtonIcon type="close"/>
    </TitleBarButton>
</div>

<style lang="scss">
    #title-bar-controls {
        display: flex;
    }
</style>