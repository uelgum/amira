<script lang="ts">
    import Avatar from "@atoms/Avatar";
    import SmallText from "@atoms/SmallText";
    import PresenceStatus from "@atoms/PresenceStatus";

    // Types
    import type { Contact } from "@stores/contacts";

    /**
        Informationen über den Kontakt.
    */
    export let contact: Contact;
</script>

<div class="contact">
    <div class="contact__avatar">
        <Avatar id={contact.contactId} size="sm"/>
        <div class="contact__presence-status">
            <PresenceStatus type={contact.presenceStatus} size="sm"/>
        </div>
    </div>
    <SmallText>
        {contact.fullName}
    </SmallText>
</div>

<style lang="scss">
    @use "@amira/shared/scss/colors" as *;

    .contact {
        display: flex;
        align-items: center;
        gap: 1em;
        user-select: none;
    }

    .contact__avatar {
        position: relative;
    }

    .contact__presence-status {
        position: absolute;
        right: -0.25em;
        bottom: -0.15em;
        border: 2px solid $black-light;
        border-radius: 50%;
    }
</style>