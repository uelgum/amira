<script lang="ts">
    import TopBar from "@components/TopBar";
    import SideBar from "@components/SideBar";
    import DashboardContainer from "@components/DashboardContainer";
    import DashboardContent from "@components/DashboardContent";
</script>

<TopBar/>
<DashboardContainer>
    <SideBar/>
    <DashboardContent>
        <slot/>
    </DashboardContent>
</DashboardContainer>