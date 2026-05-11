import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    idState,
    observation,
    registrationDate,
    paymentStartDate,
    paymentEndDate,
    paymentDate,
    periodStartDate,
    periodEndDate,
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

  if (registrationDate) {
    wherePartner.registrationDate = registrationDate;
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


  if (paymentDate) {
    whereFees.date_of_paid = {
      [Op.gte]: new Date(`${paymentDate}T00:00:00Z`),
      [Op.lte]: new Date(`${paymentDate}T23:59:59Z`)
    };
  }

  if (periodStartDate || periodEndDate) {
    const periodFilter = {};

    if (periodStartDate) {
      periodFilter[Op.gte] = new Date(`${periodStartDate}-01T00:00:00Z`);
    }

    if (periodEndDate) {
      const end = new Date(`${periodEndDate}-01T00:00:00Z`);
      end.setUTCMonth(end.getUTCMonth() + 1);
      end.setUTCDate(0);
      end.setUTCHours(23, 59, 59, 999);
      periodFilter[Op.lte] = end;
    }

    whereFees.periodDate = periodFilter;
  }

  if (creationStartDate || creationEndDate) {
    const creationFilter = {};

    if (creationStartDate) {
      creationFilter[Op.gte] = new Date(`${creationStartDate}-01T00:00:00Z`);
    }

    if (creationEndDate) {
      const end = new Date(`${creationEndDate}-01T00:00:00Z`);
      end.setUTCMonth(end.getUTCMonth() + 1);
      end.setUTCDate(0);
      end.setUTCHours(23, 59, 59, 999);
      creationFilter[Op.lte] = end;
    }

    whereFees.createdAt = creationFilter;
  }

  if (partnerNumber) {
    const parsed = Number(partnerNumber);
    if (!isNaN(parsed)) wherePartner.partnerNumber = parsed;
  }

  if (name?.trim()) wherePartner.name = { [Op.iLike]: `%${name.trim()}%` };
  if (surname?.trim()) wherePartner.surname = { [Op.iLike]: `%${surname.trim()}%` };

  if (observation?.trim()) whereFees.observation = { [Op.iLike]: `%${observation.trim()}%` };

  if (idState != null && Number(idState) != 0) {
    wherePartner.isActive = Number(idState);
  }

  // Lógica de ordenamiento mejorada
  let order = [['id', 'DESC']]; // Orden por defecto: las cuotas más nuevas arriba

  if (sortBy) {
    const dir = direction === 'asc' ? 'ASC' : 'DESC';

    switch (sortBy) {
      case 'partnerNumber':
        // IMPORTANTE: ['AliasDelModelo', 'campo', 'dirección']
        order = [['Partner', 'partnerNumber', dir]];
        break;
      case 'recent':
        // Ordenamos por el ID de la cuota (la última generada)
        order = [['id', dir]];
        break;
      case 'period':
        // Si quisieras ordenar por el periodo de la cuota (Año/Mes)
        order = [['year', dir], ['month', dir]];
        break;
      default:
        // Para cualquier otro campo que pertenezca directamente a Fees (amount, paid, etc)
        order = [[sortBy, dir]];
    }
  }

  return {
    wherePartner,
    whereFees,
    limit: limit ? Number(limit) : 35,
    offset: offset ? Number(offset) : 0,
    order
  };
};