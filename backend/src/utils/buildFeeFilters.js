import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentStartDate,
    paymentEndDate,
    creationStartDate,
    creationEndDate,
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

  if ((paymentStartDate || paymentEndDate)) {
  
  const dateFilter = {};
    
  if (paymentStartDate) {
    dateFilter[Op.gte] = new Date(paymentStartDate + "T00:00:00");
  }

  if (paymentEndDate) {
    dateFilter[Op.lte] = new Date(paymentEndDate + "T23:59:59");
  }
  
  if (Object.keys(dateFilter).length > 0) {
    whereFees.date_of_paid = dateFilter;
  }
  }




  const conditions = [];

  if (creationStartDate && creationStartDate !== "undefined") {
    const [year, month] = creationStartDate.split("-").map(Number);
    conditions.push({
      [Op.or]: [
        { year: { [Op.gt]: year } },
        { [Op.and]: [{ year: year }, { month: { [Op.gte]: month } }] }
      ]
    });
  }

  if (creationEndDate && creationEndDate !== "undefined") {
    const [year, month] = creationEndDate.split("-").map(Number);
    conditions.push({
      [Op.or]: [
        { year: { [Op.lt]: year } },
        { [Op.and]: [{ year: year }, { month: { [Op.lte]: month } }] }
      ]
    });
  }

  // Si hay condiciones, las metemos en el objeto whereFees
  if (conditions.length > 0) {
    whereFees[Op.and] = conditions;
  }

  
  if (creationStartDate || creationEndDate) {
  const conditions = [];

  // 🔹 DESDE
  if (creationStartDate) {
    const [year, month] = creationStartDate.split("-").map(Number);

    conditions.push({
      [Op.or]: [
        { year: { [Op.gt]: year } },
        {
          [Op.and]: [
            { year: year },
            { month: { [Op.gte]: month } }
          ]
        }
      ]
    });
  }

  // 🔹 HASTA (ACÁ ESTABA EL BUG)
  if (creationEndDate) {
    const [year, month] = creationEndDate.split("-").map(Number);

    conditions.push({
      [Op.or]: [
        { year: { [Op.lt]: year } },
        {
          [Op.and]: [
            { year: year },
            { month: { [Op.lte]: month } }
          ]
        }
      ]
    });
  }

  console.log("CONDITIONS:", conditions);

  if (conditions.length > 0) {
    whereFees[Op.and] = conditions;
  }
}

  if (partnerNumber) {
    const parsed = Number(partnerNumber);
    if (!isNaN(parsed)) wherePartner.partnerNumber = parsed;
  }

  if (name?.trim()) wherePartner.name = { [Op.iLike]: `%${name.trim()}%` };
  if (surname?.trim()) wherePartner.surname = { [Op.iLike]: `%${surname.trim()}%` };




  console.log("creationStartDate RAW:", creationStartDate, typeof creationStartDate);
console.log("creationEndDate RAW:", creationEndDate, typeof creationEndDate);
  return {
    wherePartner,
    whereFees,
    limit: limit ? Number(limit) : 35,
    offset: offset ? Number(offset) : 0,
    order: sortBy ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']] : undefined
  };
};