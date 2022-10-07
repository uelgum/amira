<script context="module" lang="ts">
    // #region Types
    export type Response = {
        token: string;
        emailUnverified?: boolean;
    };
    // #endregion
</script>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Intern
    import api from "@internal/api";

    // Komponente
    import LabeledInput from "@molecules/LabeledInput";
    import Seperator from "@atoms/Seperator";
    import Button from "@atoms/Button";
    import Link from "@atoms/Link";

    const dispatch = createEventDispatcher();

    const errors = {
        usernameOrEmail: "",
        password: ""
    };

    let usernameOrEmail = "";
    let password = "";

    /**
        Wird ausgeführt, sobald der Nutzer die Daten abschickt.
    */
    const handleSubmit = async () => {
        if(!usernameOrEmail) {
            errors.usernameOrEmail = "Gebe dieses Feld an.";
        }

        if(!password) {
            errors.password = "Gebe dein Passwort an.";
        }

        // Anzahl der Fehlernachrichten zählen
        const hasErrors = (Object.values(errors).filter(Boolean)).length > 0;

        if(hasErrors) {
            return;
        }

        const response = await api.post<Response>("/auth/login", {
            usernameOrEmail,
            password
        });

        if(response.status === "err") {
            errors.usernameOrEmail = "Ungültige Anmeldedaten.";
            password = "";
            return;
        }

        dispatch("success", response.data);
    };
</script>

<div id="login-form">
    <!-- Nutzername oder E-Mail -->
    <LabeledInput
        id="usernameOrEmail"
        bind:error={errors.usernameOrEmail}
        bind:value={usernameOrEmail}
    >
        Nutzername oder E-Mail
    </LabeledInput>

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

    <div id="login-cta-container">
        <!-- Submit -->
        <Button on:click={handleSubmit}>Anmelden</Button>

        <!-- Register CTA -->
        <span id="register-cta">
            <Link to="/register">Neu bei Amira?</Link>
        </span>
    </div>
</div>

<style lang="scss">
    #login-form {
        display: flex;
        flex-direction: column;
        gap: 1.75em;
    }

    #login-cta-container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    #register-cta {
        text-align: center;
    }
</style>