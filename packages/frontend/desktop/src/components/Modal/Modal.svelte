<script context="module" lang="ts">
    // #region Types
    export type ModalType = "info" | "success" | "warning" | "error";
    // #endregion
</script>

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fade } from "svelte/transition";

    // Icons
    import closeIcon from "@amira/shared/svg/close.svg";

    // Types
    import type { FadeParams } from "svelte/transition";

    export let type: ModalType = "success";

    const dispatch = createEventDispatcher();

    const fadeParams: FadeParams = {
        duration: 550
    };

    const className = `modal modal-${type}`;

    const handleClick = () => {
        dispatch("click");
    };
</script>

<div class={className} in:fade={fadeParams} out:fade={fadeParams}>
    <span>
        <slot/>
    </span>
    <img
        class="close-icon"
        src={closeIcon}
        alt="close-icon"
        draggable="false"
        on:click={handleClick}
    />
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .modal {
        display: flex;
        position: absolute;
        max-width: 25%;
        right: 2em;
        bottom: 2em;
        padding: 1em;
        border: 1px solid;
        border-radius: 0.5em;
        justify-content: space-between;
        align-items: center;
        gap: 0.75em;
        user-select: none;

        .close-icon {
            cursor: pointer;
            user-select: none;
        }

        &.modal-info {
            background: transparentize($blue, 0.5);
            border-color: $blue;
        }

        &.modal-success {
            background: transparentize($green, 0.5);
            border-color: $green;
        }

        &.modal-warning {
            background: transparentize($yellow, 0.5);
            border-color: $yellow;
        }

        &.modal-error {
            background: transparentize($red, 0.5);
            border-color: $red;
        }
    }
</style>