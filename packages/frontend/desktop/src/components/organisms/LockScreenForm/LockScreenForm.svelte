<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Intern
    import api from "@internal/api";
    import token from "@stores/token";

    // Komponente
    import LabeledInput from "@molecules/LabeledInput";
    import Seperator from "@atoms/Seperator";
    import Button from "@atoms/Button";

    const dispatch = createEventDispatcher();

    const errors = {
        password: ""
    };

    let password = "";

    /**
        Wird ausgeführt, sobald der Nutzer das Passwort abschickt.
    */
    const handleSubmit = async () => {
        if(!password) {
            errors.password = "Gebe dein Passwort an.";
        }
        
        if(errors.password) {
            return;
        }

        const response = await api.post("/auth/login", {
            usernameOrEmail: $token.data.username,
            password
        });

        if(response.status === "err") {
            password = "";
            errors.password = "Das Passwort stimmt nicht.";
            return;
        }

        dispatch("success");
    };
</script>

<div id="lock-screen-form">
    <!-- Passwort -->
    <LabeledInput
        id="password"
        type="password"
        bind:error={errors.password}
        bind:value={password}
    >
        Passwort
    </LabeledInput>

    <Seperator/>

    <Button on:click={handleSubmit}>
        Entsperren
    </Button>
</div>

<style lang="scss">
    #lock-screen-form {
        display: flex;
        flex-direction: column;
        gap: 1.75em;
    }
</style>