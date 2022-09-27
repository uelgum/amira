<script lang="ts">
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Card from "@atoms/Card";
    import CardTitle from "@atoms/CardTitle";
    import LockScreenForm from "@organisms/LockScreenForm";

    /**
        Wird ausgeführt, sobald die Entsperrung erfolgreich ist.
    */
    const handleSuccess = () => {
        navigate("/dashboard");
    };
</script>

<Center>
    <Card>
        <CardTitle>Hallo, {$token.data.firstName}!</CardTitle>
        <LockScreenForm on:success={handleSuccess}/>
    </Card>
</Center>