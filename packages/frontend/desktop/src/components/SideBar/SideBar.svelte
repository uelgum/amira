<script lang="ts">
    import Seperator from "@amira/shared/components/Seperator";

    // Intern
    import minimized from "@stores/sideBar";

    // Icons
    import homeIcon from "@amira/shared/svg/home.svg";
    import mailIcon from "@amira/shared/svg/mail.svg";
    import settingsIcon from "@amira/shared/svg/settings.svg";

    /**
        Überprüft, ob ein Link aktiv ist.
    */
    const isActive = (path: string) => {
        return (window.location.pathname === path);
    };
</script>

<div class="sidebar" class:sidebar-minimized={$minimized}>
    <!-- Dashboard -->
    <a class="sidebar-item" class:active={isActive("/dashboard")} href="/dashboard">
        <img
            src={homeIcon}
            draggable="false"
            alt="home-icon"
        />
        <span class="sidebar-item-label">Dashboard</span>
        <span class="sidebar-item-tooltip">Dashboard</span>
    </a>

    <Seperator/>

    <!-- Mails -->
    <a class="sidebar-item" class:active={isActive("/mails")} href="/mails">
        <img
            src={mailIcon}
            draggable="false"
            alt="mail-icon"
        />
        <span class="sidebar-item-label">Nachrichten</span>
        <span class="sidebar-item-tooltip">Nachrichten</span>
    </a>

    <Seperator/>

    <!-- Einstellungen -->
    <a class="sidebar-item" class:active={isActive("/settings")} href="/settings">
        <img
            src={settingsIcon}
            draggable="false"
            alt="settings-icon"
        />
        <span class="sidebar-item-label">Einstellungen</span>
        <span class="sidebar-item-tooltip">Einstellungen</span>
    </a>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .sidebar {
        position: relative;
        background: $black-light;
        width: 20%;
        max-width: 10em;
        padding: 0.5em;
        border-right: 1px solid $black-lightest;
        transition: all 0.25s;
    }

    .sidebar-minimized {
        width: 3.5em;

        .sidebar-item-label {
            display: none;
        }

        .sidebar-item:hover > .sidebar-item-tooltip {
            opacity: 1;
        }
    }

    .sidebar-item-tooltip {
        position: absolute;
        background: $black-light;
        left: calc(100% + 1em);
        padding: 0.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.25s;
    }

    .sidebar-item {
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.5em;
        align-items: center;
        gap: 0.5em;
        font-size: 0.85em;
        user-select: none;
        text-decoration: none;
        transition: all 0.25s;

        &:hover {
            background: $black-lighter;
        }

        &:hover:first-of-type {
            background: $blue;
        }

        &.active {
            background: $black-lighter;
        }

        &.active:first-of-type {
            background: $blue;
        }
    }
</style>