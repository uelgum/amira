<script lang="ts">
    import TopBar from "@components/TopBar";
    import SideBar from "@components/SideBar";
    import Seperator from "@amira/shared/components/Seperator";
</script>

<TopBar/>
<div class="view">
    <SideBar/>
    <div class="view-content">
        <div class="view-meta">
            <!-- Titel -->
            <div class="view-title">
                <slot name="title"/>
            </div>

            <!-- Untertitel -->
            {#if $$slots.subtitle}
                <div class="view-subtitle">
                    <slot name="subtitle"/>
                </div>
            {/if}
        </div>
        <Seperator/>
        <slot/>
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .view {
        display: flex;
        width: 100%;
        height: 100%;
    }

    .view-meta {
        margin-bottom: 1em;
    }

    .view-title {
        padding-bottom: 0.25em;
        font-size: 1.25em;
        font-weight: 400;
        user-select: none;
    }

    .view-subtitle {
        color: $white-lighter;
        user-select: none;
    }

    .view-content {
        // display: flex;
        width: 100%;
        padding: 2em;
        // flex-direction: column;
        // align-items: flex-start;
    }
</style>