<script lang="ts">
    import { navigate } from "svelte-routing";

    // Komponente
    import Link from "@atoms/Link";
    import Button from "@atoms/Button";
    import SmallText from "@atoms/SmallText";
    import Seperator from "@atoms/Seperator";
    import CopyField from "@molecules/CopyField";

    /**
        Recovery-Code.
    */
    export let recoveryCode: string;

    /**
        Wird ausgeführt, sobald der Nutzer die Registrierung abschließt.
    */
    const handleClick = () => {
        navigate("/dashboard");
    };
</script>

<div id="recovery-code-display">
    <!-- Text -->
    <div id="recovery-code-display-text">
        <SmallText>
            Schreibe den Recovery-Code an einem sicheren Ort auf.
        </SmallText>
    </div>

    <!-- Recovery-Code -->
    <CopyField value={recoveryCode}/>
    
    <Seperator/>

    <div id="recovery-code-display-cta">
        <!-- Submit -->
        <Button on:click={handleClick}>Registrierung abschließen</Button>

        <!-- FAQ Link -->
        <div id="recovery-code-display-faq-cta">
            <!-- TODO -->
            <Link to="#">Mehr erfahren</Link>
        </div>
    </div>
</div>

<style lang="scss">
    #recovery-code-display {
        display: flex;
        max-width: 20em;
        flex-direction: column;
        gap: 1.75em;
    }

    #recovery-code-display-text {
        user-select: none;
    }

    #recovery-code-display-cta {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    #recovery-code-display-faq-cta {
        text-align: center;
    }
</style>