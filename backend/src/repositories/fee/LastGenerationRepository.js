import LastGeneration from "../../models/fee/LastGeneration.js";

export const getAll = async () => {
    return await LastGeneration.findAll();
};

export const getById = async (id) => {
    return await LastGeneration.findByPk(id);
};

export const create = async (lastg) => {
    return await LastGeneration.create(lastg);
};

export const update = async (id, lastg) => {
    const [rowsUpdated] = await LastGeneration.update(lastg, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await LastGeneration.findByPk(id);
};

export const remove = async (id) => {
    const lastg = await LastGeneration.findByPk(id);

    if (!lastg) {
        return null;
    }
    await lastg.destroy();

    return {
        msg: "LastGeneration deleted successfully",
        data: lastg
    };
};
