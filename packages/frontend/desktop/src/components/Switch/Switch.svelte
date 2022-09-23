<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let checked: boolean;

    const dispatch = createEventDispatcher();

    /**
        Wird ausgfeührt, sobald sich der Wert der Switch ändert.
    */
    const handleInput = (event: Event) => {
        const input = event.target as HTMLInputElement;
        dispatch("change", { active: input.checked });
    };
</script>

<label class="switch">
    <input
        type="checkbox"
        checked={checked}
        on:input={handleInput}
    />
    <div class="slider"/>
</label>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .switch {
        position: relative;
        display: inline-block;
        width: 3.5em;
        height: 1.65em;

        input {
            width: 0px;
            height: 0px;
            visibility: hidden;
        }
    }

    .slider {
        position: absolute;
        background: $black-lighter;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        transition: 0.4s;
        cursor: pointer;

        &::before {
            content: "";
            position: absolute;
            background: lighten($black-lightest, 5);
            width: 1.15em;
            height: 1.15em;
            top: 50%;
            left: 3px;
            border-radius: 0.25em;
            transition: 0.4s;
            transform: translate(0%, -50%);
        }
    }

    .switch input {
        &:checked + .slider {
            background: $blue;
            border: 1px solid $blue;
        }

        &:checked + .slider::before {
            background: $white;
            left: calc(100% - 3px);
            transform: translate(-100%, -50%);
        }
    }
</style>