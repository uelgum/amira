<script lang="ts">
    import Dot from "@atoms/Dot";
    import Icon from "@atoms/Icon";
    import VerticalSeperator from "@atoms/VerticalSeperator";
    import TopBarItem from "@molecules/TopBarItem";
    import CurrentUser from "@molecules/CurrentUser";
    import NotificationMenu from "@organisms/NotificationMenu";
    import UserMenu from "@organisms/UserMenu";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";
    import notifications from "@stores/notifications";

    // Icons
    import menuIcon from "@amira/shared/svg/menu.svg";
    import bellIcon from "@amira/shared/svg/bell.svg";
    import downloadIcon from "@amira/shared/svg/downloadGreen.svg";

    let menu = "";

    /**
        Überprüft, ob das Target ein Notification-Element ist.
    */
    const isNotificationItem = (target: HTMLElement) => {
        if(target.className.startsWith("top-bar__item")) return false;
        
        // Das gesamte Benachrichtigungs-Menü ignorieren
        const shouldIgnore =
            target.id.startsWith("notification") ||
            target.className.startsWith("notification");

        return shouldIgnore;
    };

    /**
        Überprüft, ob das Target ein Presence-Element ist.
    */
    const isPresenceItem = (target: HTMLElement) => {
        const child = target.children[0];

        if(!child) return false;

        // Den aktuellen Presence-Selektor und den Zurück-Knopf ignorieren
        const shouldIgnore =
            (child.id === "user-menu__presence-selector") ||
            child.className.startsWith("icon") && child.getAttribute("src") !== bellIcon;

        return shouldIgnore;
    };

    /**
        Schaltet die Side-Bar um.
    */
    const toggleSideBar = () => {
        $sideBarExpanded = !$sideBarExpanded;
    };

    /**
        Schaltet ein Menü um.
    */
    const toggleMenu = (event: Event, newMenu: string) => {
        const target = event.target as HTMLElement;

        // Notification-Elemente ignorieren
        if(isNotificationItem(target)) return;

        // Presence-Selector ignorieren
        if(isPresenceItem(target)) return;

        // User-Menü ignorieren
        if(target.id.startsWith("user-menu")) return;

        menu = (menu === newMenu) ? "" : newMenu;
    };

    /**
        Wird ausgeführt, sobald der Nutzer außerhalb des offenen Menüs klickt.
    */
    const handleOutsideClick = (event: Event) => {
        const target = event.target as HTMLElement;

        // Top-Bar-Elemente ignorieren
        const topBarButtons = document.querySelector("#top-bar__buttons");
        const isTopBarButton = topBarButtons.contains(target);

        if(isTopBarButton) return;

        // Notification-Elemente ignorieren
        if(isNotificationItem(target)) return;

        // Presence-Elemente ignorieren
        if(isPresenceItem(target)) return;

        // Offenes Menü verstecken
        menu = "";
    };
</script>

<svelte:body on:click={handleOutsideClick}/>

<div id="top-bar">
    <!-- Switch für Side-Bar -->
    <TopBarItem on:click={toggleSideBar}>
        <Icon src={menuIcon}/>
    </TopBarItem>

    <!-- Knöpfe und Menüs -->
    <div id="top-bar__buttons">
        <TopBarItem on:click={(event) => toggleMenu(event, "notification")}>
            {#if $notifications.length > 0}
                <Dot/>
            {/if}
            
            <Icon src={bellIcon}/>

            {#if menu === "notification"}
                <NotificationMenu/>
            {/if}
        </TopBarItem>

        <VerticalSeperator/>

        <TopBarItem on:click={(event) => toggleMenu(event, "user")}>
            <CurrentUser/>

            {#if menu === "user"}
                <UserMenu/>
            {/if}
        </TopBarItem>
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #top-bar {
        display: flex;
        background: $black-lighter;
        height: 2.75em;
        padding: 0em 0.5em 0em 0.5em;
        border-top: 1px solid $black-lightest;
        border-bottom: 1px solid $black-lightest;
        justify-content: space-between;
        align-items: center;
    }

    #top-bar__buttons {
        display: flex;
        align-items: center;
        gap: 0.5em;
    }
</style>