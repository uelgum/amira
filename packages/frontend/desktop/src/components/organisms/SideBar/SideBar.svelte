<script lang="ts">
    import SideBarItem from "@molecules/SideBarItem";
    import Seperator from "@atoms/Seperator";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    // Icons
    import homeIcon from "@amira/shared/svg/home.svg";
</script>

<div id="side-bar" class:expanded={$sideBarExpanded}>
    <SideBarItem to="/dashboard" icon={homeIcon}>
        Dashboard
    </SideBarItem>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #side-bar {
        display: flex;
        background: $black-lighter;
        width: 3.5em;
        max-width: 15em;
        height: 100%;
        padding: 0.5em;
        border-right: 1px solid $black-lightest;
        border-bottom-left-radius: 0.5em;
        flex-direction: column;
        gap: 0.5em;
        transition: width 0.25s ease-in-out;

        &.expanded {
            width: 175px;
        }
    }
</style>