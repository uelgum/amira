import { Schema, model } from "mongoose";

// #region Types
type Contact = {
    id: string;
    contactId1: string;
    contactId2: string;
    confirmed: boolean;
};
// #endregion

/**
    Schema für `Contact`.
*/
const contactSchema = new Schema<Contact>({
    id: { type: String, required: true },
    contactId1: { type: String, required: true },
    contactId2: { type: String, required: true },
    confirmed: { type: Boolean, required: true }
});

/**
    `Contact`-Modell.
*/
const Contact = model("Contact", contactSchema);

export default Contact;