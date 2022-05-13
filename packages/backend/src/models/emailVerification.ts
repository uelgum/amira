import { Schema, model } from "mongoose";

// #region Types
type EmailVerification = {
    userId: string;
    hash: string;
    createdAt: number;
};
// #endregion

/**
    Schema für `EmailVerification`.
*/
const emailVerificationSchema = new Schema<EmailVerification>({
    userId: { type: String, required: true },
    hash: { type: String, required: true },
    createdAt: { type: Number, required: true }
});

/**
    Model für `EmailVerification`.
*/
const EmailVerification = model<EmailVerification>(
    "EmailVerification",
    emailVerificationSchema
);

export default EmailVerification;