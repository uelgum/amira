import { Schema, model } from "mongoose";

// #region Types
type Notification = {
    id: string;
    type: string;
    recipientId: string;
    data: Record<string, any>;
    createdAt: number;
};
// #endregion

/**
    Schema für `Notification`.
*/
const notificationSchema = new Schema<Notification>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    recipientId: { type: String, required: true },
    data: { type: Map, required: true },
    createdAt: { type: Number, required: true }
});

/**
    Model für `Notification`.
*/
const Notification = model<Notification>("Notification", notificationSchema);

export default Notification;