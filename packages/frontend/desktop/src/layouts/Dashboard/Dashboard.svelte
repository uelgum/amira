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
        height: 100%;
    }

    #dashboard-container {
        display: flex;
        height: calc(100% - 2.75em);
    }

    #dashboard-content {
        position: relative;
        padding: 1em;
    }
</style>