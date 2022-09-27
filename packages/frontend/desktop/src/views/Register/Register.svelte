<script context="module" lang="ts">
    // #region Types
    type Data = Response & {
        fullName: string;
        email: string;
    };
    // #endregion
</script>

<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { navigate } from "svelte-routing";

    // Intern
    import api from "@internal/api";
    import { generatePrivateKey, writePrivateKey } from "@internal/keys";
    import token from "@stores/token";
    import config from "@internal/config";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Card from "@atoms/Card";
    import CardTitle from "@atoms/CardTitle";
    import RegisterForm from "@organisms/RegisterForm";
    import RecoveryCodeDisplay from "@organisms/RecoveryCodeDisplay";

    // Types
    import type { FlyParams } from "svelte/transition";
    import type { Response } from "@organisms/RegisterForm";

    const flyIn: FlyParams = {
        x: -window.innerWidth,
        duration: 500,
        delay: 500
    };

    const flyOut: FlyParams = {
        x: window.innerWidth,
        duration: 500
    };

    let tab = 1;
    let recoveryCode = "";

    /**
        Wird ausgeführt, sobald die Anmeldung erfolgreich ist.
    */
    const handleSuccess = async (event: CustomEvent<Data>) => {
        const data = event.detail;

        const { privateKey, publicKey } = await generatePrivateKey(
            data.fullName,
            data.email
        );

        await writePrivateKey(privateKey);
        
        try {
            await api.post(`/user/pubkey/${data.userId}`, { publicKey });
        } catch(error) {
            return;
        }

        recoveryCode = data.recoveryCode;
        tab = 2;
    };

    /**
        On-Mount.
    */
    onMount(() => {
        if($token.raw && config.env === "prod") {
            navigate("/dashboard");
        }
    });
</script>

<Center>
    {#if tab === 1}
        <div id="register" in:fly={flyIn} out:fly={flyOut}>
            <Card>
                <CardTitle>Werde ein Teil von Amira.</CardTitle>
                <RegisterForm on:success={handleSuccess}/>
            </Card>
        </div>
    {:else}
        <div id="recovery-code" in:fly={flyIn}>
            <Card>
                <CardTitle>Recovery-Code</CardTitle>
                <RecoveryCodeDisplay recoveryCode={recoveryCode}/>
            </Card>
        </div>
    {/if}
</Center>

<style lang="scss">
    #recovery-code {
        max-width: 25em;
    }
</style>