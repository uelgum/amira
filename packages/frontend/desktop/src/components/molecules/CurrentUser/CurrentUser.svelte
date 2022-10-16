<script lang="ts">
    import Avatar from "@atoms/Avatar";
    import SmallText from "@atoms/SmallText";
    import PresenceStatus from "@atoms/PresenceStatus";

    // Intern
    import token from "@stores/token";
    import presenceStatus from "@stores/presenceStatus";
</script>

{#if $token.raw}
    <div id="current-user">    
        <SmallText color="white-light">
            Hallo, {$token.data.firstName}
        </SmallText>
        <div id="current-user__presence-status-container">
            <Avatar id={$token.data.id} size="xs"/>
            <div id="current-user__presence-status">
                <PresenceStatus type={$presenceStatus}/>
            </div>
        </div>
    </div>
{/if}

<style lang="scss">
    #current-user {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5em;
        user-select: none;
    }

    #current-user__presence-status-container {
        position: relative;
    }

    #current-user__presence-status {
        position: absolute;
        right: -0.15em;
        bottom: -0.15em;
    }
</style>