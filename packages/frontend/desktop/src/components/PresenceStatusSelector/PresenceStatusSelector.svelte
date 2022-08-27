<script lang="ts">
    import presence from "@stores/presence";

    // Komponente
    import PresenceStatus from "@amira/shared/components/PresenceStatus";

    // Types
    import type { PresenceStatusType } from "@amira/shared/components/PresenceStatus";
    
    /**
        Aktualisiert den Wert im Store.
    */
    const setPresence = (status: PresenceStatusType) => {
        $presence = status;
    };
</script>

<div class="status-selector">
    <span class="description">Wähle deinen Status aus.</span>
    <ul class="status-selector-list" on:click>
        <!-- Online -->
        <li on:click={() => setPresence("online")}>
            <PresenceStatus type="online"/>
            <span>Online</span>
        </li>

        <!-- Weg -->
        <li on:click={() => setPresence("away")}>
            <PresenceStatus type="away"/>
            <span>Abwesend</span>
        </li>
        
        <!-- Bitte nicht stören -->
        <li on:click={() => setPresence("dnd")}>
            <PresenceStatus type="dnd"/>
            <span>Bitte nicht stören</span>
        </li>

        <!-- Offline -->
        <li on:click={() => setPresence("offline")}>
            <PresenceStatus type="offline"/>
            <span>Offline</span>
        </li>
    </ul>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .status-selector {
        position: absolute;
        background: $black-light;
        width: 12em;
        top: 3.5em;
        right: 0.5em;
        padding: 0.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        z-index: 1;

        .description {
            display: block;
            color: $white-lighter;
            padding: 0em 0.5em 0.5em 0.5em;
            font-size: 0.85em;
            user-select: none;
        }
    }

    .status-selector-list li {
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.5em;
        align-items: center;
        gap: 0.75em;
        font-size: 0.85em;
        list-style: none;
        user-select: none;
        transition: all 0.25s;
        cursor: pointer;

        &:hover {
            background: $black-lighter;
        }
    }
</style>