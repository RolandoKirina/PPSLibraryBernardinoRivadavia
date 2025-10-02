import BookType from "../../models/book/BookType.js";

export const getAll = async () => {
    return await BookType.findAll();
};

export const getById = async (id) => {
    return await BookType.findByPk(id);
};

export const create = async (bookType) => {
    return await BookType.create(bookType);
};

export const update = async (id, bookType) => {
    const [rowsUpdated] = await BookType.update(bookType, { where: { id } });
    if (rowsUpdated === 0) {
        return null;
    }
    return await BookType.findByPk(id);
};

export const remove = async (id) => {
    const bookType = await BookType.findByPk(id);

    if (!bookType) {
        return null;
    }

    await bookType.destroy();

    return {
        msg: "BookType deleted successfully",
        data: bookType
    };
};
