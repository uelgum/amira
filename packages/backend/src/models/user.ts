import { Schema, model } from "mongoose";

// #region Types
type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailUnverified?: boolean;
    password: string;
    userKey: string;
    recoveryKey: string;
    admin?: boolean;
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
    password: { type: String, required: true },
    userKey: { type: String, required: true },
    recoveryKey: { type: String, required: true },
    admin: { type: Boolean },
    createdAt: { type: Number, required: true }
});

/**
    Model für `User`.
*/
const User = model<User>("User", userSchema);

// #region Methoden
/**
    Gibt den ersten Vornamen zurück.
*/
const getFirstName = (user: User) => {
    return user.firstName.split(" ")[0];
};

/**
    Gibt den vollständigen Namen zurück.
*/
const getFullName = (user: User) => {
    return `${user.firstName} ${user.lastName}`;
};
// #endregion

export {
    getFirstName,
    getFullName
};

export default User;