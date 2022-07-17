import type { Model, ModelStatic, WhereOptions } from "sequelize";

const exists = async <T extends Model>(model: ModelStatic<T>, where: WhereOptions<T>) => {
    const count = await model.count({
        where
    });

    return (count > 0);
};

export default exists;