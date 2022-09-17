<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";
    import { loadPrivateKey } from "@internal/keys";
    import config from "@internal/config";

    // Komponente
    import Tab from "@amira/shared/components/Tab";
    import Center from "@amira/shared/components/Center";
    import Card from "@amira/shared/components/Card"
    import CardTitle from "@amira/shared/components/CardTitle";
    import LoginForm from "@components/LoginForm";
    import Modal from "@components/Modal";

    // #region Types
    type LoginResponse = {
        token: string;
        emailUnverified?: boolean;
    };
    // #endregion

    let showModal = false;

    /**
        Versteckt das Modal.
    */
    const hideModal = () => {
        showModal = false;
    };

    /**
        Wird ausgeführt, sobald die Anmeldedaten erfolgreich übermittelt wurden.
    */
    const handleSuccess = async (event: CustomEvent<LoginResponse>) => {
        const data = event.detail;

        token.set(data.token);

        await loadPrivateKey();

        navigate("/dashboard", {
            state: {
                action: "LOGIN_COMPLETE",
                success: true,
                data: {
                    emailUnverified: data.emailUnverified
                }
            }
        });
    };

    onMount(() => {
        if($token && config.env === "production") {
            navigate("/dashboard");
            return;
        }
        
        const state = window.history.state;

        if(state && state.success && state.action === "REGISTRATION_COMPLETE") {
            showModal = true;
        }
    });
</script>

{#if showModal}
    <Modal type="success" on:click={hideModal}>Konto erfolgreich erstellt.</Modal>
{/if}

<Tab>
    <Center>
        <Card>
            <CardTitle>Willkommen zurück!</CardTitle>
            <LoginForm on:success={handleSuccess}/>
        </Card>
    </Center>
</Tab>