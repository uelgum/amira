<script lang="ts">
    import Icon from "@atoms/Icon";
    import TopBarItem from "@molecules/TopBarItem";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    // Icons
    import menuIcon from "@amira/shared/svg/menu.svg";

    /**
        Schaltet die Side-Bar um.
    */
    const toggleSideBar = () => {
        $sideBarExpanded = !$sideBarExpanded;
    };
</script>

<div id="top-bar">
    <TopBarItem on:click={toggleSideBar}>
        <Icon src={menuIcon}/>
    </TopBarItem>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #top-bar {
        position: relative;
        display: flex;
        background: $black-lighter;
        padding: 0.25em 0.25em 0.25em 0.5em;
        border-bottom: 1px solid $black-lightest;
        align-items: center;
    }
</style>