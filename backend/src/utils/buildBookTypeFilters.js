export const buildBookTypeFilters = (query) => {
    const {
        name,
        limit,
        offset,
        sortBy,
        direction
    } = query;

    const whereBookType = {};

    if (name) whereBookType.typeName = name;

    const parsedLimit = limit ? Number(limit) : undefined;
    const parsedOffset = offset ? Number(offset) : undefined;

    const order = sortBy
        ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
        : undefined;

    return {
        whereBookType,
        limit: parsedLimit,
        offset: parsedOffset,
        order
    };
};
