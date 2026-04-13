import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentStartDate,
    paymentEndDate,
    status,
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
  } else if (feeStatus === "active") {
    whereFees.status = true;
  }

  if (paymentStartDate || paymentEndDate) {
    const dateFilter = {};
    
    if (paymentStartDate) {
      dateFilter[Op.gte] = new Date(`${paymentStartDate}T00:00:00Z`);
    }
    
    if (paymentEndDate) {
      dateFilter[Op.lte] = new Date(`${paymentEndDate}T23:59:59Z`);
    }
    
    whereFees.date_of_paid = dateFilter;
  }

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