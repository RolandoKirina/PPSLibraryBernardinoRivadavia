import StatePartner from '../../models/partner/StatePartner.js';

export const getAll = async () => {
    return await StatePartner.findAll();
};

export const getOne = async (id) => {
    return await StatePartner.findByPk(id);
};

export const create = async (data) => {
    return await StatePartner.create(data);
};

export const update = async (id, updates) => {
    await StatePartner.update(updates, { where: { id } });
    return await StatePartner.findByPk(id);
};

export const remove = async (id) => {
    const statePartner = await StatePartner.findByPk(id);

    if (!statePartner) {
        return null;
    }
    await statePartner.destroy();

    return {
        msg: "StatePartner deleted successfully",
        data: statePartner
    };
};
