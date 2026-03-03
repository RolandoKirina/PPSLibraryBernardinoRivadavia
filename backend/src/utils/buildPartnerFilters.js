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
    retiredBooksMin,
    retiredBooksMax,
    minUnpaidFees,
    maxUnpaidFees,
    pendingBooks,
    limit,
    offset,
    sortBy,
    direction,
  } = query;


const sortFields = [
  
  { label: 'Apellido - Nombre', value: 'nameSurname' },
  { label: 'Cantidad de cuotas impagas', value: 'unpaidFees' },
  { label: 'Cantidad de libros pendientes', value: 'pendingBooks' },
  { label: 'Fecha de Baja', value: 'withdrawalDate' },
  { label: 'Fecha Inscripción', value: 'registrationDate' },
  { label: 'Fecha Nacimiento', value: 'birthDate' },
  { label: 'Motivo Baja', value: 'idReason' },
  { label: 'Número de Socio', value: 'partnerNumber' }
];

  
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
  
     if (reasonwithdrawal) {
      wherePartner.reasonForWithdrawal = reasonwithdrawal;
    }

    if (presentedBy) {
      wherePartner.presentedBy = presentedBy;
    }

    if(retiredBooksMin && retiredBooksMax){
    
    }
    else if(retiredBooksMin){

    } 
    else if (retiredBooksMax) {

    }
    
  
   
 if (minUnpaidFees || maxUnpaidFees) {
  wherePartner.unpaidFees = {};

  if (minUnpaidFees) {
    wherePartner.unpaidFees[Op.gte] = minUnpaidFees;
  }

  if (maxUnpaidFees) {
    wherePartner.unpaidFees[Op.lte] = maxUnpaidFees;
  }
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

  let order = [];

  if (sortBy && sortFields[sortBy]) {
    const directionValue = direction === 'ASC' ? 'ASC' : 'DESC';

    if (sortBy === 'nameSurname') {
      order.push(['surname', directionValue]);
      order.push(['name', directionValue]);
    } else {
      order.push([sortFields[sortBy], directionValue]);
    }
  }

  return {
    order,
    wherePartner,
    limit: Number.isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: Number.isNaN(parsedOffset) ? 0 : parsedOffset
  };
};
