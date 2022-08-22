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
    type LoginFormValues = {
        usernameOrEmail: string;
        password: string;
    };

    type Response = {
        token: string;
        emailUnverified?: boolean;
    };
    // #endregion

    const dispatch = createEventDispatcher();

    const errors: Partial<LoginFormValues> = {};

    let usernameOrEmail = "";
    let password = "";

    /**
        Versteckt einen angezeigten Fehler.
    */
    const hideError = (name: keyof LoginFormValues) => {
        if(errors[name]) errors[name] = "";
    };

    /**
        Validiert die Eingaben des Nutzers.
    */
    const validate = () => {
        // Nutzername oder E-Mail
        if(!usernameOrEmail) {
            errors.usernameOrEmail = "Gebe Nutzername oder E-Mail an.";
        }

        // Passwort
        if(!password) {
            errors.password = "Gebe ein Passwort an.";
        }

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
            usernameOrEmail,
            password
        };

        const response = await api.post<Response>("/auth/login", data);

        if(response.status === "err") {
            // TODO Fehler anzeigen
            return;
        }

        // Nutzerdaten weitergeben
        dispatch("success", response.data);
    };
</script>

<Form>
    <Row>
        <!-- Nutzername oder E-Mail -->
        <Col>
            <InputGroup>
                <Label for="username-or-email">Nutzername oder E-Mail</Label>
                <Input id="username-or-email"
                    bind:value={usernameOrEmail}
                    on:input={() => hideError("usernameOrEmail")}
                />
                {#if errors.usernameOrEmail}
                    <InputError>{errors.usernameOrEmail}</InputError>
                {/if}
            </InputGroup>
        </Col>
    </Row>

    <Row>
        <!-- Passwort -->
        <Col>
            <InputGroup>
                <Label for="password">Passwort</Label>
                <Input id="password"
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
        <Col>
            <div class="login-cta">
                <Button on:click={handleSubmit}>
                    Anmelden
                </Button>

                <span class="register-cta">
                    Neu bei Amira?
                    <Link to="/register">Konto erstellen</Link>.
                </span>
            </div>
        </Col>
    </Row>
</Form>

<style lang="scss">
    .login-cta {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }

    .register-cta {
        font-size: 0.85em;
        user-select: none;
    }
</style>