<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";
    import api from "@internal/api";
    import config from "@internal/config";
    import { generateKeyPair } from "@internal/keys";

    // Komponente
    import Tab from "@amira/shared/components/Tab";
    import Center from "@amira/shared/components/Center";
    import Card from "@amira/shared/components/Card"
    import CardContent from "@amira/shared/components/CardContent";
    import CardTitle from "@amira/shared/components/CardTitle";
    import CardText from "@amira/shared/components/CardText";
    import CopyField from "@components/CopyField";
    import Button from "@amira/shared/components/Button";
    import RegisterForm from "@components/RegisterForm";

    // #region Types
    type RegisterResponse = {
        userId: string;
        fullName: string;
        email: string;
        recoveryCode: string;
    };
    // #endregion

    let activeTab = 1;

    let userId = "";
    let recoveryCode = "";

    /**
        Wird ausgeführt, sobald die Registrierungsdaten erfolgreich übermittelt wurden.
    */
    const handleSuccess = async (event: CustomEvent<RegisterResponse>) => {
        const data = event.detail;

        userId = data.userId;
        recoveryCode = data.recoveryCode;

        const publicKey = await generateKeyPair(data.fullName, data.email);

        await api.post(`/user/pubkey/${userId}`, {
            publicKey
        });

        activeTab = 2;
    };

    /**
        Wird ausgeführt, sobald die Registrierung abgeschlossen wird.
    */
    const handleClick = () => {
        navigate("/login", {
            state: {
                action: "REGISTRATION_COMPLETE",
                success: true
            }
        });
    };

    onMount(() => {
        if($token && config.env === "production") {
            navigate("/dashboard");
            return;
        }
    });
</script>


{#if activeTab === 1}
    <Tab>
        <Center>
            <Card>
                <CardTitle>Werde ein Teil von Amira.</CardTitle>
                <RegisterForm on:success={handleSuccess}/>
            </Card>
        </Center>
    </Tab>
{:else}
    <Tab>
        <Center>
            <Card maxWidth="25em">
                <CardContent>
                    <CardTitle>Werde ein Teil von Amira.</CardTitle>
                    <CardText>
                        Schreibe den Recovery Code an einem sicheren Ort auf.
                        Ohne ihn wirst du deine Daten nicht wiederherstellen können.
                    </CardText>
                    <CopyField content={recoveryCode}/>
                    <Button on:click={handleClick}>
                        Registrierung abschließen
                    </Button>
                </CardContent>
            </Card>
        </Center>
    </Tab>
{/if}