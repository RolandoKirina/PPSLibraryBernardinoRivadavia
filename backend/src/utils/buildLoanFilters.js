import { Op } from "sequelize";

export const buildLoanFilters = (query) => {
  const {
    type,
    state,
    materialType,
    selectedMaterial,
    startDate,
    endDate,
    returnStartDate,
    returnEndDate,
    partnerName,
    partnerSurname,
    partnerNumber,
    onlyActiveMembers,
    bookTitle,
    bookCode,
    limit,
    offset,
    sortBy,
    direction,
    employeeCode
  } = query;

  // Filtros principales
  const whereLoan = {}; //por fecha de retiro
  const whereLoanType = {}; //por tipo de prestamos
  const whereLoanBook = {}; //por estado de prestamo (si returnedDate existe, fue devuelto, si no es actual)
  const whereBookType = {}; //por tipo de material retirado (typeName, vinculado a book)
  const wherePartner = {}; //por partnerName
  const whereBook = {};  //por titulo y codigo
  const whereEmployee = {};

  if (type && type !== 'all') whereLoanType.description = type;
  if (state && state !== 'all') {
    if (state === 'returned') {
      // préstamos devueltos
      whereLoanBook.returnedDate = { [Op.ne]: null };
    } else if (state === 'current') {
      // préstamos activos (sin devolver)
      whereLoanBook.returnedDate = { [Op.is]: null };
    }
  }

  if (materialType === 'specific' && selectedMaterial) {
    whereBookType.typeName = selectedMaterial;
  }

  const normalizeDate = (date) => new Date(date).toISOString().split('T')[0];

  if (startDate) {
    whereLoan.retiredDate = {
      [Op.gte]: normalizeDate(startDate)
    };
  }

  if (endDate) {
    whereLoan.retiredDate = {
      ...(whereLoan.retiredDate || {}),
      [Op.lte]: normalizeDate(endDate)
    };
  }

  if (returnStartDate) {
    whereLoanBook.returnedDate = {
      [Op.gte]: normalizeDate(returnStartDate)
    };
  }

  if (returnEndDate) {
    whereLoanBook.returnedDate = {
      ...(whereLoanBook.returnedDate || {}),
      [Op.lte]: normalizeDate(returnEndDate)
    };
  }

  if (partnerName && partnerName.trim() !== '') {
    wherePartner.name = { [Op.iLike]: `%${partnerName.trim()}%` };
  }

  if (partnerSurname && partnerSurname.trim() !== '') {
    wherePartner.surname = { [Op.iLike]: `%${partnerSurname.trim()}%` };
  }

  if (partnerNumber && partnerNumber.toString().trim() !== '') {
    wherePartner.partnerNumber = Number(partnerNumber);
  }

  if (onlyActiveMembers === 'true') {
    wherePartner.isActive = 1;
  } else if (onlyActiveMembers === 'false') {
    wherePartner.isActive = 2;
  }

  if (bookTitle) whereBook.title = { [Op.iLike]: `%${bookTitle}%` };

  if (bookCode && bookCode.trim() !== '') {
    const cleanCode = bookCode.trim();
    whereBook.codeInventory = {
      [Op.iLike]: `%${cleanCode}`
    };
  }

  if (employeeCode !== undefined && employeeCode !== null && employeeCode !== "") {
    whereEmployee.code = employeeCode;
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  let order = [['id', 'DESC']]; // Orden por defecto (id de Loan)

  if (sortBy) {
    const dir = direction === 'asc' ? 'ASC' : 'DESC';

    switch (sortBy) {
      case 'partnerNumber':
        // Orden por tabla asociada Partner
        order = [['Partner', 'partnerNumber', dir]];
        break;
      case 'loanId':
        order = [['id', dir]];
        break;
      case 'retiredDate':
        order = [['retiredDate', dir]];
        break;
      default:
        order = [[sortBy, dir]];
    }
  }

  return {
    whereLoan,
    whereLoanType,
    whereLoanBook,
    whereBookType,
    wherePartner,
    whereBook,
    whereEmployee,
    order,
    limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };

};


export const buildReturnFilters = (query) => {
  const {
    partnerNumber,
    partnerName,
    partnerSurname,
    memo,
    limit,
    offset,
    sortBy,
    direction
  } = query;

  const wherePartner = {};

  if (partnerName?.trim()) {
    wherePartner.name = { [Op.iLike]: `%${partnerName.trim()}%` };
  }

  if (partnerSurname?.trim()) {
    wherePartner.surname = { [Op.iLike]: `%${partnerSurname.trim()}%` };
  }

  if (partnerNumber) {
    wherePartner.partnerNumber = partnerNumber; // o usar Op.iLike si es string
  }

  if (memo?.trim()) {
    wherePartner.memo = { [Op.iLike]: `%${memo.trim()}%` };
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    wherePartner,
    order,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};
