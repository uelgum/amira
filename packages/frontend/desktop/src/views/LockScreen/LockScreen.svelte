<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";
    import lock from "@stores/lock";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Card from "@atoms/Card";
    import CardTitle from "@atoms/CardTitle";
    import LockScreenForm from "@organisms/LockScreenForm";

    // Types
    import type { FlyParams } from "svelte/transition";

    const flyIn: FlyParams = {
        x: -window.innerWidth,
        duration: 500,
        delay: 500
    };

    /**
        Wird ausgeführt, sobald die Entsperrung erfolgreich ist.
    */
    const handleSuccess = () => {
        lock.reset();
        navigate("/dashboard");
    };

    /**
        On-Mount.
    */
    onMount(() => {
        if(!$token.raw) {
            navigate("/login");
            return;
        }

        $lock = true;
    });
</script>

<Center>
    <div id="lock-screen" in:fly={flyIn}>
        <Card>
            <CardTitle>Hallo, {$token.data.firstName}!</CardTitle>
            <LockScreenForm on:success={handleSuccess}/>
        </Card>
    </div>
</Center>