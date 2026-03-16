import { Op } from 'sequelize';

export const buildPartnerFilters = (query) => {
  const {
    unpaidFees,
    partnerNumber,
    surname,
    name,
    idState,
    pendingBooks,
    limit,
    offset,
    sortBy,
    direction,
  } = query;

  const wherePartner = {};

  if (partnerNumber) {
    wherePartner.partnerNumber = Number(partnerNumber);
  }

  if (surname) {
    wherePartner.surname = { [Op.like]: `%${surname}%` };
  }

  if (name) {
    wherePartner.name = { [Op.like]: `%${name}%` };
  }

  if (unpaidFees !== undefined) {
    wherePartner.unpaidFees = Number(unpaidFees);
  }

  if (idState && idState !== '0') {
    wherePartner.isActive = Number(idState);
  }

  if (pendingBooks !== undefined) {
    wherePartner.pendingBooks = Number(pendingBooks);
  }

  const parsedLimit = Number(limit);
  const parsedOffset = Number(offset);

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    order,
    wherePartner,
    limit: Number.isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: Number.isNaN(parsedOffset) ? 0 : parsedOffset
  };
};

export const buildListPartnerFilters = (query) => {
  const {
    category,
    idState,
    birthDateFrom,
    birthDateTo,
    registrationStart,
    registrationEnd,
    resignationStart,
    resignationEnd,
    removeReason,
    presentedBy,
    cduCodeMin,
    cduCodeMax,
    unpaidQuotesMin,
    unpaidQuotesMax,
    quantityretiredbooksmin,
    quantityretiredbooksmax,

    pendingBooks,
    limit,
    offset,
    sortBy,
    direction,
  } = query;

  const mapNameisActive = (idState) => {
    if (idState === 1) return 1;
    if (idState === 2) return 0;
    return null;
  };
  const isActive = mapNameisActive(idState)


  const allowedSortFields = {
    surname: 'surname',
    name: 'name',
    unpaidFees: 'unpaidFees',
    pendingBooks: 'pendingBooks',
    withdrawalDate: 'withdrawalDate',
    registrationDate: 'registrationDate',
    birthDate: 'birthDate',
    idReason: 'idReason',
    partnerNumber: 'partnerNumber'
  };

  const wherePartner = {};
  const whereBook = {};

  if (category !== undefined) {
    wherePartner.idCategory = Number(category);
  }

  if (isActive !== null) {
    wherePartner.isActive = isActive;
  }

  if (birthDateFrom && birthDateTo) {
    wherePartner.birthDate = {
      [Op.between]: [
        toStartOfDay(birthDateFrom),
        toEndOfDay(birthDateTo)
      ]
    };
  } else if (birthDateFrom) {
    wherePartner.birthDate = {
      [Op.gte]: toStartOfDay(birthDateFrom)
    };
  } else if (birthDateTo) {
    wherePartner.birthDate = {
      [Op.lte]: toEndOfDay(birthDateTo)
    };
  }

  if (registrationStart && registrationEnd) {
    wherePartner.registrationDate = {
      [Op.between]: [
        toStartOfDay(registrationStart),
        toEndOfDay(registrationEnd)
      ]
    };
  }
  else if (registrationStart) {
    wherePartner.registrationDate = {
      [Op.gte]: toStartOfDay(registrationStart)
    };
  }
  else if (registrationEnd) {
    wherePartner.registrationDate = {
      [Op.lte]: toEndOfDay(registrationEnd)
    };
  }

  if (resignationStart && resignationEnd) {
    wherePartner.withdrawalDate = {
      [Op.between]: [
        toStartOfDay(resignationStart),
        toEndOfDay(resignationEnd)
      ]
    };
  }
  else if (resignationStart) {
    wherePartner.withdrawalDate = {
      [Op.gte]: toStartOfDay(resignationStart)
    };
  }
  else if (resignationEnd) {
    wherePartner.withdrawalDate = {
      [Op.lte]: toEndOfDay(resignationEnd)
    };
  }
  if (removeReason) {
    wherePartner.idReason = Number(removeReason);
  }
  if (presentedBy) {
    wherePartner.presentedBy = presentedBy;
  }
  if (cduCodeMin || cduCodeMax) {
    whereBook.cduCode = {};

    if (cduCodeMin) {
      whereBook.cduCode[Op.gte] = cduCodeMin;
    }

    if (cduCodeMax) {
      whereBook.cduCode[Op.lte] = cduCodeMax;
    }
  }

  if (unpaidQuotesMin || unpaidQuotesMax) {
    wherePartner.unpaidFees = {};

    if (unpaidQuotesMin) {
      wherePartner.unpaidFees[Op.gte] = unpaidQuotesMin;
    }

    if (unpaidQuotesMax) {
      wherePartner.unpaidFees[Op.lte] = unpaidQuotesMax;
    }
  }

  /*if (quantityretiredbooksmin || quantityretiredbooksmax) {
    whereBook.cduCode = {};

    if (cduCodeMin) {
      whereBook.cduCode[Op.gte] = cduCodeMin;
    }

    if (cduCodeMax) {
      whereBook.cduCode[Op.lte] = cduCodeMax;
    }
  }*/
  if (pendingBooks !== undefined) {
    wherePartner.pendingBooks = Number(pendingBooks);
  }

  const parsedLimit = Number(limit);
  const parsedOffset = Number(offset);

  let order = [];
  if (sortBy) {

    const directionValue = direction === 'ASC' ? 'ASC' : 'DESC';

    const fields = sortBy.split(",");

    fields.forEach(field => {
      if (allowedSortFields[field]) {
        order.push([allowedSortFields[field], directionValue]);
      }
    });

  }
  return {
    order,
    wherePartner,
    whereBook,
    limit: Number.isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: Number.isNaN(parsedOffset) ? 0 : parsedOffset
  };
};
