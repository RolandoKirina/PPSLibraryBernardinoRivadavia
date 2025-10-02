import ReasonForWithdrawal from '../../models/partner/reasonForWithdrawal.js';

export const getAll = async () => {
    return await ReasonForWithdrawal.findAll();
};

export const getOne = async (id) => {
    return await ReasonForWithdrawal.findByPk(id);
};

export const create = async (data) => {
    return await ReasonForWithdrawal.create(data);
};

export const update = async (id, updates) => {
    await ReasonForWithdrawal.update(updates, { where: { id } });
    return await ReasonForWithdrawal.findByPk(id);
};

export const remove = async (id) => {
    const reason = await ReasonForWithdrawal.findByPk(id);

    if (!reason) {
        return null;
    }
    await reason.destroy();

    return {
        msg: "ReasonForWithdrawal deleted successfully",
        data: reason
    };
};
