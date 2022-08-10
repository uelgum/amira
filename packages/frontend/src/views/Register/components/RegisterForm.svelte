<script lang="ts">
    import { createEventDispatcher } from "svelte";

    // Komponente
    import Row from "@components/Row.svelte";
    import Col from "@components/Col.svelte";
    import Form from "@components/Form.svelte";
    import Label from "@components/Label.svelte";
    import Input from "@components/Input.svelte";
    import Button from "@components/Button.svelte";
    import Link from "@components/Link.svelte";

    const dispatch = createEventDispatcher();

    let firstName = "";
    let lastName = "";
    let email = "";
    let username = "";
    let password = "";

    const handleSubmit = () => {
        dispatch("submit", {
            firstName,
            lastName,
            email,
            username,
            password
        });
    };
</script>

<Form>
    <Row>
        <!-- Vorname -->
        <Col sm={6} md={6} lg={6}>
            <Label forId="first-name">Vorname</Label>
            <Input id="first-name" bind:value={firstName}/>
        </Col>
        
        <!-- Nachname -->
        <Col sm={6} md={6} lg={6}>
            <Label forId="last-name">Nachname</Label>
            <Input id="last-name" bind:value={lastName}/>
        </Col>

        <!-- E-Mail -->
        <Col>
            <Label forId="email">E-Mail</Label>
            <Input id="email" bind:value={email}/>
        </Col>
        
        <!-- Nutzername -->
        <Col sm={6} md={6} lg={6}>
            <Label forId="username">Nutzername</Label>
            <Input id="username" bind:value={username}/>
        </Col>

        <!-- Passwort -->
        <Col sm={6} md={6} lg={6}>
            <Label forId="password">Passwort</Label>
            <Input type="password" id="password" bind:value={password}/>
        </Col>

        <!-- Knöpfe -->
        <Col sm={6} md={6} lg={6}>
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
    :global(.row > div) {
        padding-top: 1em;
    }

    .register-cta {
        padding-top: 1em;
        text-align: center;
    }

    .login-cta {
        display: block;
        padding-top: 1em;
        font-size: 0.85em;
        user-select: none;
    }
</style>