import Partner from '../../models/partner/Partner.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const printList = async(id) =>{
  const { wherePartner, limit, offset, order } = filters;

  const query = {};

  if (wherePartner && Object.keys(wherePartner).length) {
    query.where = wherePartner;
  }

  if (Number.isInteger(limit)) {
    query.limit = limit;
  }

  if (Number.isInteger(offset)) {
    query.offset = offset;
  }

  if (Array.isArray(order) && order.length) {
    query.order = order;
  }

  const { rows, count } = await Partner.findAndCountAll(query);

  return {
    rows,
    count
  };
}
export const getUnpaidFeesByPartner = async (id) => {
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
  const { wherePartner, limit, offset, order } = filters;

  const query = {};

  if (wherePartner && Object.keys(wherePartner).length) {
    query.where = wherePartner;
  }

  if (Number.isInteger(limit)) {
    query.limit = limit;
  }

  if (Number.isInteger(offset)) {
    query.offset = offset;
  }

  if (Array.isArray(order) && order.length) {
    query.order = order;
  }

  const { rows, count } = await Partner.findAndCountAll(query);

  return {
    rows,
    count
  };
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
