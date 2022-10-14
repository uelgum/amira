<script lang="ts">
    import Icon from "@atoms/Icon";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    /**
        Icon.
    */
    export let icon: string;

    /**
        Ziel des Links.
    */
    export let to: string;

    const isActive = (window.location.pathname === to);
    const isSpecial = (to === "/dashboard");
</script>

<a class="side-bar__item" class:active={isActive} class:special={isSpecial} href={to}>
    <Icon src={icon}/>
    
    {#if $sideBarExpanded}
        <span class="side-bar__item-label">
            <slot/>
        </span>
    {:else}
        <span class="side-bar__item-floating-label">
            <slot/>
        </span>
    {/if}
</a>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .side-bar__item {
        position: relative;
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.25em;
        text-decoration: none;
        transition: background 0.25s ease;
        align-items: center;
        gap: 0.75em;
        cursor: pointer;

        &:hover {
            background: $black-even-lighter;
        }

        &:hover > .side-bar__item-floating-label {
            opacity: 1;
        }
    }

    .side-bar__item.active {
        background: $black-even-lighter;
    } 

    .side-bar__item.special {
        &.active, &:hover {
            background: $blue;
        }
    } 

    .side-bar__item-label {
        font-size: 0.85em;
    }

    .side-bar__item-floating-label {
        position: absolute;
        background: $black-even-lighter;
        top: 50%;
        left: calc(100% + 1.25em);
        padding: 0.25em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        font-size: 0.85em;
        opacity: 0;
        transform: translateY(-50%);
        transition: opacity 0.25s ease;
        z-index: 1;
        pointer-events: none;
    }
</style>