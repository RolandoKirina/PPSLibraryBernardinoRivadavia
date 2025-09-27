import BookAuthor from '../../models/author/BookAuthor.js';

export const getAll = async () => {
    return await BookAuthor.findAll();
};

export const getOne = async (id) => {
    return await BookAuthor.findByPk(id);
};

export const create = async (bookAuthor) => {
    return await BookAuthor.create(bookAuthor);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await BookAuthor.update(updates, {
        where: { id: id }
    });

    return await BookAuthor.findByPk(id);
};

export const remove = async (id) => {
    return await BookAuthor.destroy({
        where: { id: id }
    });
};
