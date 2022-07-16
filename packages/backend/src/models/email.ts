import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Art der E-Mail.
*/
enum EmailType {
    VERIFICATION,
    PASSWORD_RESET
};

/**
    E-Mail-Model in der Datenbank.
*/
type Email = Model & {
    /**
        ID der E-Mail.
    */
    id: string;
    
    /**
        Art der E-Mail.
    */
    type: EmailType;

    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        ID der Aktion (z.B. Verifizierung oder Passwort-Reset).
    */
    actionId: string;

    /**
        Erstelldatum der E-Mail.
    */
    createdAt: number;
};
// #endregion

/**
    E-Mail-Model in der Datenbank.
*/
const EmailModel = sequelize.define<Email>(
    "Email",
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
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "user_id"
        },
        actionId: {
            type: DataTypes.STRING(64),
            allowNull: false,
            unique: true,
            field: "action_id"
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export {
    EmailType
};

export default EmailModel;