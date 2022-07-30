import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Schlüssel des Nutzers.
*/
type Keys = {
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
        Public-Key des Nutzers (OpenPGP).
    */
    publicKey: string;
};

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
        Ob die E-Mail bestätigt wurde.
    */
    emailVerified: boolean;

    /**
        Passwort.
    */
    password: string;

    /**
        Schlüssel des Nutzers.
    */
    keys: Keys;

    /**
        Erstelldatum des Kontos.
    */
    createdAt: number;
};
// #endregion

/**
    User-Model in der Datenbank.
*/
const UserModel = sequelize.define<User>(
    "User",
    {
        id: {
            type: DataTypes.STRING(20),
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
        emailVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: "email_verified"
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        keys: {
            type: DataTypes.JSONB,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export default UserModel;