<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";

    /**
        On-Mount.
    */
    onMount(() => {
        if($token.raw) {
            navigate("/dashboard");
            return;
        }

        navigate("/login");
    });
</script>