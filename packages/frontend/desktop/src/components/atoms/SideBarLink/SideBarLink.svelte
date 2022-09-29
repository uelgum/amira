<script lang="ts">
    import sideBarMinimized from "@stores/sideBarMinimized";

    /**
        Ziel des Links.
    */
    export let to: string;

    /**
        Icon.
    */
    export let icon: string;

    /**
        Ob der Link besonders ist. Besondere Links werden blau dargestellt.
    */
    export let special: boolean = false;

    const active = (window.location.pathname === to);
</script>

<a
    class="side-bar-link"
    class:special={special}
    class:active={active}
    href={to}
>
    <img src={icon} alt="icon" draggable="false"/>

    {#if !$sideBarMinimized}
        <!-- Normales Label neben dem Icon -->
        <span class="side-bar-link-label">
            <slot/>
        </span>
    {:else}
        <!-- Schwebendes Label im minimierten Modus -->
        <span class="side-bar-link-label-detached">
            <slot/>
        </span>
    {/if}
</a>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .side-bar-link {
        position: relative;
        display: flex;
        color: $white-light;
        padding: 0.5em;
        border-radius: 0.25em;
        text-decoration: none;
        align-items: center;
        gap: 0.75em;
        transition: background-color 0.25s ease;

        &:hover {
            background: $black-even-lighter;  
        }

        &:hover > .side-bar-link-label-detached {
            opacity: 1;
            visibility: visible;
        }
    }

    // Aktive Links
    .side-bar-link.active {
        background: $black-even-lighter;
    }

    // Besondere Links
    .side-bar-link.special {
        background: $blue;

        &.active {
            background: $blue;
        }

        &:hover {
            background: darken($blue, 5);
        }
    }

    .side-bar-link-label {
        padding-right: 1.25em;
    }

    .side-bar-link-label-detached {
        position: absolute;
        background: $black-lighter;
        top: 50%;
        left: calc(100% + 2em);
        padding: 0.25em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-50%);
        transition: opacity 0.25s ease;
    }
</style>