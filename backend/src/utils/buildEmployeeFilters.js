import { Op } from "sequelize";

export const buildEmployeeFilters = (query) => {
  const {
    code,
    limit,
    offset,
    sortBy,
    direction
  } = query;

  const whereEmployee = {};

  if (code) whereEmployee.code = code;

  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    whereEmployee,
    limit: parsedLimit,
    offset: parsedOffset,
    order
  };
};
