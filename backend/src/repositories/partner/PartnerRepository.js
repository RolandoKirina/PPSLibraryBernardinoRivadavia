import Partner from '../../models/partner/Partner.js';
import Book from "../../models/book/Book.js";
import LoanBook from '../../models/loan/LoanBook.js';
import Loan from '../../models/loan/Loan.js';
import statePartner from '../../models/partner/statePartner.js';
import Locality from '../../models/partner/locality.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const printList = async (filters) => {

  const {
    order,
    wherePartner,
    whereBook,
    limit,
    offset
  } = filters;


  const { rows, count } = await Partner.findAndCountAll({
    where: wherePartner,
    include: [
      {
        model: Loan,
        as: "Loans",
        attributes: [],
        required: true,
        include: [
          {
            model: LoanBook,
            as: "LoanBooks",
            attributes: [],
            include: [
              {
                model: Book,
                as: "Book",
                attributes: [],
                where: whereBook
              }
            ]
          }
        ]
      }
    ],
    group: ['Partner.id'],
    distinct: true,
    subQuery: false,
    order,
    limit,
    offset
  });

  return {
    rows,
    count
  };
};

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

  const query = {
    include: [
      {
        model: statePartner,
        as: 'StatePartner',
        attributes: ['status'],
      },
      {
        model: Locality,
        as: 'Locality',
        attributes: ['name'],
      }
    ]
  };

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

  const flattenedRows = rows.map(partner => {
    const p = partner.get({ plain: true });

    return {
      ...p,
      status: p.StatePartner?.status || null,
      Locality: p.Locality?.name || 'No definida',
      StatePartner: undefined // 
    };
  });

  return {
    rows: flattenedRows,
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
