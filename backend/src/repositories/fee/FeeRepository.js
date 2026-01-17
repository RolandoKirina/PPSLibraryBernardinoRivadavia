import Fees from "../../models/fee/Fee.js";
import Partner from "../../models/partner/Partner.js";
import { Op } from "sequelize";

export const getAll = async (filters) => {
  const { wherePartner, whereFees, limit, offset } = filters;

  const idsResult = await Fees.findAll({
    attributes: ['id'],
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: wherePartner,
        attributes: []
      }
    ],
    where: whereFees,
    limit,
    offset,
    subQuery: false,
    raw: true
  });

  const ids = idsResult.map(r => r.id);

  if (!ids.length) return [];

  const fees = await Fees.findAll({
    where: {
      id: ids
    },
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: wherePartner
      }
    ],
    order: [['id', 'ASC']]
  });

  return fees.map(fee => ({
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
  }));
};

export const getCount = async (filters) => {
  const { wherePartner, whereFees } = filters;

  const total = await Fees.count({
    where: whereFees,
    include: [
      {
        model: Partner,
        as: "Partner",
        required: true,
        where: Object.keys(wherePartner).length ? wherePartner : undefined
      }
    ]
  });

  return total;
};



export const getUnpaidFeesByPartner = async (idPartner) => {
  const fees = await Fees.findAll({
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
    ]
  });

  return fees.map(fee => ({
    id: fee.id,
    partnerNumber: fee.Partner?.partnerNumber ?? '—',
    name: fee.Partner
      ? `${fee.Partner.name} ${fee.Partner.surname}` : '—',
    month: fee.month,
    year: fee.year,
    amount: fee.amount,

    date_of_paid: fee.date_of_paid

  }));
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

export const remove = async (id) => {
  const fee = await Fees.findByPk(id);

  if (!fee) {
    return null;
  }
  await fee.destroy();

  return {
    msg: "Fee deleted successfully",
    data: fee
  };
};
