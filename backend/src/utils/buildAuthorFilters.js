import { Op } from "sequelize";

export const buildAuthorFilters = (query) => {
    const {
        authorName,
        limit,
        offset,
        sortBy,
        direction,
    } = query;

    const whereAuthor = {};


    if (authorName) whereAuthor.name = { [Op.iLike]: `%${authorName}%` };



    const parsedLimit = parseInt(limit);
    const parsedOffset = parseInt(offset);

    const order = sortBy
        ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
        : undefined;

    return {
    whereAuthor,
    order,
    limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };

}