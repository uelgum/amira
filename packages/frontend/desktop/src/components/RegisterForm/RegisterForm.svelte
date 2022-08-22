<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Intern
    import api from "@internal/api";

    // Komponente
    import Row from "@amira/shared/components/Row";
    import Col from "@amira/shared/components/Col";
    import Form from "@amira/shared/components/Form";
    import Label from "@amira/shared/components/Label";
    import Input from "@amira/shared/components/Input";
    import InputGroup from "@amira/shared/components/InputGroup";
    import InputError from "@amira/shared/components/InputError";
    import Button from "@amira/shared/components/Button";
    import Link from "@amira/shared/components/Link";

    // #region Types
    type RegisterFormValues = {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        password: string;
    };

    type Response = {
        userId: string;
        recoveryKey: string;
    };
    // #endregion

    const dispatch = createEventDispatcher();
    
    const errors: Partial<RegisterFormValues> = {};

    let firstName = "";
    let lastName = "";
    let email = "";
    let username = "";
    let password = "";

    /**
        Versteckt einen angezeigten Fehler.
    */
    const hideError = (name: keyof RegisterFormValues) => {
        if(errors[name]) errors[name] = "";
    };

    /**
        Validiert die Eingaben des Nutzers.
    */
    const validate = () => {
        // Vorname
        if(!firstName) {
            errors.firstName = "Gebe einen Vornamen an.";
        }

        if(firstName.length > 64) {
            firstName = "";
            errors.firstName = "Der Vorname kann nicht länger als 64 Zeichen sein.";
        }

        // Nachname
        if(!lastName) {
            errors.lastName = "Gebe einen Nachnamen an.";
        }

        if(lastName.length > 64) {
            lastName = "";
            errors.lastName = "Der Nachname kann nicht länger als 64 Zeichen sein.";
        }

        // E-Mail
        if(!email) {
            errors.email = "Gebe eine E-Mail an.";
        }

        // TODO E-Mail Regex

        // Nutzername
        if(!username) {
            errors.username = "Gebe einen Nutzernamen an.";
        }

        if(username.length > 16) {
            username = "";
            errors.username = "Der Nutzername kann nicht länger als 16 Zeichen sein.";
        }

        // Passwort
        if(!password) {
            errors.password = "Gebe ein Passwort an.";
        }

        if(password && password.length < 8 || password.length > 32) {
            password = "";
            errors.password = "Das Passwort muss zwischen 8 und 32 Zeichen lang sein.";
        }

        // TODO Passwort Regex

        const isValid = (Object.values(errors).filter(Boolean).length === 0);
        
        return isValid;
    };

    /**
        Wird ausgeführt, sobald der Nutzer das Formular abschickt.
    */
    const handleSubmit = async () => {
        const isValid = validate();

        if(!isValid) return;

        const data = {
            firstName,
            lastName,
            email,
            username,
            password
        };

        const response = await api.post<Response>("/auth/register", data);

        if(response.status === "err") {
            // TODO Fehler anzeigen
            return;
        }

        // Nutzerdaten weitergeben
        dispatch("success", {
            fullName: `${firstName} ${lastName}`,
            email,
            ...response.data
        });
    };
</script>

<Form>
    <Row>
        <!-- Vorname -->
        <Col xs={6} sm={6} md={6} lg={6}>
            <InputGroup>
                <Label for="first-name">Vorname</Label>
                <Input id="first-name"
                    bind:value={firstName}
                    on:input={() => hideError("firstName")}
                />
                {#if errors.firstName}
                    <InputError>{errors.firstName}</InputError>
                {/if}
            </InputGroup>
        </Col>

        <!-- Nachname -->
        <Col xs={6} sm={6} md={6} lg={6}>
            <InputGroup>
                <Label for="last-name">Nachname</Label>
                <Input
                    id="last-name"
                    bind:value={lastName}
                    on:input={() => hideError("lastName")}
                />
                {#if errors.lastName}
                    <InputError>{errors.lastName}</InputError>
                {/if}
            </InputGroup>
        </Col>
    </Row>

    <Row>
        <Col>
            <!-- E-Mail -->
            <InputGroup>
                <Label for="email">E-Mail</Label>
                <Input
                    id="email"
                    bind:value={email}
                    on:input={() => hideError("email")}
                />
                {#if errors.email}
                    <InputError>{errors.email}</InputError>
                {/if}
            </InputGroup>
        </Col>
    </Row>

    <Row>
        <!-- Nutzername -->
        <Col xs={6} sm={6} md={6} lg={6}>
            <InputGroup>
                <Label for="username">Nutzername</Label>
                <Input
                    id="username"
                    bind:value={username}
                    on:input={() => hideError("username")}
                />
                {#if errors.username}
                    <InputError>{errors.username}</InputError>
                {/if}
            </InputGroup>
        </Col>

        <!-- Passwort -->
        <Col xs={6} sm={6} md={6} lg={6}>
            <InputGroup>
                <Label for="password">Passwort</Label>
                <Input
                    id="password"
                    type="password"
                    bind:value={password}
                    on:input={() => hideError("password")}
                />
                {#if errors.password}
                    <InputError>{errors.password}</InputError>
                {/if}
            </InputGroup>
        </Col>
    </Row>

    <Row>
        <!-- Knöpfe -->
        <Col xs={6} sm={6} md={6} lg={6}>
            <div class="register-cta">
                <Button on:click={handleSubmit}>
                    Konto erstellen
                </Button>

                <span class="login-cta">
                    Bereits ein Konto?
                    <Link to="/login">Anmelden</Link>.
                </span>
            </div>
        </Col>
    </Row>
</Form>

<style lang="scss">
    .register-cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }

    .login-cta {
        font-size: 0.85em;
        user-select: none;
    }
</style>