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
    memberName,
    onlyActiveMembers,
    bookTitle,
    bookCode,
    limit,
    offset,
    sortBy,
    direction
  } = query;

  const where = {};

  if (type && type !== 'all') where.type = type;
  if (state && state !== 'all') where.state = state;

  if (materialType === 'specific' && selectedMaterial) {
    where.materialType = selectedMaterial;
  }

  if (startDate) where.loanDate = { [Op.gte]: new Date(startDate) };
  if (endDate) {
    where.loanDate = {
      ...(where.loanDate || {}),
      [Op.lte]: new Date(endDate)
    };
  }

  if (returnStartDate) where.returnDate = { [Op.gte]: new Date(returnStartDate) };
  if (returnEndDate) {
    where.returnDate = {
      ...(where.returnDate || {}),
      [Op.lte]: new Date(returnEndDate)
    };
  }

  if (memberName) where.memberName = { [Op.iLike]: `%${memberName}%` };
  if (onlyActiveMembers === 'true') where.memberActive = true;

  if (bookTitle) where.bookTitle = { [Op.iLike]: `%${bookTitle}%` };
  if (bookCode) where.bookCode = bookCode;

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : [['loanDate', 'DESC']];

  return {
    where,
    order,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};
