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
        width: 1.25em;
        height: 1.25em;
        user-select: none;
    }
</style>