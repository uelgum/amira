import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Dailies-Model für Tasks in der Datenbank.
*/
type DailiesTask = Model & {
    /**
        ID des Tasks.
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

    /**
        Ob der Task erledigt ist.
    */
    done: boolean;

    /**
        Erstelldatum des Tasks.
    */
    createdAt: number;
};
// #endregion

/**
    Dailies-Model für Tasks in der Datenbank.
*/
const DailiesTaskModel = sequelize.define<DailiesTask>(
    "DailiesTask",
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
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export default DailiesTaskModel;