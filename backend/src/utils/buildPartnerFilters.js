export const buildPartnerFilters = (query) => {
  const {
    unpaidFees,
    idState,
    pendingBooks,
    limit,
    offset,
    sortBy,
    direction,
  } = query;

  const wherePartner = {};

  if (unpaidFees !== undefined) {
    wherePartner.unpaidFees = Number(unpaidFees);
  }

  if (idState && idState !== '0') {
    wherePartner.idState = Number(idState);
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
    reasonwithdrawal,
    presentedBy,
    cduCodeMin,
    cduCodeMax,
    quantityretiredbooksmin,
    quantityretiredbooksmax,
    borrowedBooksMin,
    borrowedBooksMax,
    unpaidQuotesMin,
    unpaidQuotesMax,
    pendingBooks,
    orderBy,
    limit,
    offset,
    sortBy,
    direction,
  } = query;

  const wherePartner = {};
  const whereBook = {};
  if (category !== undefined){
    wherePartner.category = Number(category);
  }

  if (idState && idState !== '0') {
    wherePartner.idState = Number(idState);
  }


  if (birthDateFrom && birthDateTo) {
  wherePartner.birthDate = {
      [Op.between]: [
        toStartOfDay(birthDateFrom),
        toEndOfDay(birthDateTo)
      ]
    };
  } else if (birthDateFrom) {
    where.birthDate = {
      [Op.gte]: toStartOfDay(birthDateFrom)
    };
  } else if (birthDateTo) {
    where.birthDate = {
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

    if(presentedBy){
      wherePartner.presentedBy = presentedBy;
    }

    if (reasonwithdrawal) {
      wherePartner.reasonForWithdrawal = reasonwithdrawal;
    }

    if (unpaidFees !== 0) {
      wherePartner.unpaidFees = Number(unpaidFees);
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

  if (quantityretiredbooksmin || quantityretiredbooksmax) {
    whereBook.cduCode = {};

    if (cduCodeMin) {
      whereBook.cduCode[Op.gte] = cduCodeMin;
    }

    if (cduCodeMax) {
      whereBook.cduCode[Op.lte] = cduCodeMax;
    }
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
