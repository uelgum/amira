<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Layouts
    import Center from "@layouts/Center";

    // Komponente
    import Loader from "@atoms/Loader";

    // Intern
    import socketConnection from "@stores/socketConnection";

    /**
        On-Mount.
    */
    onMount(() => {
        if($socketConnection) {
            navigate("/dashboard");
            return;
        }

        const interval = setInterval(() => {
            if($socketConnection) navigate("/dashboard");
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<!-- <div id="connecting" in:blur>
    <Loader/>
    <span>Stelle Verbindung her...</span>
</div> -->

<Center>
    <Loader/>
    <span>Stelle Verbindung her...</span>
</Center>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    span {
        color: $white-lighter;
        animation: loader-text-pulsate 2s ease-out infinite;
        user-select: none;
    }

    @keyframes loader-text-pulsate {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
    }
</style>