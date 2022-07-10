import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    User-Model in der Datenbank.
*/
type User = Model & {
    /**
        ID.
    */
    id: string;

    /**
        Vorname.
    */
    firstName: string;

    /**
        Nachname.
    */
    lastName: string;
    
    /**
        Nutzername.
    */
    username: string;

    /**
        E-Mail.
    */
    email: string;

    /**
        Passwort.
    */
    password: string;

    /**
        Verschlüsselter User-Key, der zum Verschlüsseln und Entschlüsseln
        von Nutzerdaten verwendet wird.
    */
    userKey: string;

    /**
        Verschlüsselter Passwort-Key, der im Falle eines verlorenen Passworts
        zum Zurücksetzen des Passworts verwendet werden kann.
    */
    recoveryKey: string;

    /**
        Erstelldatum des Kontos.
    */
    createdAt: number;

    /**
        Ob der Nutzer ein Admin ist.
    */
    admin?: boolean;
};
// #endregion

/**
    User-Model in der Datenbank.
*/
const UserModel = sequelize.define<User>(
    "User",
    {
        id: {
            type: DataTypes.STRING(18),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        firstName: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: "first_name"
        },
        lastName: {
            type: DataTypes.STRING(32),
            allowNull: false,
            field: "last_name"
        },
        username: {
            type: DataTypes.STRING(16),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING(32),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        userKey: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: "user_key"
        },
        recoveryKey: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: "recovery_key"
        },
        createdAt: {
            type: DataTypes.NUMBER({ unsigned: true }),
            allowNull: false,
            field: "created_at"
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    }
);

export default UserModel;