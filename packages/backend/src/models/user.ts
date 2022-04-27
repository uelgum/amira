import { Schema, model } from "mongoose";

// #region Types
type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailUnverified?: boolean;
    username: string;
    password: string;
    role: string;
    contacts: string[];
    createdAt: number;
};
// #endregion

const schema = new Schema<User>({
    id: { type: "string", required: true },
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: true },
    email: { type: "string", required: true },
    emailUnverified: { type: "boolean" },
    username: { type: "string", required: true },
    password: { type: "string", required: true },
    role: { type: "string", required: true },
    contacts: [ { type: "string" } ],
    createdAt: { type: "number", required: true }
});

const User = model<User>("User", schema);

export default User;