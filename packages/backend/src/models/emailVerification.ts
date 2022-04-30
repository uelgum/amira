import { Schema, model } from "mongoose";

// #region Types
type EmailVerification = {
    id: string;
    hash: string;
    createdAt: number;
};
// #endregion

/**
    Schema für `EmailVerification`.
*/
const emailVerificationSchema = new Schema<EmailVerification>({
    id: { type: String, required: true },
    hash: { type: String, required: true },
    createdAt: { type: Number, required: true }
});

/**
    `EmailVerification`-Modell.
*/
const EmailVerification = model<EmailVerification>(
    "EmailVerification",
    emailVerificationSchema
);

export default EmailVerification;