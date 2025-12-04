import BookType from "../../models/options/BookType.js";

export const getAll = async () => {
    return await BookType.findAll();
};

export const getById = async (id) => {
    return await BookType.findByPk(id);
};

export const create = async (bookType) => {
    if (!bookType.typeName || bookType.typeName.trim() === "") {
        throw new Error("El campo Nombre de material de libro no puede estar vacío");
    }

     bookType.loanDays = Number(bookType.loanDays);

    if (
        typeof bookType.loanDays !== "number" ||
        isNaN(bookType.loanDays) ||
        bookType.loanDays <= 0
    ) {
        throw new Error("El campo días de préstamo deben ser un número mayor que 0");
    }

    return await BookType.create(bookType);
};

export const update = async (id, bookType) => {
    if (!bookType.typeName || bookType.typeName.trim() === "") {
        throw new Error("El campo Nombre de material de libro no puede estar vacío");
    }

    bookType.loanDays = Number(bookType.loanDays);

    if (
        typeof bookType.loanDays !== "number" ||
        isNaN(bookType.loanDays) ||
        bookType.loanDays <= 0
    ) {
        throw new Error("El campo días de préstamo deben ser un número mayor que 0");
    }

    const [rowsUpdated] = await BookType.update(bookType, { where: { bookTypeId: id } });
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
