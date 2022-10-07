<script lang="ts">
    import Icon from "@atoms/Icon";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    /**
        Ziel des Links.
    */
    export let to: string;

    /**
        Icon.
    */
    export let icon: string;

    const active = (window.location.pathname === to);
    const special = (to === "/dashboard");
</script>

<a class="side-bar-item" class:active={active} class:special={special} href={to}>
    <Icon src={icon}/>
    
    {#if $sideBarExpanded}
        <span class="side-bar-item-label">
            <slot/>
        </span>
    {:else}
        <span class="side-bar-item-floating-label">
            <slot/>
        </span>
    {/if}
</a>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .side-bar-item {
        position: relative;
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.25em;
        align-items: center;
        gap: 0.75em;
        text-decoration: none;
        transition: background 0.15s ease-in-out;

        &:hover {
            background: $black-even-lighter;
        }

        &:hover > .side-bar-item-floating-label {
            opacity: 1;
            visibility: visible;
        }
    }

    .side-bar-item.active {
        background: $black-even-lighter;
    }

    .side-bar-item.special {
        &.active {
            background: $blue;
        }
        
        &:hover {
            background: darken($blue, 5);
        }
    }

    .side-bar-item-floating-label {
        position: absolute;
        content: "";
        background: $black-lighter;
        left: calc(100% + 1.25em);
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        padding: 0.25em;
        opacity: 0;
        user-select: none;
        visibility: hidden;
        transition: 0.25s ease-in-out;
        pointer-events: none;
    }
</style>