import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Mail-Model in der Datenbank.
*/
type Mail = Model & {
    /**
        ID der Mail.
    */
    id: string;

    /**
        ID des Senders.
    */
    senderId: string;

    /**
        ID des Empfängers.
    */
    recipientId: string;

    /**
        Betreff der Mail.
    */
    subject: string;

    /**
        Inhalt der Mail.
    */
    content: string;

    /**
        Erstelldatum der Mail.
    */
    createdAt: string;
};
// #endregion

/**
    Mail-Model in der Datenbank.
*/
const MailModel = sequelize.define<Mail>(
    "Mail",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        senderId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "sender_id"
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

export default MailModel;