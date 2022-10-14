<script lang="ts">
    import { navigate } from "svelte-routing";

    // Komponente
    import Seperator from "@atoms/Seperator";
    import PresenceStatus from "@atoms/PresenceStatus";
    import MenuItem from "@molecules/MenuItem";

    // Intern
    import { logout } from "@internal/app";
    import presenceStatus from "@stores/presenceStatus";

    // Icons
    import userIcon from "@amira/shared/svg/user.svg";
    import settingsIcon from "@amira/shared/svg/settings.svg";
    import logoutIcon from "@amira/shared/svg/logout.svg";
    import arrowLeftIcon from "@amira/shared/svg/arrowLeft.svg";

    // Types
    import type { PresenceStatus as PresenceStatusType } from "@stores/presenceStatus";

    const statusNames = {
        online: "Online",
        away: "Abwesend",
        dnd: "Bitte nicht stören",
        offline: "Offline"
    };

    let showPresenceSelector = false;

    /**
        Schaltet den Presence-Selector um.
    */
    const togglePresenceSelector = () => {
        showPresenceSelector = !showPresenceSelector;
    };

    /**
        Aktualisiert den Presence-Status des Nutzers.
    */
    const setStatus = (status: PresenceStatusType) => {
        $presenceStatus = status;
    };

    /**
        Öffnet die Einstellungen.
    */
    const openSettings = () => {
        navigate("/settings", {
            state: {
                origin: window.location.pathname
            } 
        });
    };
</script>

<div id="user-menu">
    {#if showPresenceSelector}
        <div id="user-menu__presence-overlay" on:click={togglePresenceSelector}>
            <MenuItem icon={arrowLeftIcon}>
                Zurück
            </MenuItem>
        </div>

        <Seperator/>

        <MenuItem on:click={() => setStatus("online")}>
            <div class="user-menu__presence">
                <PresenceStatus type="online"/>
                Online
            </div>
        </MenuItem>

        <MenuItem on:click={() => setStatus("away")}>
            <div class="user-menu__presence">
                <PresenceStatus type="away"/>
                Abwesend
            </div>
        </MenuItem>

        <MenuItem on:click={() => setStatus("dnd")}>
            <div class="user-menu__presence">
                <PresenceStatus type="dnd"/>
                Bitte nicht stören
            </div>
        </MenuItem>

        <MenuItem on:click={() => setStatus("offline")}>
            <div class="user-menu__presence">
                <PresenceStatus type="offline"/>
                Offline
            </div>
        </MenuItem>
    {:else}
        <div id="user-menu__presence-overlay" on:click={togglePresenceSelector}>
            <MenuItem>
                <div id="user-menu__presence-selector">
                    <PresenceStatus type={$presenceStatus}/>
                    {statusNames[$presenceStatus]}
                </div>
            </MenuItem>
        </div>

        <Seperator/>

        <MenuItem icon={userIcon} on:click={() => navigate("/profile")}>
            Profil
        </MenuItem>

        <MenuItem icon={settingsIcon} on:click={openSettings}>
            Einstellungen
        </MenuItem>

        <Seperator/>

        <MenuItem icon={logoutIcon} on:click={logout}>
            Abmelden
        </MenuItem>
    {/if}
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #user-menu {
        position: absolute;
        display: flex;
        background: $black-lighter;
        width: 13em;
        top: calc(100% + 0.5em);
        right: 0px;
        padding: 0.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        flex-direction: column;
        gap: 0.5em;
        z-index: 1;
        user-select: none;
        cursor: default;
    }

    #user-menu__presence-selector, .user-menu__presence {
        display: flex;
        padding-left: 0.35em;
        align-items: center;
        gap: 1em;
        pointer-events: none;
    }
</style>