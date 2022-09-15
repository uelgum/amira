<script lang="ts">
    import NotificationContainer from "@components/NotificationContainer";

    // Icons
    import bellIcon from "@amira/shared/svg/bell.svg";

    let showNotificationContainer = false;

    /**
        Schlaltet den Notification-Container um.
    */
    const toggleNotificationContainer = () => {
        showNotificationContainer = !showNotificationContainer;
    };

    /**
        Schließt den Status-Selektor bei einem Klick außerhalb
        des Selektors.
    */
    const handleOutsideClick = (event: Event) => {
        const target = event.target as HTMLElement;
        const isOutside = !target.className.includes("notification-bell");

        if(showNotificationContainer && isOutside) {
            showNotificationContainer = false;
        }
    };
</script>

<svelte:body on:click={handleOutsideClick}/>

<div class="notification-bell" on:click={toggleNotificationContainer}>
    <img
        src={bellIcon}
        draggable="false"
        alt="bell-icon"
    />
    <!-- TODO Konditionell anzeigen -->
    <div class="notification-dot-container"></div>
</div>

{#if showNotificationContainer}
    <NotificationContainer/>
{/if}

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .notification-bell {
        position: relative;
        padding: 0.5em;
        border-radius: 0.5em;
        transition: all 0.25s;
        cursor: pointer;

        &:hover {
            background: $black-lighter;
        }

        img {
            display: block;
            width: 1.25em;
            height: 1.25em;
            pointer-events: none;
        }
    }

    .notification-dot-container {
        position: absolute;
        background: $red;
        width: 0.5em;
        height: 0.5em;
        right: 0.25em;
        top: 0.25em;
        border-radius: 50%;
        pointer-events: none;
    }
</style>