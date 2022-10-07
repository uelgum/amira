<script lang="ts">
    /**
        Pfad zum Icon.
    */
    export let src: string;
</script>

<img
    class="icon"
    src={src}
    alt="icon"
    draggable="false"
/>

<style lang="scss">
    .icon {
        display: block;
        user-select: none;
    }
</style>