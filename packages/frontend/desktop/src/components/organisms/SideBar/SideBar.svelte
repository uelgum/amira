<script lang="ts">
    import Seperator from "@atoms/Seperator";
    import SideBarItem from "@molecules/SideBarItem";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    // Icons
    import homeIcon from "@amira/shared/svg/home.svg";
</script>

<div id="side-bar" class:extended={$sideBarExpanded}>
    <SideBarItem icon={homeIcon} to="/dashboard">
        Dashboard
    </SideBarItem>

    <Seperator/>

    <SideBarItem icon={homeIcon} to="/">
        Test
    </SideBarItem>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #side-bar {
        display: flex;
        background: $black-lighter;
        width: 3.25em;
        height: 100%;
        padding: 0.5em;
        border-right: 1px solid $black-lightest;
        border-bottom-left-radius: 0.5em;
        flex-direction: column;
        gap: 0.5em;
        transition: width 0.25s ease;

        &.extended {
            width: 10em;
        }
    }
</style>