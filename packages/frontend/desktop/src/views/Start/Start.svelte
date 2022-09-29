<script lang="ts">
    import { onMount } from "svelte";
    import { navigate } from "svelte-routing";

    // Intern
    import token from "@stores/token";
    import lock from "@stores/lock";

    /**
        On-Mount.
    */
    onMount(() => {
        if($lock) {
            navigate("/lockscreen");
            return;
        }

        if($token.raw) {
            navigate("/dashboard");
            return;
        }

        navigate("/login");
    });
</script>