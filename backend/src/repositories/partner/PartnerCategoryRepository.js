import PartnerCategory from '../../models/partner/PartnerCategory.js';

export const getAll = async () => {
    return await PartnerCategory.findAll();
};

export const getOne = async (id) => {
    return await PartnerCategory.findByPk(id);
};

export const create = async (data) => {
    return await PartnerCategory.create(data);
};

export const update = async (id, updates) => {
    await PartnerCategory.update(updates, { where: { id } });
    return await PartnerCategory.findByPk(id);
};

export const remove = async (id) => {
    const partnerCategory = await PartnerCategory.findByPk(id);

    if (!partnerCategory) {
        return null;
    }
    await partnerCategory.destroy();

    return {
        msg: "PartnerCategory deleted successfully",
        data: partnerCategory
    };
};
