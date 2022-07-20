import type { Model, ModelStatic, WhereOptions } from "sequelize";

/**
    Überprüft, ob ein Eintrag in der Datenbank existiert.
*/
const exists = async <T extends Model>(model: ModelStatic<T>, where: WhereOptions<T>) => {
    const count = await model.count({
        where
    });

    return (count > 0);
};

export default exists;