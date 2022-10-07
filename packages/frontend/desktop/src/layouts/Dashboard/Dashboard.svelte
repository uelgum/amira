<script lang="ts">
    import TopBar from "@organisms/TopBar";
    import SideBar from "@organisms/SideBar";
</script>

<div id="dashboard">
    <TopBar/>
    <div id="dashboard-container">
        <SideBar/>
        <div id="dashboard-content">
            <slot/>
        </div>
    </div>
</div>

<style lang="scss">
    #dashboard {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #dashboard-container {
        display: flex;
        height: calc(100% - 49px);  // Magic Number: Minus Höhe der Top-Bar
    }

    #dashboard-content {
        position: relative;
        display: flex;
        width: 100%;
        font-size: 1em;
        overflow: hidden auto;
        padding: 1em;
    }
</style>