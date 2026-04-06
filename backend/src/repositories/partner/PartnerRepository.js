import Partner from '../../models/partner/Partner.js';
import Book from "../../models/book/Book.js";
import LoanBook from '../../models/loan/LoanBook.js';
import Loan from '../../models/loan/Loan.js';
import statePartner from '../../models/partner/statePartner.js';
import Locality from '../../models/partner/locality.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { Sequelize, QueryTypes } from 'sequelize';
/*
export const printList = async (filters) => {
  const { 
    order, 
    wherePartner, 
    borrowedBooksMax, 
    borrowedBooksMin, 
    whereBook, 
    limit, 
    offset 
  } = filters;

  let havingCondition = null;
  if (borrowedBooksMin !== undefined || borrowedBooksMax !== undefined) {
    const conditions = [];
    if (borrowedBooksMin !== undefined) {
      conditions.push(`COUNT("Loans->LoanBooks"."LoanBookId") >= ${Number(borrowedBooksMin)}`);
    }
    if (borrowedBooksMax !== undefined) {
      conditions.push(`COUNT("Loans->LoanBooks"."LoanBookId") <= ${Number(borrowedBooksMax)}`);
    }
    havingCondition = Sequelize.literal(conditions.join(' AND '));
  }


  const totalResults = await Partner.findAll({
    attributes: ['id'],
    where: wherePartner,
    include: [{
      model: Loan, as: "Loans", required: true, attributes: [],
      include: [{
        model: LoanBook, as: "LoanBooks", required: true, attributes: [],
        include: [{
          model: Book, as: "Book", required: true, attributes: [], where: whereBook
        }]
      }]
    }],
    group: ['Partner.id'],
    having: havingCondition,
    raw: true,
    subQuery: false
  });

  const totalCount = totalResults.length;
  if (totalCount === 0) return { rows: [], count: 0 };


  const partnersWithFilters = await Partner.findAll({
    attributes: ['id'],
    where: wherePartner,
    include: [{
      model: Loan, as: "Loans", required: true, attributes: [],
      include: [{
        model: LoanBook, as: "LoanBooks", required: true, attributes: [],
        include: [{
          model: Book, as: "Book", required: true, attributes: [], where: whereBook
        }]
      }]
    }],
    group: ['Partner.id'],
    having: havingCondition,
    order,
    limit,
    offset,
    raw: true,
    subQuery: false
  });

  const partnerIds = partnersWithFilters.map(p => p.id);

  let cduValue = whereBook?.codeCDU;
  if (cduValue && typeof cduValue === 'object') {
    cduValue = cduValue[Object.getOwnPropertySymbols(cduValue)[0]] || cduValue;
  }

  const rows = await Partner.findAll({
    where: { id: partnerIds },
    attributes: {
      include: [[
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "PrestamoLibro" AS lb
          INNER JOIN "Prestamo" AS l ON lb."IdPrestamo" = l."Id"
          INNER JOIN "Libros" AS b ON lb."BookId" = b."id"
          WHERE l."NumSocio" = "Partner"."id"
          ${cduValue ? `AND b."Cod_rcdu" LIKE '${cduValue.toString().replace('%','')}%'` : ''}
        )`),
        'totalBorrowedBooks'
      ]]
    },
    order
  });

  return { rows, count: totalCount };
};
*/

export const printList = async (filters) => {
  const { 
    order, 
    wherePartner, 
    borrowedBooksMax, 
    borrowedBooksMin, 
    whereBook, 
    limit, 
    offset 
  } = filters;

  // --- 1. CONFIGURACIÓN DEL HAVING (Igual que antes) ---
  let havingCondition = null;
  if (borrowedBooksMin !== undefined || borrowedBooksMax !== undefined) {
    const conditions = [];
    if (borrowedBooksMin !== undefined) {
      conditions.push(`COUNT("Loans->LoanBooks"."LoanBookId") >= ${Number(borrowedBooksMin)}`);
    }
    if (borrowedBooksMax !== undefined) {
      conditions.push(`COUNT("Loans->LoanBooks"."LoanBookId") <= ${Number(borrowedBooksMax)}`);
    }
    havingCondition = Sequelize.literal(conditions.join(' AND '));
  }

  // --- 2. PASO 1: CONTEO TOTAL ---
  const totalResults = await Partner.findAll({
    attributes: ['id'],
    where: wherePartner,
    include: [{
      model: Loan, as: "Loans", required: true, attributes: [],
      include: [{
        model: LoanBook, as: "LoanBooks", required: true, attributes: [],
        include: [{
          model: Book, as: "Book", required: true, attributes: [], where: whereBook
        }]
      }]
    }],
    group: ['Partner.id'],
    having: havingCondition,
    raw: true,
    subQuery: false
  });

  const totalCount = totalResults.length;
  if (totalCount === 0) return { rows: [], count: 0 };

  // --- 3. PASO 2: OBTENER IDs FILTRADOS Y ORDENADOS ---
  const partnersWithFilters = await Partner.findAll({
    attributes: ['id'],
    where: wherePartner,
    include: [{
      model: Loan, as: "Loans", required: true, attributes: [],
      include: [{
        model: LoanBook, as: "LoanBooks", required: true, attributes: [],
        include: [{
          model: Book, as: "Book", required: true, attributes: [], where: whereBook
        }]
      }]
    }],
    group: ['Partner.id'],
    having: havingCondition,
    order, // <--- El orden aplicado aquí decide qué IDs entran en la página
    limit,
    offset,
    raw: true,
    subQuery: false
  });

  const partnerIds = partnersWithFilters.map(p => p.id);

  // --- 4. PASO 3: DATA FINAL (Manteniendo el orden) ---
  let cduValue = whereBook?.codeCDU;
  if (cduValue && typeof cduValue === 'object') {
    cduValue = cduValue[Object.getOwnPropertySymbols(cduValue)[0]] || cduValue;
  }

  const rows = await Partner.findAll({
    where: { id: partnerIds },
    attributes: {
      include: [[
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM "PrestamoLibro" AS lb
          INNER JOIN "Prestamo" AS l ON lb."IdPrestamo" = l."Id"
          INNER JOIN "Libros" AS b ON lb."BookId" = b."id"
          WHERE l."NumSocio" = "Partner"."id"
          ${cduValue ? `AND b."Cod_rcdu" LIKE '${cduValue.toString().replace('%','')}%'` : ''}
        )`),
        'totalBorrowedBooks'
      ]]
    },
    // IMPORTANTE: El orden aquí debe ser el mismo que en el Paso 2
    // para que la respuesta final sea consistente.
    order 
  });

  return { rows, count: totalCount };
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
