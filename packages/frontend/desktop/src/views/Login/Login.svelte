<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";
    import config from "@internal/config";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Card from "@atoms/Card";
    import SmallTitle from "@atoms/SmallTitle";
    import LoginForm from "@organisms/LoginForm";

    // Types
    import type { FlyParams } from "svelte/transition";
    import type { Response as Data } from "@organisms/LoginForm";

    const flyIn: FlyParams = {
        x: -window.innerWidth,
        duration: 500
    };

    /**
        Wird ausgeführt, sobald die Anmeldung erfolgreich ist.
    */
    const handleSuccess = (event: CustomEvent<Data>) => {
        const data = event.detail;

        token.set(data.token);

        navigate("/dashboard", {
            state: {
                emailUnverified: data.emailUnverified
            }
        });
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
    <div id="login" in:fly={flyIn}>
        <Card>
            <div id="login-title">
                <SmallTitle>Willkommen zurück!</SmallTitle>
            </div>
            <LoginForm on:success={handleSuccess}/>
        </Card>
    </div>
</Center>

<style lang="scss">
    #login-title {
        text-align: center;
        margin-bottom: 2em;
        user-select: none;
    }
</style>