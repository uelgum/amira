<script lang="ts">
    const handleSubmit = (event: Event) => {
        event.preventDefault();
    };
</script>

<!--
    ⚠️ Viele Browser ignorieren "autocomplete", dies kann jedoch mit einem
    undefinierten String umgangen werden. Auf diese Weise wird Autocomplete
    deaktiviert. 
-->

<form class="form" spellcheck="false" autocomplete="autocomplete-amira" on:submit={handleSubmit}>
    <slot/>
</form>

<style lang="scss">
    .form {
        display: flex;
        flex-direction: column;
        gap: 2em;
    }
</style>