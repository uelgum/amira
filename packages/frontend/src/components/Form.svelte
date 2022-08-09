<script lang="ts">
    const handleSubmit = (event: Event) => {
        event.preventDefault();
    };
</script>

<form on:submit={handleSubmit} autocomplete="off" spellcheck="false">
    <slot/>
</form>