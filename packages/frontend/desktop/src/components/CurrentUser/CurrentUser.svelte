<script lang="ts">
    import token from "@stores/token";

    // Komponente
    import Avatar from "@components/Avatar";
    import PresenceStatusSelector from "@components/PresenceStatusSelector";

    let showStatusSelector = false;

    /**
        Schlaltet den Status-Selektor um.
    */
    const toggleStatusSelector = () => {
        showStatusSelector = !showStatusSelector;
    };

    /**
        Schließt den Status-Selektor bei einem Klick außerhalb
        des Selektors.
    */
    const handleOutsideClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const isOutside = !target.className.includes("current-user");

        if(showStatusSelector && isOutside) {
            showStatusSelector = false;
        }
    };
</script>

<svelte:body on:click={handleOutsideClick}/>

<div class="current-user" on:click={toggleStatusSelector}>
    <span class="username">{$token.decoded.firstName}</span>
    <Avatar/>
</div>

{#if showStatusSelector}
    <PresenceStatusSelector on:click={toggleStatusSelector}/>
{/if}

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .current-user {
        display: flex;
        position: relative;
        padding: 0.15em 0.15em 0.15em 0.5em;
        border-radius: 0.25em;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
        transition: all 0.25s;
        cursor: pointer;

        .username {
            color: $white-lighter;
            font-size: 0.85em;
            user-select: none;
            pointer-events: none;
        }

        &:hover {
            background: $black-lighter;
        }
    }
</style>