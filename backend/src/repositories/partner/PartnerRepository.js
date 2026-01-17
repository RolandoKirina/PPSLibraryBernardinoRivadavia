import Partner from '../../models/partner/Partner.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getUnpaidFeesByPartner = async ( id) => { 
 try {
    const partner = await Partner.findByPk(id, {
      include: [
        {
          model: Fees,
          as: 'Fees',
          where: {
            paid: false
          },
          required: false,
        }
      ]
    });

    if (!partner) {
      throw new ValidationError(`El socio con id "${id}" no existe`);
    }

    return partner.Fees;
  } catch (err) {
    throw err;
  }

};

export const getAll = async (filters = {}) => {
    const { wherePartner, limit, offset } = filters;

    return await Partner.findAll({
        where: wherePartner,
        limit,
        offset
    });
};

export const getCount = async (filters = {}) => {
    const { wherePartner } = filters;

    return await Partner.count({
        where: wherePartner
    });
};


export const getOne = async (id) => {
    return await Partner.findByPk(id);
};

export const getOneByPartnerNumber = async (partnerNumber) => {
  try {
    const partner = await Partner.findOne({
      where: { partnerNumber },
    });

    if (!partner) {
      throw new ValidationError(`El socio con número "${partnerNumber}" no existe`);
    }

    return partner.dataValues;

  } catch (err) {
    throw err;
  }
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
