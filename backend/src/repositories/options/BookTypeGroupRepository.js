import BookTypeGroup from '../../models/options/BookTypeGroup.js';

export const getAll = async () => {
    return await BookTypeGroup.findAll();
};

export const getOne = async (id) => {
    return await BookTypeGroup.findByPk(id);
};

export const create = async (data) => {
    return await BookTypeGroup.create(data);
};

export const update = async (id, updates) => {
    await BookTypeGroup.update(updates, { where: { id } });
    return await BookTypeGroup.findByPk(id);
};

export const remove = async (id) => {
    return await BookTypeGroup.destroy({ where: { id } });
};
