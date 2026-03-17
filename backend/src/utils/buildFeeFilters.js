import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentdate,
    status,
    beforeDate,
    afterDate,
    limit,
    offset,
    sortBy,
    direction,
    feeStatus
  } = query;

  const whereFees = {};
  const wherePartner = {};

  if (status === "unpaid") {
    whereFees.paid = false;
  } else if (status === "paid") {
    whereFees.paid = true;
  }

  if (feeStatus === "inactive") {
    whereFees.status = false;
  } else if (status === "active") {
    whereFees.status = true;
  }

  if (paymentdate) {
    whereFees.date_of_paid = {
      [Op.gte]: new Date(`${paymentdate}T00:00:00Z`),
      [Op.lte]: new Date(`${paymentdate}T23:59:59Z`)
    };
  }

  if (beforeDate || afterDate) {
    whereFees.beforeDate = beforeDate || null;
    whereFees.afterDate = afterDate || null;
  }

  // 4. Filtros de Socio
  if (partnerNumber) {
    const parsed = Number(partnerNumber);
    if (!isNaN(parsed)) wherePartner.partnerNumber = parsed;
  }

  if (name?.trim()) wherePartner.name = { [Op.iLike]: `%${name.trim()}%` };
  if (surname?.trim()) wherePartner.surname = { [Op.iLike]: `%${surname.trim()}%` };

  return {
    wherePartner,
    whereFees,
    limit: limit ? Number(limit) : 35,
    offset: offset ? Number(offset) : 0,
    order: sortBy ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']] : undefined
  };
};