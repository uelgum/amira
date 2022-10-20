import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
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
        Ob der Kontakt bestätigt ist.
    */
    confirmed: boolean;
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
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
);

export default ContactModel;