<script lang="ts">
    import Contact from "@molecules/Contact";

    // Types
    import type { Contact as ContactType } from "@stores/contacts";

    /**
        Liste der Kontakte, die im Container dargestellt werden sollen.
    */
    export let contacts: ContactType[];
</script>

<div class="contact-container">
    {#each contacts as contact}
        <Contact contact={contact}/>
    {/each}
</div>

<style lang="scss">
    .contact-container {
        display: flex;
        padding: 0.5em 0em 0.5em 0em;
        flex-direction: column;
        gap: 0.5em;
        overflow: hidden auto;
    }
</style>