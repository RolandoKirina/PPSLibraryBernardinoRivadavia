import Fees from "../../models/fee/fee.js";
import Partner from "../../models/partner/partner.js";
import { Sequelize, Op } from "sequelize";
import { fn, col } from 'sequelize';
import { QueryTypes } from "sequelize";
import sequelize from "../../configs/database.js";
import PartnerCategory from "../../models/partner/partnerCategory.js";

export const getYearlyReport = async (partnerNumber, year, semester) => {
  // Definimos el rango de meses según el semestre
  const startMonth = semester === "1" ? 1 : 7;
  const endMonth = semester === "1" ? 6 : 12;

  return await Fees.findAll({
    where: {
      year: year,
      month: { [Op.between]: [startMonth, endMonth] },
      date_of_paid: null,
      paid: false,
      status: true
    },
    include: [{
      model: Partner,
      as: 'Partner',
      where: { partnerNumber: partnerNumber }, // Filtro clave
      attributes: ['name', 'surname', 'partnerNumber']
    }],
    order: [['month', 'ASC']]
  });
};

export const getAll = async (filters = {}) => {
  const { wherePartner, whereFees, limit, offset, order } = filters;

  const baseInclude = [
    {
      model: Partner,
      as: "Partner",
      required: true,
      where: wherePartner && Object.keys(wherePartner).length ? wherePartner : undefined,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Cuotas" AS f
              WHERE f."IdSocio" = "Partner"."id"
              AND f."Paga" = false
            )`),
            'unpaidFeesReal'
          ]
        ]
      },
      include: [
        {
          model: PartnerCategory,
          as: "PartnerCategory",
          attributes: ['name', 'amount']
        }
      ]
    }
  ];

  const idsResult = await Fees.findAll({
    attributes: ['id'],
    where: whereFees && Object.keys(whereFees).length ? whereFees : undefined,
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: wherePartner && Object.keys(wherePartner).length ? wherePartner : undefined,
        attributes: []
      }
    ],
    limit,
    offset,
    order: order || [['id', 'DESC']],
    subQuery: false,
    raw: true
  });

  const ids = idsResult.map(r => r.id);

  if (!ids.length) {
    return { rows: [], count: 0 };
  }

  const fees = await Fees.findAll({
    where: { id: ids },
    include: baseInclude,
    order: order || [['id', 'DESC']],
    subQuery: false
  });

  const count = await Fees.count({
    where: whereFees && Object.keys(whereFees).length ? whereFees : undefined,
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: wherePartner && Object.keys(wherePartner).length ? wherePartner : undefined
      }
    ],
    distinct: true,
    col: 'Id'
  });

  return {
    rows: fees.map(fee => {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getUTCDate()).padStart(2, "0");
        const month = String(d.getUTCMonth() + 1).padStart(2, "0");
        const year = d.getUTCFullYear();
        return `${day}-${month}-${year}`;
      };

      const categoryName = fee.Partner?.PartnerCategory?.name || "Sin Categoría";

      return {
        feeid: fee.id,
        month: fee.month,
        year: fee.year,
        amount: fee.amount,
        observation: fee.observation,
        paid: fee.paid,
        paidLabel: fee.paid ? "Pagada" : "Impaga",
        date_of_paid: formatDate(fee.date_of_paid),
        partnerNumber: fee.Partner?.partnerNumber,
        idPartner: fee.Partner?.id,
        name: fee.Partner ? `${fee.Partner.name} ${fee.Partner.surname}` : "",
        registrationDate: fee.Partner?.registrationDate,
        idState:fee.Partner?.isActive === 1 ? "Activo" 
        : fee.Partner?.isActive === 2? "Inactivo" : "Desconocido",        
        unpaidFees: parseInt(fee.Partner?.dataValues?.unpaidFeesReal) || 0,
        category: categoryName,
        surname: fee.Partner?.surname,
        status: fee.status,
        statusLabel: fee.status ? "Vigente" : "Anulada",
        createdAt: formatDate(fee.createdAt),
      };
    }),
    count
  };
};

export const getAllFeesTypeOne = async (filters = {}) => {
  const { beforeDate, afterDate, limit, offset } = filters;

  let whereConditions = ['c."Paga" = true'];
  const replacements = {
    limit: limit || 35,
    offset: offset || 0
  };

  if (beforeDate) {
    whereConditions.push('c."FechaPago"::date <= :before::date');
    replacements.before = beforeDate;
  }

  if (afterDate) {
    whereConditions.push('c."FechaPago"::date >= :after::date');
    replacements.after = afterDate;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  const query = `
    SELECT 
      s."numero" AS "partnerNumber",
      s."apellido" AS "surname",
      s."nombre" AS "name",
      COUNT(c."Id")::integer AS "amountFeesPerPartner",
      SUM(c."Monto")::float AS "amount"
    FROM "Cuotas" c
    INNER JOIN "socio" s ON c."IdSocio" = s."id"
    ${whereClause}
    GROUP BY s."id", s."numero", s."apellido", s."nombre"
    ORDER BY s."numero" ASC
    LIMIT :limit OFFSET :offset
  `;

  const totalsQuery = `
    SELECT 
      SUM(c."Monto")::float AS "totalAmount",
      COUNT(c."Id")::integer AS "totalFees"
    FROM "Cuotas" c
    INNER JOIN "socio" s ON c."IdSocio" = s."id"
    ${whereClause}
  `;

  try {
    const [rows, totalsResult] = await Promise.all([
      sequelize.query(query, { replacements, type: QueryTypes.SELECT }),
      sequelize.query(totalsQuery, { replacements, type: QueryTypes.SELECT })
    ]);

    const totals = totalsResult[0];

    if (rows.length > 0) {
      rows.push({
        partnerNumber: 'TOTALES',
        surname: '-',
        name: '-',
        amountFeesPerPartner: totals?.totalFees || 0,
        amount: totals?.totalAmount || 0
      });
    }

    return {
      rows,
      count: rows.length > 0 ? rows.length - 1 : 0,
      others: {
        totalAmount: totals?.totalAmount || 0,
        totalFees: totals?.totalFees || 0
      }
    };
  } catch (error) {
    console.error("Error TypeOne:", error);
    throw error;
  }
};

export const getAllFeesTypeTwo = async (filters = {}) => {
  const { beforeDate, afterDate, limit, offset } = filters;

  let whereConditions = ['c."Paga" = true'];
  const replacements = {
    limit: limit || 100,
    offset: offset || 0
  };

  if (beforeDate) {
    whereConditions.push('c."FechaPago"::date <= :before::date');
    replacements.before = beforeDate;
  }

  if (afterDate) {
    whereConditions.push('c."FechaPago"::date >= :after::date');
    replacements.after = afterDate;
  }

  const whereClause = `WHERE ${whereConditions.join(' AND ')}`;

  const query = `
    SELECT 
      UPPER(LEFT(s."apellido", 1)) AS "letter",
      COUNT(CASE WHEN cat."Categoria" = 'Regular' THEN c."Id" END)::integer AS "regularCount",
      SUM(CASE WHEN cat."Categoria" = 'Regular' THEN c."Monto" ELSE 0 END)::float AS "regular",
      COUNT(CASE WHEN cat."Categoria" = 'Honorario' THEN c."Id" END)::integer AS "honoraryCount",
      SUM(CASE WHEN cat."Categoria" = 'Honorario' THEN c."Monto" ELSE 0 END)::float AS "honorary",
      COUNT(CASE WHEN cat."Categoria" = 'Protector' THEN c."Id" END)::integer AS "protectorCount",
      SUM(CASE WHEN cat."Categoria" = 'Protector' THEN c."Monto" ELSE 0 END)::float AS "protector",
      COUNT(CASE WHEN cat."Categoria" = 'Debito' THEN c."Id" END)::integer AS "debitCount",
      SUM(CASE WHEN cat."Categoria" = 'Debito' THEN c."Monto" ELSE 0 END)::float AS "debit"
    FROM "Cuotas" c
    INNER JOIN "socio" s ON c."IdSocio" = s."id"
    INNER JOIN "CategoriaSocio" cat ON s."IdCategoria" = cat."Id"
    ${whereClause}
    GROUP BY "letter"
    ORDER BY "letter" ASC
    LIMIT :limit OFFSET :offset
  `;

  const totalsQuery = `
    SELECT 
      'TOTALES' AS "letter",
      COUNT(CASE WHEN cat."Categoria" = 'Regular' THEN c."Id" END)::integer AS "regularCount",
      SUM(CASE WHEN cat."Categoria" = 'Regular' THEN c."Monto" ELSE 0 END)::float AS "regular",
      COUNT(CASE WHEN cat."Categoria" = 'Honorario' THEN c."Id" END)::integer AS "honoraryCount",
      SUM(CASE WHEN cat."Categoria" = 'Honorario' THEN c."Monto" ELSE 0 END)::float AS "honorary",
      COUNT(CASE WHEN cat."Categoria" = 'Protector' THEN c."Id" END)::integer AS "protectorCount",
      SUM(CASE WHEN cat."Categoria" = 'Protector' THEN c."Monto" ELSE 0 END)::float AS "protector",
      COUNT(CASE WHEN cat."Categoria" = 'Debito' THEN c."Id" END)::integer AS "debitCount",
      SUM(CASE WHEN cat."Categoria" = 'Debito' THEN c."Monto" ELSE 0 END)::float AS "debit"
    FROM "Cuotas" c
    INNER JOIN "socio" s ON c."IdSocio" = s."id"
    INNER JOIN "CategoriaSocio" cat ON s."IdCategoria" = cat."Id"
    ${whereClause}
  `;

  try {
    const [rows, totals] = await Promise.all([
      sequelize.query(query, { replacements, type: QueryTypes.SELECT }),
      sequelize.query(totalsQuery, { replacements, type: QueryTypes.SELECT })
    ]);

    return {
      rows: rows.length > 0 ? [...rows, totals[0]] : [],
      count: rows.length
    };
  } catch (error) {
    console.error("Error TypeTwo:", error);
    throw error;
  }
};


export const findExistingFees = async (month, year) => {
  try {
    const existingFees = await Fees.findAll({
      where: {
        month,
        year
      },
      attributes: ['idPartner'], // Solo traemos el ID del socio
      raw: true // Devuelve objetos planos de JS, no instancias de Sequelize
    });
    return existingFees;
  } catch (error) {
    console.error("Error en FeeRepository.findExistingFees:", error);
    throw error;
  }
};

export const getUnpaidFeesByPartner = async (idPartner, filters = {}) => {
  const { limit, offset, year, month, status = 'unpaid', date_of_paid } = filters;

  const monthsArray = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const whereConditions = { idPartner: idPartner };

  if (status === 'paid') whereConditions.paid = true;
  else if (status === 'unpaid') whereConditions.paid = false;

  if (year) whereConditions.year = year;

  if (month) {
    const monthIndex = monthsArray.indexOf(month);
    if (monthIndex !== -1) whereConditions.month = monthIndex + 1;
  }

  // --- SOLUCIÓN AL FORMATO DE FECHA ---
  if (date_of_paid) {
    // Creamos el inicio y fin del día para que la búsqueda sea inclusiva
    // Esto evita problemas si la base de datos tiene guardada la hora
    const startOfDay = `${date_of_paid} 00:00:00`;
    const endOfDay = `${date_of_paid} 23:59:59`;

    whereConditions.date_of_paid = {
      [Op.between]: [startOfDay, endOfDay]
    };
  }

  try {
    const { rows, count } = await Fees.findAndCountAll({
      where: whereConditions,
      include: [{
        model: Partner,
        as: 'Partner',
        where: { id: idPartner },
        attributes: ['id', 'name', 'surname', 'partnerNumber']
      }],
      distinct: true,
      limit: limit ? parseInt(limit) : undefined,
      offset: offset ? parseInt(offset) : undefined,
      order: [['year', 'DESC'], ['month', 'DESC']]
    });

    return {
      rows: rows.map(fee => ({
        feeid: fee.id,
        feeNumber: fee.month,
        amount: fee.amount,
        month: monthsArray[fee.month - 1] || "Mes inválido",
        year: fee.year,
        paid: fee.paid,
        idPartner: fee.Partner?.id,
        partnerNumber: fee.Partner?.partnerNumber,
        date_of_paid: fee.date_of_paid
      })),
      count: count
    };
  } catch (error) {
    console.error("Error en getUnpaidFeesByPartner Repository:", error);
    return { rows: [], count: 0 };
  }
};

export const searchGlobalUnpaidFees = async (filters = {}) => {
  const {
    limit, offset, year, month, status,
    partnerNumber, name, surname, date_of_paid // <-- Añadido
  } = filters;

  const monthsArray = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // --- FILTROS PARA LA TABLA FEES ---
  const feeConditions = {};

  if (status === 'paid') feeConditions.paid = true;
  else if (status === 'unpaid') feeConditions.paid = false;

  if (year) feeConditions.year = year;

  if (month) {
    const monthIndex = monthsArray.indexOf(month);
    if (monthIndex !== -1) {
      feeConditions.month = monthIndex + 1;
    }
  }

  // Lógica para Fecha de Pago (date_of_paid)
  if (date_of_paid) {
    // Definimos el rango desde las 00:00:00 hasta las 23:59:59
    feeConditions.date_of_paid = {
      [Op.between]: [`${date_of_paid} 00:00:00`, `${date_of_paid} 23:59:59`]
    };
  }

  // --- FILTROS PARA LA TABLA PARTNER ---
  const partnerConditions = {};
  if (partnerNumber) partnerConditions.partnerNumber = partnerNumber;
  if (name) partnerConditions.name = { [Op.like]: `%${name}%` };
  if (surname) partnerConditions.surname = { [Op.like]: `%${surname}%` };

  try {
    const { rows, count } = await Fees.findAndCountAll({
      where: feeConditions,
      include: [{
        model: Partner,
        as: 'Partner',
        where: Object.keys(partnerConditions).length > 0 ? partnerConditions : undefined,
        required: Object.keys(partnerConditions).length > 0,
        attributes: ['id', 'name', 'surname', 'partnerNumber']
      }],
      distinct: true,
      limit: limit,
      offset: offset,
      order: [['year', 'DESC'], ['month', 'DESC']]
    });

    return {
      rows: rows.map(fee => ({
        feeid: fee.id,
        feeNumber: fee.month,
        amount: fee.amount,
        month: monthsArray[fee.month - 1] || "Mes inválido",
        year: fee.year,
        paid: fee.paid,
        date_of_paid: fee.date_of_paid, // <-- Importante devolverlo
        Partner: fee.Partner ? {
          id: fee.Partner.id,
          name: fee.Partner.name,
          surname: fee.Partner.surname,
          partnerNumber: fee.Partner.partnerNumber
        } : null
      })),
      count: count
    };
  } catch (error) {
    console.error("Error en FeeRepository:", error);
    throw error;
  }
};

export const getQuantityPaidFees = async (partnerNumber) => {

  const parsedPartnerNumber = Number(partnerNumber);
  if (!partnerNumber || isNaN(parsedPartnerNumber)) return 0;
  const count = await Fees.count({
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: { partnerNumber: partnerNumber },
      },
    ],
    where: {
      paid: true,
      date_of_paid: { [Op.ne]: null }
    },
  });
  return count;
};

export const findOne = async ({ month, year }) => {
  return await Fees.findOne({
    where: { month, year }
  });
};
export const getById = async (id) => {
  return await Fees.findByPk(id);
};

export const create = async (fee) => {
  return await Fees.create(fee);
};

export const update = async (id, fee) => {
  const [rowsUpdated] = await Fees.update(fee, { where: { id } });
  if (rowsUpdated === 0) {
    return null;
  }
  return await Fees.findByPk(id);
};

export const bulkCreate = async (data) => {
  try {
    const newFees = await Fees.bulkCreate(data, {
      validate: true,
      returning: true
    });
    return newFees;
  } catch (error) {
    console.error("Error en FeeRepository.bulkCreate:", error);
    throw error;
  }
};