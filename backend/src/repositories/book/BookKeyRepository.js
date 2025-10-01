import BookKey from "../../models/book/BookKey.js";

export const getAll = async () => {
    return await BookKey.findAll();
};

export const getById = async (id) => {
    return await BookKey.findByPk(id);
};

export const create = async (bookKey) => {
    return await BookKey.create(bookKey);
};

export const update = async (id, bookKey) => {
    const [rowsUpdated] = await BookKey.update(bookKey, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await BookKey.findByPk(id);
};

export const remove = async (id) => {
    const bookKey = await BookKey.findByPk(id);

    if (!bookKey) {
        return null;
    }

    await bookKey.destroy();

    return {
        msg: "BookKey deleted successfully",
        data: bookKey
    };
};
