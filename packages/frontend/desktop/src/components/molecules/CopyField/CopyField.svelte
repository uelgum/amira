<script lang="ts">
    import { writeText } from "@tauri-apps/api/clipboard";

    // Komponente
    import ValueField from "@atoms/ValueField";

    // Icons
    import clipboardIcon from "@amira/shared/svg/clipboard.svg";
    import checkGreenIcon from "@amira/shared/svg/checkGreen.svg";

    /**
        Zu kopierender Wert.
    */
    export let value: string;

    let copied = false;
    $: icon = (copied) ? checkGreenIcon : clipboardIcon;

    /**
        Kopiert den Wert in die Zwischenablage.
    */
    const copyValue = async () => {
        if(copied) {
            return;
        }

        copied = true;
        
        await writeText(value);

        setTimeout(() => {
            copied = false;
        }, 2500);
    };
</script>

<div class="copy-field">
    <ValueField>
        {value}
        <button class="copy-field-button" on:click={copyValue}>
            <img
                src={icon}
                alt="copy-field-icon"
            />
        </button>
    </ValueField>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .copy-field-button {
        display: flex;
        background: $black-light;
        color: $white-light;
        width: 2.5em;
        height: 2.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.25em;
        outline: none;
        user-select: none;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            width: 1.5em;
        }
    }
</style>