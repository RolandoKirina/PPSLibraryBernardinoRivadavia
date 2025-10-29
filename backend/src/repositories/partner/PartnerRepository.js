import Partner from '../../models/partner/Partner.js';

export const getAll = async () => {
    return await Partner.findAll();
};

export const getOne = async (id) => {
    return await Partner.findByPk(id);
};

export const getOneByPartnerNumber = async (partnerNumber) => {
    console.log(partnerNumber);
    const partner = await Partner.findAll({
        where: {
            partnerNumber: partnerNumber
        },
        limit: 1
    });

    return partner[0].dataValues;
};

export const create = async (data) => {
    return await Partner.create(data);
};

export const update = async (id, updates) => {
    await Partner.update(updates, { where: { id } });
    return await Partner.findByPk(id);
};

export const remove = async (id) => {
    const partner = await Partner.findByPk(id);

    if (!partner) {
        return null;
    }
    await partner.destroy();

    return {
        msg: "Partner deleted successfully",
        data: partner
    };
};
