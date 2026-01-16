import { Op } from "sequelize";

export const buildEmployeeFilters = (query) => {
  const {
    code,
    limit,
    offset,
    orderBy,
    orderDir
  } = query;

  const whereEmployee = {};

  if (code) whereEmployee.code = code;

  const parsedLimit = limit ? Number(limit) : undefined;
  const parsedOffset = offset ? Number(offset) : undefined;

  const order = orderBy
    ? [[orderBy, orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"]]
    : undefined;

  return {
    whereEmployee,
    limit: parsedLimit,
    offset: parsedOffset,
    order
  };
};
