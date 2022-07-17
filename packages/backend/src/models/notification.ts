import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Art der Benachrichtung.
*/
enum NotificationType {
    CONTACT_REQUEST,
    CONTACT_ACCEPTED
};

/**
    Benachrichtungs-Model in der Datenbank.
*/
type Notification = Model & {
    /**
        ID der Banachrichtung.
    */
    id: string;

    /**
        Art der Benachrichtung.
    */
    type: NotificationType;

    /**
        Inhalt der Benachrichtung.
    */
    content: string;

    /**
        Erstelldatum der Benachrichtung.
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
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        recipientId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "recipient_id"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export {
    NotificationType
};

export default NotificationModel;