<script lang="ts">
    // Icons
    import closeIcon from "../../assets/svg/close.svg";

    export let type: "error" | "warning" | "success";

    let showFadeOut = false;

    const fadeOutModal = () => {
        showFadeOut = true;
    };
</script>

<div class={`modal ${type} ${showFadeOut ? "fade-out" : null}`}>
    <span class="modal-message">
        <slot/>
    </span>

    <img
        class={`modal-close-icon`}
        src={closeIcon}
        alt="close-icon"
        draggable="false"
        on:click
        on:click={fadeOutModal}
    />
</div>

<style lang="scss">
    @import "../scss/variables";

    .modal {
        display: flex;
        position: absolute;
        background: $BLACK;
        max-width: 50vw;
        left: 50%;
        padding: 0.75em;
        border: 1px solid $GRAY;
        border-radius: 0.25em;
        transform: translateX(-50%);
        justify-content: space-between;
        align-items: center;
        gap: 0.75em;
        opacity: 1;
        transition: opacity 0.25s ease-in-out;
        user-select: none;

        &.fade-out {
            opacity: 0;
        }

        &.error {
            background: $RED;
        }

        &.warning {
            background: $YELLOW;
        }

        &.success {
            background: $GREEN;
        }
    }

    .modal-message {
        color: $WHITE_090;
    }

    .modal-close-icon {
        width: 1em;
        height: 1em;
        cursor: pointer;
    }
</style>