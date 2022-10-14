<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Komponente
    import TopBar from "@organisms/TopBar";
    import SideBar from "@organisms/SideBar";

    // Intern
    import token from "@stores/token";

    /**
        On-Mount.
    */
    onMount(() => {
        if(!$token.raw) {
            navigate("/login");
        }
    });
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
        width: 100%;
        padding: 1em;
        overflow: hidden auto;
    }
</style>