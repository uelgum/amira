<script lang="ts">
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Card from "@atoms/Card";
    import SmallTitle from "@atoms/SmallTitle";
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
        <div id="lock-screen-title">
            <SmallTitle>Hallo, {$token.data.firstName}!</SmallTitle>
        </div>
        <LockScreenForm on:success={handleSuccess}/>
    </Card>
</Center>

<style lang="scss">
    #lock-screen-title {
        text-align: center;
        margin-bottom: 2em;
        user-select: none;
    }
</style>