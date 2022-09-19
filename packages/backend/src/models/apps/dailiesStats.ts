import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Dailies-Model für Statistiken in der Datenbank.
*/
type DailiesStats = Model & {
    /**
        ID der Statistik.
    */
    id: string;

    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        Anzahl der hinzugefügten Dailies.
    */
    tasksAdded: number;

    /**
        Anzahl der erledigten Dailies.
    */
    tasksDone: number;

    /**
        Datum der Statistik.
    */
    date: string;

    /**
        Erstelldatum der Statistik.
    */
    createdAt: string;
};
// #endregion

/**
    Dailies-Model für Statistiken in der Datenbank.
*/
const DailiesStatsModel = sequelize.define<DailiesStats>(
    "DailiesStats",
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
        tasksAdded: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tasks_added"
        },
        tasksDone: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "tasks_done"
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export default DailiesStatsModel;