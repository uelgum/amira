<script lang="ts">
    import { onMount } from "svelte";

    // Komponente
    import SmallText from "@atoms/SmallText";

    // Assets
    import notifications from "@amira/shared/json/notifications.json";

    // Types
    import type { Notification } from "@stores/notifications";

    /**
        Erstelldatum der Benachrichtigung.
    */
    export let notification: Notification;

    let content: string = notifications[notification.type];

    const date = new Date(notification.createdAt);

    const timestamp = date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    });

    /**
        On-Mount.
    */
    onMount(() => {
        for(const [ variable, value ] of Object.entries(notification.data)) {
            content = content.replace(`{${variable}}`, `${value}`);
        }
    });
</script>

<div class="notification" on:click>
    {content}
    <SmallText color="white-lightest">
        {timestamp}
    </SmallText>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .notification {
        display: flex;
        color: $white-light;
        width: 100%;
        margin-right: 0.5em;
        padding: 0.5em;
        border-radius: 0.25em;
        font-size: 0.85em;
        transition: 0.25s ease;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        pointer-events: all;

        &:hover {
            background: $black-even-lighter;
        }
    }
</style>