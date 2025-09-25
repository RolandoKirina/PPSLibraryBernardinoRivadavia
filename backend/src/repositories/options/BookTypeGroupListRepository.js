import BookTypeGroupList from '../../models/options/BookTypeGroupList.js';

export const getAll = async () => {
    return await BookTypeGroupList.findAll();
};

export const getOne = async (id) => {
    return await BookTypeGroupList.findByPk(id);
};

export const create = async (data) => {
    return await BookTypeGroupList.create(data);
};

export const update = async (id, updates) => {
    await BookTypeGroupList.update(updates, { where: { id } });
    return await BookTypeGroupList.findByPk(id);
};

export const remove = async (id) => {
    return await BookTypeGroupList.destroy({ where: { id } });
};
