<script lang="ts" context="module">
    // #region Types
    type Response = {
        notifications: [];
    };
    // #endregion
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import api from "@internal/api";
    import notifications from "@stores/notifications";

    // Komponente
    import Seperator from "@atoms/Seperator";
    import Notification from "@atoms/Notification";
    import NotificationContainer from "@molecules/NotificationContainer";
    import SmallTitle from "@atoms/SmallTitle";
    import SmallText from "@atoms/SmallText";

    /**
        Wird ausgeführt, sobald der Nutzer auf die Benachrichtigung klickt.
    */
    const handleClick = (link?: string) => {
        if(link) {
            navigate(link);
        }
    };

    /**
        On-Mount.
    */
    onMount(async () => {
        if($notifications.length > 0) return;
        
        const res = await api.get<Response>("/notifications");

        if(res.status === "err") {
            // TODO Etwas machen
            return;
        }

        notifications.set(res.data.notifications);
    });
</script>

<div id="notification-menu">
    <div id="notification-menu__status">
        <SmallTitle>Benachrichtigungen</SmallTitle>
        <SmallText color="white-lightest">{$notifications.length}</SmallText>
    </div>
    
    <Seperator/>
    
    <NotificationContainer>
        {#if $notifications.length > 0}
            {#each $notifications as n}
                <Notification
                    notification={n}
                    on:click={() => handleClick(n.link)}
                />
            {/each}
        {:else}
            <div id="notification-menu__up-to-date">
                <SmallText color="white-lighter">Alles auf dem neusten Stand!</SmallText>
            </div>
        {/if}
    </NotificationContainer>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #notification-menu {
        position: absolute;
        display: flex;
        background: $black-lighter;
        width: 25em;
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

    #notification-menu__status {
        display: flex;
        padding: 0.25em;
        justify-content: space-between;
        align-items: center;
        pointer-events: none;
    }

    #notification-menu__up-to-date {
        padding: 0.25em;
        pointer-events: none;
    }
</style>