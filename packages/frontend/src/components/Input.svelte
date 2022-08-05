<script lang="ts">
    export let id;
    export let type: "text" | "password" = "text";
    export let placeholder = "";
</script>

<input
    id={id}
    class="input"
    type={type}
    spellcheck="false"
    placeholder={placeholder}
/>

<style lang="scss">
    @import "../scss/variables";
    
    .input {
        background: $BLACK;
        color: $WHITE_090;
        padding: 1em;
        border: 1px solid $GRAY;
        border-radius: 0.5em;
        outline: 0px;
    }
</style>