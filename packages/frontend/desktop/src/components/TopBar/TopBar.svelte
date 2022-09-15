<script lang="ts">
    import CurrentUser from "@components/CurrentUser";
    import NotificationBell from "@components/NotificationBell";
    import SideBarToggle from "@components/SideBarToggle";
</script>

<div class="topbar">
    <SideBarToggle/>
    <div>
        <div>
            <NotificationBell/>
        </div>
        <div>
            <CurrentUser/>
        </div>
    </div>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .topbar {
        display: flex;
        position: relative;
        background: $black-light;
        width: 100%;
        height: 3em;
        padding: 0em 0.5em 0em 0.5em;
        border: 1px solid $black-lightest;
        border-left: none;
        border-right: none;
        justify-content: space-between;
        align-items: center;
        user-select: none;

        & > div {
            display: flex;
            align-items: center;
            gap: 0.5em;

            & > div {
                position: relative;
            }
        }
    }
</style>