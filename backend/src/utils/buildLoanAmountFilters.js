export const buildLoanAmountFilters = (query) => {
  const {
    limit,
    offset,
    sortBy,
    direction
  } = query;

  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;
  
  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    limit: parsedLimit,
    offset: parsedOffset,
    order
  };
};
