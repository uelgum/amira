<script lang="ts">
    import Icon from "@atoms/Icon";

    /**
        Optionales Icon.
    */
    export let icon: string = "";
</script>

<span class="menu-item" on:click>
    {#if icon}
        <Icon src={icon}/>
    {/if}
    <slot/>
</span>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .menu-item {
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.25em;
        font-size: 0.85em;
        text-decoration: none;
        transition: background 0.25s ease;
        align-items: center;
        gap: 0.75em;
        cursor: pointer;

        &:hover {
            background: $black-even-lighter;
        }
    }
</style>