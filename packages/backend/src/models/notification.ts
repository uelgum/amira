import { Schema, model } from "mongoose";

// #region Types
type Notification = {
    id: string;
    userId: string;
    content: string;
    createdAt: number;
};
// #endregion

/**
    Schema für `Notification`.
*/
const notificationSchema = new Schema<Notification>({
    id: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Number, required: true }
});

/**
    `Notification`-Modell.
*/
const Notification = model<Notification>(
    "Notification",
    notificationSchema
);

export default Notification;