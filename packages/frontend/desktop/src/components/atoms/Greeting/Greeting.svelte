<script lang="ts">
    import { onMount } from "svelte";

    // Intern
    import time from "@stores/time";
    import token from "@stores/token";

    const hours = $time.getHours();
    const name = $token.data.firstName;

    let greeting: string;

    onMount(() => {
        if(hours < 5) {
            greeting = "Hallo, Nachteule.";
        } else if(hours < 10) {
            greeting = `Guten Morgen, ${name}.`;
        } else if(hours <= 11) {
            greeting = `Guten Vormittag, ${name}.`;
        } else if(hours < 13) {
            greeting = `Guten Mittag, ${name}.`;
        } else if(hours < 17) {
            greeting = `Guten Nachmittag, ${name}.`;
        } else if(hours <= 20) {
            greeting = `Guten Abend, ${name}.`;
        } else {
            greeting = `Guten Spätabend, ${name}.`;
        }
    });
</script>

<span>
    {greeting}
</span>