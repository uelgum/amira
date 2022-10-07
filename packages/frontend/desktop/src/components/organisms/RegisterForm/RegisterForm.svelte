<script context="module" lang="ts">
    // #region Types
    export type Response = {
        userId: string;
        recoveryCode: string;
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
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    };

    let firstName = "";
    let lastName = "";
    let email = "";
    let username = "";
    let password = "";

    /**
        Wird ausgeführt, sobald der Nutzer die Daten abschickt.
    */
    const handleSubmit = async () => {
        if(!firstName) {
            errors.firstName = "Gebe deinen Vornamen an.";
        }

        if(!lastName) {
            errors.lastName = "Gebe deinen Nachnamen an.";
        }

        if(!email) {
            errors.email = "Gebe deine E-Mail an.";
        }

        if(!username) {
            errors.username = "Gebe einen Nutzernamen an.";
        }

        if(!password) {
            errors.password = "Gebe ein Passwort an.";
        }

        // Anzahl der Fehlernachrichten zählen
        const hasErrors = (Object.values(errors).filter(Boolean)).length > 0;

        if(hasErrors) {
            return;
        }

        const response = await api.post<Response>("/auth/register", {
            firstName,
            lastName,
            email,
            username,
            password
        });

        if(response.status === "err") {
            switch(response.err.code) {
                case "USERNAME_TAKEN": {
                    errors.username = "Der Nutzername ist vergeben.";
                    username = "";
                    break;
                }

                case "EMAIL_TAKEN": {
                    errors.email = "Die E-Mail ist vergeben.";
                    email = "";
                    break;
                }
            }
            
            return;
        }

        dispatch("success", {
            ...response.data,
            fullName: `${firstName} ${lastName}`,
            email
        });
    };
</script>

<div id="register-form">
    <div class="register-form-input-group">
        <!-- Vorname -->
        <LabeledInput
            id="firstName"
            bind:error={errors.firstName}
            bind:value={firstName}
        >
            Vorname
        </LabeledInput>

        <!-- Nachname -->
        <LabeledInput
            id="lastName"
            bind:error={errors.lastName}
            bind:value={lastName}
        >
            Nachname
        </LabeledInput>
    </div>

    <!-- E-Mail -->
    <LabeledInput
        id="email"
        bind:error={errors.email}
        bind:value={email}
    >
        E-Mail
    </LabeledInput>

    <div class="register-form-input-group">
        <!-- Nutzername -->
        <LabeledInput
            id="username"
            bind:error={errors.username}
            bind:value={username}
        >
            Nutzername
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
    </div>

    <Seperator/>

    <div id="register-cta-container">
        <!-- Submit -->
        <Button on:click={handleSubmit}>Konto erstellen</Button>

        <!-- Login CTA -->
        <span id="login-cta">
            <Link to="/login">Bereits ein Konto?</Link>
        </span>
    </div>
</div>

<style lang="scss">
    #register-form {
        display: flex;
        flex-direction: column;
        gap: 1.75em;

        .register-form-input-group {
            display: flex;
            gap: 1em;
        }
    }

    #register-cta-container {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    #login-cta {
        text-align: center;
    }
</style>