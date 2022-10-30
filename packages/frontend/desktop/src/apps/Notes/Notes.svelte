<script lang="ts" context="module">
    // #region Types
    type Response = {
        content: string;
    };
    // #endregion
</script>

<script lang="ts">
    import { onMount } from "svelte";

    // Komponente
    import SmallText from "@atoms/SmallText";

    // Intern
    import api from "@internal/api";

    // Icons
    import refreshIcon from "@amira/shared/svg/refresh.svg";

    let error: string = "";
    let content: string = "";
    let isSyncing: boolean = false;

    /**
        Verzögert eine Funktion.
    */
    const debounce = (fn: () => Promise<void>) => {
        let timer;

        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, args);
            }, 2000);
        };
    };

    /**
        Synchronisiert den Content.
    */
    const synchronizeContent = async () => {
        if(error) {
            error = "";
        }

        isSyncing = true;

        const res = await api.post("/app/notes", {
            content
        });

        isSyncing = false;

        if(res.status === "err") {
            error = "Synchronisierung fehlgeschlagen.";
        }
    };

    /**
        Wird ausgeführt, sobald der Nutzer einige Sekunden nicht mehr
        getippt hat.
    */
    const handleInput = debounce(() => synchronizeContent());

    /**
        On-Mount.
    */
    onMount(async () => {
        const res = await api.get<Response>("/app/notes");

        if(res.status === "err") {
            error = "Konnte Notizen nicht abrufen.";
            return;
        }

        content = res.data.content;
    });
</script>

<div id="notes">
    <div id="notes__header">
        <SmallText color="white-light">Notizen</SmallText>
        {#if isSyncing}
            <img
                id="notes__sync-icon"
                src={refreshIcon}
                draggable="false"
                alt="sync-icon"
            />
        {/if}
        {#if error}
            <SmallText color="red">{error}</SmallText>
        {/if}
    </div>
    <div id="notes__content">
        <textarea
            id="notes__content-textarea"
            bind:value={content}
            spellcheck="false"
            on:input={handleInput}
        />
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #notes {
        position: relative;
        background: $black-lighter;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
    }

    #notes__header {
        display: flex;
        border-bottom: 1px solid $black-lightest;
        padding: 0.5em;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }

    #notes__sync-icon {
        width: 1em;
        user-select: none;
        animation: rotate 2s linear infinite;
    }

    #notes__content {
        display: flex;
        padding: 0.5em;
    }

    #notes__content-textarea {
        background: $black-even-lighter;
        color: $white-light;
        width: 100%;
        height: 10em;
        padding: 0.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 0.10em;
        outline: none;
        resize: none;
    }

    @keyframes rotate {
        from { rotate: 0deg; }
        to { rotate: 360deg; }
    }
</style>