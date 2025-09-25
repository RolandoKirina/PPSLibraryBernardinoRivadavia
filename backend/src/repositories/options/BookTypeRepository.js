import BookType from '../../models/options/BookType.js';

export const getAll = async () => {
    return await BookType.findAll();
};

export const getOne = async (id) => {
    return await BookType.findByPk(id);
};

export const create = async (bookType) => {
    return await BookType.create(bookType);
};


export const update = async (id, updates) => {
    await BookType.update(updates, {
        where: {
            id: id
        }
    });

    return await BookType.findByPk(id);
};

export const remove = async (id) => {
    return BookType.destroy({
        where: {
            id: id
        }
    });
};
