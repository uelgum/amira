import { Schema, model } from "mongoose";

// #region Types
type Contact = {
    id: string;
    contactId1: string;
    contactId2: string;
    unconfirmed?: boolean;
};
// #endregion

/**
    Schema für `Contact`.
*/
const contactSchema = new Schema<Contact>({
    id: { type: String, required: true },
    contactId1: { type: String, required: true },
    contactId2: { type: String, required: true },
    unconfirmed: { type: Boolean }
});

/**
    Model für `Contact`.
*/
const Contact = model<Contact>("Contact", contactSchema);

export default Contact;