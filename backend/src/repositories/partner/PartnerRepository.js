import Partner from '../../models/partner/Partner.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { fn, col } from 'sequelize';

export const printList = async(filters) =>{
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


export const getCountRetiredBooks = async (min, max) => {
  const results = await sequelize.query(
    `
      SELECT 
      p."Id" AS "partnerId",
      COUNT(lb."LoanBookId") AS cantidad_libros
      FROM "Partner" p
      JOIN "Prestamo" l 
          ON l."partnerId" = p."Id"
      JOIN "PrestamoLibro" lb 
          ON lb."IdPrestamo" = l."Id"
      GROUP BY p."Id"
      HAVING COUNT(lb."LoanBookId") BETWEEN :min AND :max;
    `,
    {
      replacements: { min, max },
      type: QueryTypes.SELECT
    }
  );

  return results;
};

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
