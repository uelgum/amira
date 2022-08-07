<script lang="ts">
    export let id;
    export let type: "text" | "password" = "text";
    export let placeholder = "";
    export let value = "";

    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        value = input.value;
    };
</script>

<input
    id={id}
    class="input"
    type={type}
    value={value}
    placeholder={placeholder}
    spellcheck="false"
    on:input={handleInput}
/>

<style lang="scss">
    @import "../scss/variables";
    
    .input {
        background: $BLACK;
        color: $WHITE_090;
        width: 100%;
        padding: 1em;
        border: 1px solid $GRAY;
        border-radius: 0.5em;
        outline: 0px;
    }
</style>