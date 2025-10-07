import Key from "../../models/book/Key.js";

export const getAll = async () => {
    return await Key.findAll();
};

export const getById = async (id) => {
    return await Key.findByPk(id);
};

export const create = async (key) => {
    return await Key.create(key);
};

export const update = async (id, key) => {
    const [rowsUpdated] = await Key.update(key, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await Key.findByPk(id);
};

export const remove = async (id) => {
    const key = await Key.findByPk(id);

    if (!key) {
        return null;
    }
    await key.destroy();

    return {
        msg: "Key deleted successfully",
        data: key
    };
};
