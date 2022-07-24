import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Block-Model in der Datenbank.
*/
type Block = Model & {
    /**
        ID des Blocks.
    */
    id: string;

    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        ID des geblockten Nutzers.
    */
    blockedUserId: string;

    /**
        Erstelldatum des Block.
    */
    createdAt: number;
};
// #endregion

/**
    Block-Model in der Datenbank.
*/
const BlockModel = sequelize.define<Block>(
    "Block",
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
        blockedUserId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: "blocked_user_id"
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);
export default BlockModel;