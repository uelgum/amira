<script lang="ts">
    import { writeText } from "@tauri-apps/api/clipboard";

    // Icons
    import clipboardIcon from "@amira/shared/svg/clipboard.svg";
    import checkIcon from "@amira/shared/svg/check.svg";

    export let content: string;

    let showCopyButton = false;
    let showCheck = false;

    const displayCopyButton = () => {
        showCopyButton = true;
    };

    const hideCopyButton = () => {
        showCopyButton = false;
    };

    /**
        Kopiert den Inhalt in die Zwischenablage des Nutzers.
    */
    const handleClick = async () => {
        if(showCheck) return;
        
        showCheck = true;
        await writeText(content);

        setTimeout(() => {
            showCheck = false;
        }, 2000);
    };
</script>

<div class="copy-field" on:mouseenter={displayCopyButton} on:mouseleave={hideCopyButton}>
    <span>{content}</span>

    {#if showCopyButton}
        <button class="copy-field-button" on:click={handleClick}>
            {#if showCheck}
                <img src={checkIcon} alt="check-icon"/>
            {:else}
                <img src={clipboardIcon} alt="clipboard-icon"/>
            {/if}
        </button>
    {/if}
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;
    
    .copy-field {
        display: flex;
        position: relative;
        background: $black-lighter;
        height: 3em;
        padding: 1em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
        justify-content: space-between;
        align-items: center;
    }

    .copy-field-button {
        display: flex;
        background: $black;
        width: 2.5em;
        height: 2.5em;
        border: 1px solid $black-lightest;
        border-radius: 0.5em;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img {
            width: 65%;
            height: 65%;
        }
    }
</style>