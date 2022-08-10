<script lang="ts">
    import { navigate } from "svelte-routing";

    // Komponente
    import CardText from "@components/CardText.svelte";
    import Button from "@components/Button.svelte";

    export let recoveryCode: string;

    const redirectToLogin = () => {
        navigate("/login", {
            state: {
                action: "REGISTER_COMPLETE",
                success: true
            }
        });
    };
</script>

<CardText>
    Schreibe den Recovery Code an einem sicheren Ort auf.
    Ohne diesen Code kannst du deine Daten nicht wiederherstellen.
</CardText>

<div class="recovery-code-container">
    <span>{recoveryCode}</span>
</div>

<Button on:click={redirectToLogin}>
    Registrierung abschließen
</Button>

<style lang="scss">
    @import "../../../scss/variables";

    .recovery-code-container {
        background: $BLACK;
        margin: 2em 0em 2em 0em;
        padding: 1em;
        border: 1px solid $GRAY;
        border-radius: 0.5em;
    }
</style>