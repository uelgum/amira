import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Status des Kontaktes.
*/
enum ContactStatus {
    STRANGERS = 0,
    CONFIRMED,
    PENDING_OUTGOING,
    PENDING_INCOMING
};

/**
    Kontakt-Model in der Datenbank.
*/
type Contact = Model & {
    /**
        ID des ersten Partners.
        Entspricht demjenigen, der die Kontakt-Anfrage **geschickt** hat.
    */
    id1: string;

    /**
        ID des zweiten Partners.
        Entspricht demjenigen, der die Kontakt-Anfrage **empfangen** hat.
    */
    id2: string;

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
        id1: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        id2: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
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