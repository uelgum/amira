import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Notes-Model in der Datenbank.
*/
type Notes = Model & {
    /**
        ID der Notiz.
    */
    id: string;

    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        Inhalt.
    */
    content: string;
};
// #endregion

/**
    Notes-Model in der Datenbank.
*/
const NotesModel = sequelize.define<Notes>(
    "Notes",
    {
        id: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "user_id"
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);

export default NotesModel;