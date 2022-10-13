<script lang="ts">
    import SmallText from "@atoms/SmallText";

    /**
        Erstelldatum der Benachrichtigung.
    */
    export let createdAt: number;

    const date = new Date(createdAt);

    const timestamp = date.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit"
    });
</script>

<div class="notification" on:click>
    <slot/>
    <SmallText color="white-lightest">
        {timestamp}
    </SmallText>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .notification {
        display: flex;
        color: $white-light;
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