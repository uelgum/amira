import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Status des Kontaktes.
*/
enum ContactStatus {
    STRANGERS = "strangers",
    PENDING = "pending",
    PENDING_INCOMING = "pendingIncoming",
    PENDING_OUTGOING = "pendingOutgoing",
    CONFIRMED = "confirmed"
};

/**
    Kontakt-Model in der Datenbank.
*/
type Contact = Model & {
    /**
        ID des Kontaktes.
    */
    id: string;

    /**
        ID des ersten Partners.
        Entspricht demjenigen, der die Kontakt-Anfrage **geschickt** hat.
    */
    userId1: string;

    /**
        ID des zweiten Partners.
        Entspricht demjenigen, der die Kontakt-Anfrage **empfangen** hat.
    */
    userId2: string;

    /**
        Status des Kontaktes.
    */
    status: ContactStatus;

    /**
        Erstelldatum des Kontaktes.
    */
    createdAt: number;
};
// #endregion

/**
    Kontakt-Model in der Datenbank.
*/
const ContactModel = sequelize.define<Contact>(
    "Contact",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false
        },
        userId1: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "user_id1"
        },
        userId2: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "user_id2"
        },
        status: {
            type: DataTypes.STRING,
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
    ContactStatus
};

export default ContactModel;