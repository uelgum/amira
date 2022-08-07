<script lang="ts">
    export let id = "";
</script>

<div id={id} class="card">
    <slot/>
</div>

<style lang="scss">
    @import "../scss/variables";
    
    .card {
        display: flex;
        position: relative;
        background: $BLACKER;
        color: $WHITE_090;
        padding: 1.5em;
        border: 1px solid $GRAY;
        border-radius: 0.5em;
        flex-direction: column;
    }
</style>