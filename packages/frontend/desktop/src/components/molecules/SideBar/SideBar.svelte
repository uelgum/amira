<script lang="ts">
    import Seperator from "@atoms/Seperator";
    import SideBarLink from "@atoms/SideBarLink";

    // Icons
    import homeIcon from "@amira/shared/svg/home.svg";
</script>

<div id="side-bar">
    <SideBarLink special icon={homeIcon} to="#">
        Dashboard
    </SideBarLink>

    <Seperator/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    #side-bar {
        display: flex;
        background: $black-lighter;
        // width: 20vw;
        width: fit-content;
        max-width: 15em;
        height: 100%;
        padding: 1em;
        border-right: 1px solid $black-lightest;
        flex-direction: column;
        gap: 1em;
    }
</style>