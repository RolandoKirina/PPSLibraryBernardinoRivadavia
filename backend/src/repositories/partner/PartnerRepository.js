import Partner from '../../models/partner/Partner.js';
import Book from "../../models/book/Book.js";
import LoanBook from '../../models/loan/LoanBook.js';
import Loan from '../../models/loan/Loan.js';
import statePartner from '../../models/partner/statePartner.js';
import Locality from '../../models/partner/locality.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import ReasonForWithdrawal from '../../models/partner/ReasonForWithDrawal.js';
import { Sequelize, Op } from "sequelize";

export const printList = async (filters) => {
  const {
    order,
    wherePartner,
    borrowedBooksMin,
    borrowedBooksMax,
    whereBook,
    limit,
    offset,
  } = filters;

  const min = borrowedBooksMin !== undefined ? Number(borrowedBooksMin) : undefined;
  const max = borrowedBooksMax !== undefined ? Number(borrowedBooksMax) : undefined;

  if (min !== undefined && isNaN(min)) {
    throw new Error("borrowedBooksMin inválido");
  }

  if (max !== undefined && isNaN(max)) {
    throw new Error("borrowedBooksMax inválido");
  }



  if (min !== undefined && max !== undefined && min > max) {
    [min, max] = [max, min];
  }

  const booksCountSubquery = `(
    SELECT COUNT(*)
    FROM "PrestamoLibro" AS LB
    INNER JOIN "Prestamo" AS L ON L."Id" = LB."IdPrestamo"
    WHERE L."NumSocio" = "Partner"."id"
  )`;

  const andConditions = [];

  if (min !== undefined) {
    andConditions.push(
      Sequelize.literal(`${booksCountSubquery} >= ${min}`)
    );
  }

  if (max !== undefined) {
    andConditions.push(
      Sequelize.literal(`${booksCountSubquery} <= ${max}`)
    );
  }

  const { rows, count } = await Partner.findAndCountAll({
    where: {
      ...wherePartner,
      ...(andConditions.length > 0 && {
        [Op.and]: andConditions,
      }),
    },

    attributes: {
      include: [
        [
          Sequelize.literal(booksCountSubquery),
          "totalBorrowedBooks",
        ],
      ],
    },

    include: [
      {
        model: ReasonForWithdrawal,
        as: "ReasonForWithdrawal",
        attributes: ["reason"],
      },
      {
        model: statePartner,
        as: "StatePartner",
        attributes: ["status"],
      },
      {
        model: Loan,
        as: "Loans",
        attributes: [],
        required: whereBook && Object.keys(whereBook).length > 0,
        include: [
          {
            model: LoanBook,
            as: "LoanBooks",
            required: true,
            attributes: [],
            include: [
              {
                model: Book,
                as: "Book",
                required: true,
                attributes: [],
                where: whereBook,
              },
            ],
          },
        ],
      },
    ],

    distinct: true,
    subQuery: false,
    order,
    limit,
    offset,
  });

  const total = Array.isArray(count) ? count.length : count;

  const mappedRows = rows.map((p) => {
    const raw = p.get({ plain: true });

    return {
      ...raw,   
      isActive: raw.StatePartner?.status || "Desconocido",
      idReason: raw.ReasonForWithdrawal?.reason || "",
      totalBorrowedBooks:
        parseInt(p.getDataValue("totalBorrowedBooks")) || 0,
    };
  });

  return {
    rows: mappedRows,
    count: total,
  };
};
/*export const printList = async (filters) => {
  const {
    order,
    wherePartner,
    borrowedBooksMin,
    borrowedBooksMax,
    whereBook,
    limit,
    offset,
  } = filters;

  console.log(borrowedBooksMin, "min");
  console.log(borrowedBooksMax,"max");
  const { rows, count } = await Partner.findAndCountAll({
    where: {
      ...wherePartner,
      [Sequelize.Op.and]: [
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "PrestamoLibro" AS LB
          INNER JOIN "Prestamo" AS L ON L."Id" = LB."IdPrestamo"
          WHERE L."NumSocio" = "Partner"."id"
        ) BETWEEN ${borrowedBooksMin} AND ${borrowedBooksMax}`)
      ]
    },
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "PrestamoLibro" AS LB
            INNER JOIN "Prestamo" AS L ON L."Id" = LB."IdPrestamo"
            WHERE L."NumSocio" = "Partner"."id"
          )`),
          'totalBorrowedBooks'
        ]
      ]
    },
    include: [
      {
        model: ReasonForWithdrawal,
        as: "ReasonForWithdrawal",
        attributes: ['reason']
      },
      {
        model: Loan,
        as: "Loans",
        attributes: [], 
        required: (whereBook && Object.keys(whereBook).length > 0), 
        include: [
          {
            model: LoanBook,
            as: "LoanBooks",
            required: true,
            attributes: [],
            include: [
              {
                model: Book,
                as: "Book",
                required: true,
                attributes: [],
                where: whereBook
              }
            ]
          }
        ]
      }
    ],
    distinct: true,
    subQuery: false,
    order,
    limit,
    offset
  });

  const total = Array.isArray(count) ? count.length : count;

  const mappedRows = rows.map(p => {
    const rawData = p.get({ plain: true });
    return {
      ...rawData, // Copia todas las props automágicamente
      idReason: rawData.ReasonForWithdrawal?.reason || '',
      totalBorrowedBooks: parseInt(p.getDataValue('totalBorrowedBooks')) || 0 
    };
  });

  return {
    rows: mappedRows,
    count: total
  };
};
*/
/*export const printList = async (filters) => {
  const {
    order,
    wherePartner,
    whereBook,
    limit,
    offset
  } = filters;

  const { rows, count } = await Partner.findAndCountAll({
    where: wherePartner,
    attributes: {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM "PrestamoLibro" AS LB
            INNER JOIN "Prestamo" AS L ON L."Id" = LB."IdPrestamo"
            WHERE L."NumSocio" = "Partner"."id"
          )`),
          'totalBorrowedBooks'
        ]
      ]
    },
    include: [
      {
        model: ReasonForWithdrawal,
        as: "ReasonForWithdrawal",
        attributes: ['reason']
      },
      {
        model: Loan,
        as: "Loans",
        attributes: [], 
        required: true,
        include: [
          {
            model: LoanBook,
            as: "LoanBooks",
            required: true,
            attributes: [],
            include: [
              {
                model: Book,
                as: "Book",
                required: true,
                attributes: [],
                where: whereBook
              }
            ]
          }
        ]
      }
    ],
    distinct: true,
    subQuery: false,
    order,
    limit,
    offset
  });

  const total = Array.isArray(count) ? count.length : count;

  const mappedRows = rows.map(p => ({
    id: p.id,
    partnerNumber: p.partnerNumber || '',
    name: p.name || '',
    surname: p.surname || '',
    homePhone: p.homePhone || '',
    homeAddress: p.homeAddress || '',
    isActive: p.isActive || '',
    idReason: p.ReasonForWithdrawal?.reason || '',
    birthDate: p.birthDate || '',
    registrationDate: p.registrationDate || '',
    withdrawalDate: p.withdrawalDate || '',
    unpaidFees: p.unpaidFees ?? 0,
    pendingBooks: p.pendingBooks ?? 0,
    presentedBy: p.presentedBy || '',
    totalBorrowedBooks: p.getDataValue('totalBorrowedBooks') || 0 
  }));

  return {
    rows: mappedRows,
    count: total
  };
};*/


//anda
/*export const printList = async (filters) => {

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
      model: ReasonForWithdrawal,
      as: "ReasonForWithdrawal",
      attributes: ['reason']
    },
    {
      model: Loan,
      as: "Loans",
      attributes: [],
      required: true,
      include: [
        {
          model: LoanBook,
          as: "LoanBooks",
          required: true,
          attributes: [],
          include: [
            {
              model: Book,
              as: "Book",
              required: true,
              attributes: [],
              where: whereBook
            }
          ]
        }
      ]
    }
  ],
  distinct: true,
  subQuery: false,
  order,
  limit,
  offset
});

  const total = Array.isArray(count) ? count.length : count;

  
  const mappedRows = rows.map(p => ({
    id: p.id,
    partnerNumber: p.partnerNumber || '',
    name: p.name || '',
    surname: p.surname || '',
    homePhone: p.homePhone || '',
    homeAddress: p.homeAddress || '',
    isActive: p.isActive || '',
    idReason: p.ReasonForWithdrawal?.reason || '',
    birthDate: p.birthDate || '',
    registrationDate: p.registrationDate || '',
    withdrawalDate: p.withdrawalDate || '',
    unpaidFees: p.unpaidFees ?? 0,
    pendingBooks: p.pendingBooks ?? 0,
    presentedBy: p.presentedBy || '',
  }));

  return {
    rows: mappedRows,
    count: total
  };
};*/

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
