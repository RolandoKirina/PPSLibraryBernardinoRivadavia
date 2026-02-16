import Fees from "../../models/fee/Fee.js";
import Partner from "../../models/partner/Partner.js";
import { Op } from "sequelize";

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
      surname: fee.Partner?.surname
    })),
    count
  };

};
export const getAllFeesTypeOne = async (filters = {}) => {
  const { wherePartner, whereFees, limit, offset } = filters;

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
    return { rows: [], count: 0 };
  }

  const fees = await Fees.findAll({
    where: { id: ids },
    include: baseInclude,
    order: [['id', 'ASC']]
  });

  const count = await Fees.count({
    where: whereFees && Object.keys(whereFees).length ? whereFees : undefined,
    include: baseInclude,
    distinct: true,
    col: 'Id'
  });

  const partnersMap = {};

  let totalFees = 0;
  let totalAmount = 0;

  fees.forEach(fee => {
    const partner = fee.Partner;
    if (!partner) return;

    if (!partnersMap[partner.id]) {
      partnersMap[partner.id] = {
        partnerNumber: partner.partnerNumber,
        surname: partner.surname || '',
        name: partner.name || '',
        amountFeesPerPartner: 0,
        amount: 0,
      };
    }

    partnersMap[partner.id].amountFeesPerPartner += 1;
    partnersMap[partner.id].amount += Number(fee.amount);
    totalFees += 1;
    totalAmount += Number(fee.amount);
  });

  return {
    rows: Object.values(partnersMap),
    count,
    others: {
      totalAmount,
      totalFees
    }
  };
};

export const getAllFeesTypeTwo = async (filters = {}) => {
  const { wherePartner, whereFees, limit, offset } = filters;

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
    order: [['id', 'ASC']]
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
      surname: fee.Partner?.surname
    })),
    count
  };
}



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
