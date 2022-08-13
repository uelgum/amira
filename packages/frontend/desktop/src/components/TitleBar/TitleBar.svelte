<script lang="ts">
    import TitleBarName from "./TitleBarName.svelte";
    import TitleBarControls from "./TitleBarControls.svelte";
</script>

<div class="titlebar" data-tauri-drag-region>
    <TitleBarName/>
    <TitleBarControls/>
</div>

<style lang="scss">
    .titlebar {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }
</style>