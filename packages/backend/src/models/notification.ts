import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Art der Benachrichtung.
*/
/**
    Art der Benachrichtigung.
*/
enum NotificationType {
    CONTACT_REQUEST_INCOMING = "contactRequestIncoming",
    CONTACT_REQUEST_ACCEPTED = "contactRequestAccepted"
};

/**
    Benachrichtungs-Model in der Datenbank.
*/
type Notification = Model & {
    /**
        ID der Benachrichtigung.
    */
    id: string;

    /**
        ID des Empfängers.
    */
    receiverId: string;

    /**
        Art der Benachrichtigung.
    */
    type: NotificationType;

    /**
        Zusätzliche Daten.
    */
    data?: Record<string, string | number>;

    /**
        Optionaler Link in der Benachrichtigung. Kann verwendet werden, um direkt auf
        das Ziel zu verweisen (z.B. **User** hat dir eine Nachricht geschickt).
    */
    link?: string;

    /**
        Erstelldatum der Benachrichtigung.
    */
    createdAt: number;
};
// #endregion

/**
    Benachrichtungs-Model in der Datenbank.
*/
const NotificationModel = sequelize.define<Notification>(
    "Notification",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        receiverId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "receiver_id"
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: true,
            field: "created_at"
        },
    }
);

export {
    Notification,
    NotificationType,
};

export default NotificationModel;