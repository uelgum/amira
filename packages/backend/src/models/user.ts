import { Schema, model } from "mongoose";

// #region Types
type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailUnverified?: boolean;
    admin?: boolean;
    password: string;
    key: string;
    recoveryKey: string;
    createdAt: number;
};
// #endregion

/**
    Schema für `User`.
*/
const userSchema = new Schema<User>({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    emailUnverified: { type: Boolean },
    admin: { type: Boolean },
    password: { type: String, required: true },
    key: { type: String, required: true },
    recoveryKey: { type: String, required: true },
    createdAt: { type: Number }
});

/**
    `User`-Modell.
*/
const User = model<User>("User", userSchema);

export default User;