import Reader from '../../models/partner/Reader.js';

export const getAll = async () => {
    return await Reader.findAll();
};

export const getOne = async (id) => {
    return await Reader.findByPk(id);
};

export const create = async (data) => {
    return await Reader.create(data);
};

export const update = async (id, updates) => {
    await Reader.update(updates, { where: { id } });
    return await Reader.findByPk(id);
};

export const remove = async (id) => {
    const reader = await Reader.findByPk(id);

    if (!reader) {
        return null;
    }
    await reader.destroy();

    return {
        msg: "Reader deleted successfully",
        data: reader
    };
};
