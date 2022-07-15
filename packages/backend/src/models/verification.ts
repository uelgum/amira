import { DataTypes, Model } from "sequelize";

// Intern
import sequelize from "@loaders/sequelize";

// #region Types
/**
    Verification-Model in der Datenbank.
*/
type Verification = Model & {
    /**
        ID des Nutzers.
    */
    userId: string;

    /**
        Bestätigungs-ID.
    */
    verificationId: string;

    /**
        Erstelldatum der Bestätigung.
    */
    createdAt: number;
};
// #endregion

/**
    Kontakt-Model in der Datenbank.
*/
const VerificationModel = sequelize.define<Verification>(
    "Verification",
    {
        userId: {
            type: DataTypes.STRING(20),
            primaryKey: true,
            allowNull: false,
            field: "user_id"
        },
        verificationId: {
            type: DataTypes.STRING(64),
            allowNull: false,
            field: "verification_id"
        },
        createdAt: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: "created_at"
        }
    }
);

export default VerificationModel;