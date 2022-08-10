<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import * as api from "@utils/api";
    import { generateKeyPair } from "@utils/keys";
    import { EMAIL_REGEX, PASSWORD_REGEX } from "@utils/constants";
    import envStore from "@stores/env";
    import messages from "../../../assets/json/messages.json";

    // Komponente
    import Center from "@components/Center.svelte";
    import Tab from "@components/Tab.svelte";
    import Modal from "@components/Modal.svelte";
    import Card from "@components/Card.svelte";
    import CardTitle from "@components/CardTitle.svelte";
    import RegisterForm from "./components/RegisterForm.svelte";
    import RecoveryCodePrompt from "./components/RecoveryCodePrompt.svelte";
import { UserAttentionType } from "@tauri-apps/api/window";

    // #region Types
    type SubmitData = {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
    };
    // #endregion

    let isTauri: boolean;

    let activeTab = 1;

    let showModal = false;
    let modalMessage = "";

    let recoveryCode = "";

    const handleSubmit = async (event: CustomEvent<SubmitData>) => {
        const data = event.detail;
        
        const isFormComplete = Object.values(data).every((value) => !!value);

        if(!isFormComplete) {
            modalMessage = "Fülle alle Felder aus.";
            showModal = true;
            return;
        }

        if(data.firstName.length > 64 || data.lastName.length > 64) {
            modalMessage = messages["BAD_FIRST_OR_LAST_NAME"];
            showModal = true;
            return;
        }

        if(data.username.length > 16) {
            modalMessage = messages["BAD_USERNAME"];
            showModal = true;
            return;
        }

        if(!EMAIL_REGEX.test(data.email)) {
            modalMessage = messages["BAD_EMAIL"];
            showModal = true;
            return;
        }

        if(!PASSWORD_REGEX.test(data.password)) {
            modalMessage = messages["BAD_PASSWORD"];
            showModal = true;
            return;
        }

        const response = await api.post("/auth/register", data);

        if(response.status === "err") {
            modalMessage = messages[response.err.code];
            showModal = true;
            return;
        }

        const publicKey = await generateKeyPair({
            fullName: `${data.firstName} ${data.lastName}`,
            password: data.password
        });

        const userId = response.data.id;

        await api.post(`/user/pubkey/${userId}`, {
            publicKey
        });

        recoveryCode = response.data.recoveryCode;

        // Tab für Recovery Code anzeigen
        activeTab = 2;
    };

    const closeModal = () => {
        showModal = false;
    };

    onMount(() => {
        envStore.subscribe((env) => {
            isTauri = (env === "tauri");
        });

        if(!isTauri) {
            navigate("/login", {
                state: {
                    action: "REGISTER_MOUNT",
                    success: false
                }
            });
        }
    });
</script>

{#if showModal}
    <Modal type="error" on:click={closeModal}>
        {modalMessage}
    </Modal>
{/if}

{#if activeTab === 1}
    <Tab>
        <Center>
            <Card id="register-card">
                <CardTitle>Werde ein Teil von Amira.</CardTitle>
                <RegisterForm on:submit={handleSubmit}/>
            </Card>
        </Center>
    </Tab>
{:else if activeTab === 2}
    <Tab>
        <Center>
            <Card id="recovery-code-card">
                <CardTitle>Recovery Code</CardTitle>
                <RecoveryCodePrompt recoveryCode={recoveryCode}/>
            </Card>
        </Center>
    </Tab>
{/if}

<style lang="scss">
    :global(#register-card, #recovery-code-card) {
        padding: 3em;
    }

    :global(#register-card) {
        width: 60%;
        max-width: 45em;
    }

    :global(#recovery-code-card) {
        width: 45%;
        max-width: 35em;
    }
</style>