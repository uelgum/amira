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
    */
    id1: string;

    /**
        ID des zweiten Partners.
    */
    id2: string;

    /**
        Ob der Kontakt noch nicht bestätigt ist.
    */
    unconfirmed?: boolean;
};
// #endregion

/**
    Kontakt-Model in der Datenbank.
*/
const ContactModel = sequelize.define<Contact>(
    "Contact",
    {

    }
);

export default ContactModel;