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
