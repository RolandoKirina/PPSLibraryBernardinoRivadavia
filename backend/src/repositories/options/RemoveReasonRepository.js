import RemoveReason from '../../models/options/RemoveReason.js';

export const getAll = async () => {
    return await RemoveReason.findAll();
};

export const getOne = async (id) => {
    return await RemoveReason.findByPk(id);
};

export const create = async (data) => {
    return await RemoveReason.create(data);
};

export const update = async (id, updates) => {
    await RemoveReason.update(updates, { where: { id } });
    return await RemoveReason.findByPk(id);
};

export const remove = async (id) => {
    return await RemoveReason.destroy({ where: { id } });
};
