<script lang="ts">
    import checkIcon from "@amira/shared/svg/checkWhite.svg";
</script>

<div class="badge">
    <img
        src={checkIcon}
        class="badge__icon"
        alt="check-icon"
        draggable="false"
    />
    <span class="badge__tooltip">Admin</span>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .badge {
        position: relative;
        background: $blue;
        width: 1em;
        height: 1em;
        border-radius: 0.15em;
        cursor: pointer;

        &::before {
            content: "";
            position: absolute;
            background: $blue;
            width: 1em;
            height: 1em;
            top: 0px;
            left: 0px;
            border-radius: 0.15em;
            rotate: 45deg;
        }

        &:hover .badge__tooltip {
            opacity: 1;
            visibility: visible;
        }
    }

    .badge__icon {
        position: absolute;
        width: 0.85em;
        height: 0.85em;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        user-select: none;
    }

    .badge__tooltip {
        position: absolute;
        background: $black-lighter;
        top: 50%;
        left: calc(100% + 1em);
        padding: 0.25em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        font-size: 0.75em;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(-50%);
        transition: 0.25s ease;
    }
</style>