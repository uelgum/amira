<script lang="ts">
    import TitleBar from "@organisms/TitleBar";
</script>

<TitleBar/>
<div id="main">
    <slot/>
</div>

<style lang="scss">
    #main {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden auto;
    }
</style>