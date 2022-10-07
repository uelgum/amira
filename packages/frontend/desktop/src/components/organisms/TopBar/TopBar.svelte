<script lang="ts">
    import Icon from "@atoms/Icon";
    import TopBarItem from "@molecules/TopBarItem";

    // Intern
    import sideBarExpanded from "@stores/sideBarExpanded";

    // Icons
    import menuIcon from "@amira/shared/svg/menu.svg";
    import bellIcon from "@amira/shared/svg/bell.svg";
    import downloadIcon from "@amira/shared/svg/downloadGreen.svg";

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

    <div>
        <!-- TODO Konditionell anzeigen -->
        <TopBarItem>
            <Icon src={downloadIcon}/>
        </TopBarItem>

        <TopBarItem>
            <Icon src={bellIcon}/>
        </TopBarItem>

        <!-- TODO Current User hinzufügen -->
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    #top-bar {
        display: flex;
        background: $black-lighter;
        height: 2.75em;
        padding: 0em 0.5em 0em 0.5em;
        border-top: 1px solid $black-lightest;
        border-bottom: 1px solid $black-lightest;
        justify-content: space-between;
        align-items: center;

        div {
            display: flex;
            gap: 0.5em;
        }
    }
</style>