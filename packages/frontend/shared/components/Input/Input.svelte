<script lang="ts">
    // #region Types
    type InputType = "text" | "password";
    // #endregion

    export let id: string;
    export let type: InputType = "text";
    export let value = "";

    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        value = input.value;
    };
</script>

<!--
    ⚠️ Viele Browser ignorieren "autocomplete", dies kann jedoch mit einem
    undefinierten String umgangen werden. Auf diese Weise wird Autocomplete
    deaktiviert. 
-->

<input
    id={id}
    class="input"
    type={type}
    value={value}
    spellcheck="false"
    autocomplete="autocomplete-amira"
    on:input={handleInput}
    on:input
/>

<style lang="scss">
    @use "../../scss/colors" as *;

    .input {
        background: $black-lighter;
        color: $white;
        padding: 0.75em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 1px;

        &::-ms-reveal, &::-ms-clear {
            display: none;
        }
    }
</style>