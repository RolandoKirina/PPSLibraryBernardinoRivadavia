import MaritalStatus from '../../models/partner/MaritalStatus.js';

export const getAll = async () => {
    return await MaritalStatus.findAll();
};

export const getOne = async (id) => {
    return await MaritalStatus.findByPk(id);
};

export const create = async (data) => {
    return await MaritalStatus.create(data);
};

export const update = async (id, updates) => {
    await MaritalStatus.update(updates, { where: { id } });
    return await MaritalStatus.findByPk(id);
};

export const remove = async (id) => {
    const maritalStatus = await MaritalStatus.findByPk(id);

    if (!maritalStatus) {
        return null;
    }
    await maritalStatus.destroy();

    return {
        msg: "Marital status deleted successfully",
        data: maritalStatus
    };
};
