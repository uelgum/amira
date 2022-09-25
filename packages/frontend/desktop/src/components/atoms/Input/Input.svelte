<script context="module" lang="ts">
    // #region Types
    export type InputType = "text" | "password";
    // #endregion
</script>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    /**
        ID des Inputs.
    */
    export let id: string;

    /**
        Typ des Inputs.
    */
    export let type: InputType = "text";

    /**
        Ob die Eingabe fehlerhaft ist.
    */
    export let invalid: boolean = false;

    /**
        Wert der Eingabe.
    */
    export let value: string = "";

    const dispatch = createEventDispatcher();

    /**
        Wird ausgeführt, sobald der Nutzer etwas eingibt.
    */
    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        value = input.value;
        dispatch("input", value);
    };
</script>

<!--
    ⚠️ Viele Browser ignorieren "autocomplete", dieses Verhalten kann jedoch
    mit einem nicht-standardmäßigen Wert umgangen werden.
-->

<input
    id={id}
    class="input"
    class:invalid={invalid}
    type={type}
    value={value}
    autocomplete="amira"
    spellcheck="false"
    on:input={handleInput}
/>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .input {
        background: $black-even-lighter;
        color: $white-light;
        padding: 0.75em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
        outline: none;
        font-family: "Inter", sans-serif;
        font-size: 1em;
        letter-spacing: 0.1em;

        &.invalid {
            border: 1px solid transparentize($red, 0.25);
        }

        &::-ms-reveal {
            display: none;
        }
    }
</style>