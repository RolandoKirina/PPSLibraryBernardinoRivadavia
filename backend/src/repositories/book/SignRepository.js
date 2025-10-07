import Sign from "../../models/book/Signs.js";

export const getAll = async () => {
    return await Sign.findAll();
};

export const getById = async (id) => {
    return await Sign.findByPk(id);
};

export const create = async (sign) => {
    return await Sign.create(sign);
};

export const update = async (id, sign) => {
    const [rowsUpdated] = await Sign.update(sign, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await Sign.findByPk(id);
};

export const remove = async (id) => {
    const sign = await Sign.findByPk(id);

    if (!sign) {
        return null;
    }
    await sign.destroy();

    return {
        msg: "Sign deleted successfully",
        data: sign
    };
};
