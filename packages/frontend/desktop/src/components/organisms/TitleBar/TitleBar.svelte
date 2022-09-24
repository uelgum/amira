<script lang="ts">
    import TitleBarControls from "@molecules/TitleBarControls";
    import TitleBarTitle from "@atoms/TitleBarTitle";
</script>

<div id="title-bar" data-tauri-drag-region>
    <TitleBarTitle/>
    <TitleBarControls/>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    #title-bar {
        display: flex;
        background: $black;
        border-radius: 0.5em 0.5em 0em 0em;
        justify-content: space-between;
        align-items: center;
    }
</style>