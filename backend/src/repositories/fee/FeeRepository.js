import Fee from "../../models/fee/fee.js";

export const getAll = async () => {
    return await Fee.findAll();
};

export const getById = async (id) => {
    return await Fee.findByPk(id);
};

export const create = async (fee) => {
    return await Fee.create(fee);
};

export const update = async (id, fee) => {
    const [rowsUpdated] = await Fee.update(fee, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await Fee.findByPk(id);
};

export const remove = async (id) => {
    const fee = await Fee.findByPk(id);

    if (!fee) {
        return null;
    }
    await fee.destroy();

    return {
        msg: "Fee deleted successfully",
        data: fee
    };
};
