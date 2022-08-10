<script lang="ts">
    // #region Types
    type InputType = "text" | "password";
    // #endregion

    export let id: string;
    export let type: InputType = "text";
    export let value = "";

    const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        value = target.value;
    };
</script>

<input
    id={id}
    class="input"
    spellcheck="false"
    type={type}
    value={value}
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
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 0.025em;
    }
</style>