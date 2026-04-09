import Fees from "../../models/fee/Fee.js";
import Partner from "../../models/partner/Partner.js";
import { Op } from "sequelize";
import { fn, col } from 'sequelize';
import { QueryTypes } from "sequelize";
import sequelize from "../../configs/database.js";

export const getAll = async (filters = {}, listType = '') => {
  const { wherePartner, whereFees, limit, offset, order } = filters;

  if (listType === 'TypeOneFees') {
    return getAllFeesTypeOne(filters);
  }
  else if (listType == 'TypeTwoFees') {
    return getAllFeesTypeTwo(filters);
  }

  const baseInclude = [
    {
      model: Partner,
      as: "Partner",
      required: true,
      where: wherePartner && Object.keys(wherePartner).length ? wherePartner : undefined
    }
  ];

  const idsResult = await Fees.findAll({
    attributes: ['id'],
    where: whereFees && Object.keys(whereFees).length ? whereFees : undefined,
    include: [
      {
        ...baseInclude[0],
        attributes: []
      }
    ],
    limit,
    offset,
    subQuery: false,
    raw: true
  });

  const ids = idsResult.map(r => r.id);

  if (!ids.length) {
    return { items: [], count: 0 };
  }

  const fees = await Fees.findAll({
    where: { id: ids },
    include: baseInclude,
    order
  });

  const count = await Fees.count({
    where: whereFees && Object.keys(whereFees).length ? whereFees : undefined,
    include: baseInclude,
    distinct: true,
    col: 'Id'
  });

  return {
    rows: fees.map(fee => ({
      feeid: fee.id,
      month: fee.month,
      year: fee.year,
      amount: fee.amount,
      observation: fee.observation,
      paid: fee.paid,
      paidLabel: fee.paid ? "Pagada" : "Impaga",
      date_of_paid: fee.date_of_paid
        ? fee.date_of_paid.toISOString().substring(0, 10)
        : "",
      partnerNumber: fee.Partner?.partnerNumber,
      name: fee.Partner ? `${fee.Partner.name} ${fee.Partner.surname}` : "",
      surname: fee.Partner?.surname,
      status: fee.status,
      statusLabel: fee.status ? "Vigente" : "Anulada"
    })),
    count
  };

};

export const getAllFeesTypeOne = async (filters = {}) => {
  const { limit, offset } = filters;
  const beforeDate = filters.whereFees?.beforeDate;
  const afterDate = filters.whereFees?.afterDate;

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

  // 1. Query Principal (Lista de socios)
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

  // 2. Query de Totales (Pie de página)
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

    // 3. INYECCIÓN DE LA FILA DE TOTALES
    // Creamos una fila extra que coincida con los accessors de tu tabla
    if (rows.length > 0) {
      rows.push({
        partnerNumber: 'TOTALES', // Texto en la columna del número
        surname: '-',             // Guion en el apellido
        name: '-',                // Guion en el nombre
        amountFeesPerPartner: totals?.totalFees || 0,
        amount: totals?.totalAmount || 0
      });
    }

    return {
      rows,
      count: rows.length > 0 ? rows.length - 1 : 0, // Restamos la fila de totales del contador
      others: {
        totalAmount: totals?.totalAmount || 0,
        totalFees: totals?.totalFees || 0
      }
    };
  } catch (error) {
    console.error("Error en Query Nativa Postgres:", error);
    throw error;
  }
};

export const getAllFeesTypeTwo = async (filters = {}) => {
  const { limit, offset } = filters;
  const beforeDate = filters.whereFees?.beforeDate;
  const afterDate = filters.whereFees?.afterDate;

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

  const categoryTotalsQuery = `
    SELECT 
      'TOTALES' AS "letter", -- Esto hará que aparezca debajo de la Z
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
    const [rows, catTotals] = await Promise.all([
      sequelize.query(query, { replacements, type: QueryTypes.SELECT }),
      sequelize.query(categoryTotalsQuery, { replacements, type: QueryTypes.SELECT })
    ]);

    const finalRows = rows.length > 0 ? [...rows, catTotals[0]] : [];

    return {
      rows: finalRows,
      count: rows.length
    };
  } catch (error) {
    console.error("Error en Reporte Tipo Dos:", error);
    throw error;
  }
};



export const getUnpaidFeesByPartner = async (idPartner, filters = {}) => {
  const { limit, offset } = filters;

  const { rows, count } = await Fees.findAndCountAll({
    where: {
      idPartner,
      paid: false
    },
    include: [
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'name', 'surname', 'partnerNumber']
      }
    ],
    limit,
    offset,
    order: [['id', 'ASC']]
  });

  return {
    rows: rows.map(fee => ({
      id: fee.id,
      partnerNumber: fee.Partner?.partnerNumber ?? '—',
      name: fee.Partner
        ? `${fee.Partner.name} ${fee.Partner.surname}`
        : '—',
      month: fee.month,
      year: fee.year,
      amount: fee.amount,
      date_of_paid: fee.date_of_paid
    })),
    count
  };
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

export const findOne = async ({ idPartner,month, year }) => {
  return await Fees.findOne({
    where: { idPartner, month, year }
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
