export const buildBookTypeFilters = (query) => {
    const {
        name,
        limit,
        offset,
        orderBy,
        orderDir
    } = query;

    const whereBookType = {};

    if (name) whereBookType.typeName = name;

    const parsedLimit = limit ? Number(limit) : undefined;
    const parsedOffset = offset ? Number(offset) : undefined;

    const order = orderBy
        ? [[orderBy, orderDir?.toUpperCase() === "DESC" ? "DESC" : "ASC"]]
        : undefined;

    return {
        whereBookType,
        limit: parsedLimit,
        offset: parsedOffset,
        order
    };
};
