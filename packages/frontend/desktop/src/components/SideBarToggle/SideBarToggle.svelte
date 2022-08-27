<script lang="ts">
import type sideBar from "@stores/sideBar";


    import sideBar from "@stores/sideBar";

    // Icons
    import menuIcon from "@amira/shared/svg/menu.svg";

    /**
        Schaltet die Side-Bar um.
    */
    const toggleSideBar = () => {
        if($sideBar) {
            $sideBar = false;
        } else {
            $sideBar = true;
        }
    };
</script>

<button class="sidebar-toggle" on:click={toggleSideBar}>
    <img
        src={menuIcon}
        draggable="false"
        alt="menu-icon"
    />
</button>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .sidebar-toggle {
        background: $black-light;
        padding: 0.25em 0.5em 0.25em 0.5em;
        border: none;
        border-radius: 0.5em;
        outline: none;
        cursor: pointer;

        &:hover {
            background: $black-lighter;
        }
    }
</style>