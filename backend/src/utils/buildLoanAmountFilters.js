export const buildLoanAmountFilters = (query) => {
  const {
    limit,
    offset,
    orderBy,
    orderDir
  } = query;

  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;

  const order = orderBy
    ? [[orderBy, orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"]]
    : undefined;

  return {
    limit: parsedLimit,
    offset: parsedOffset,
    order
  };
};
