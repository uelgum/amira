<script lang="ts">
    import Label from "@atoms/Label";
    import Input from "@atoms/Input";
    import SmallText from "@atoms/SmallText";

    // Types
    import type { InputType } from "@atoms/Input";

    /**
        ID des Inputs.
    */
    export let id: string;

    /**
        Typ des Inputs.
    */
    export let type: InputType = "text";

    /**
        Zu anzeigender Fehler.
    */
    export let error: string = "";

    /**
        Wert der Eingabe.
    */
    export let value: string = "";

    /**
        Versteckt den Fehler bei einer neuen Eingabe.
    */
    const hideError = () => {
        if(error) error = "";
    };
</script>

<div class="labeled-input">
    <Label for={id}>
        <slot/>
    </Label>
    
    <Input
        id={id}
        type={type}
        invalid={!!error}
        bind:value={value}
        on:input={hideError}
    />
        
    {#if error}
        <SmallText color="red">{error}</SmallText>
    {/if}
</div>

<style lang="scss">
    .labeled-input {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        user-select: none;
    }
</style>