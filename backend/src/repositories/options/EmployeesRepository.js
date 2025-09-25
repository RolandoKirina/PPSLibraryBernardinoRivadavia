import Employees from '../../models/options/Employees.js';

export const getAll = async () => {
    return await Employees.findAll();
};

export const getOne = async (id) => {
    return await Employees.findByPk(id);
};

export const create = async (data) => {
    return await Employees.create(data);
};

export const update = async (id, updates) => {
    await Employees.update(updates, { where: { id } });
    return await Employees.findByPk(id);
};

export const remove = async (id) => {
    return await Employees.destroy({ where: { id } });
};
