import BookAuthor from '../../models/author/BookAuthor.js';

export const getAll = async () => {
    return await BookAuthor.findAll();
};

export const getOne = async (id) => {
    return await BookAuthor.findByPk(id);
};

export const alreadyExists = async (authorCode, bookId) => {
    const existingBookAuthor = await BookAuthor.findAll({
        where: {
            BookId: bookId,
            authorCode: authorCode
        },
        limit: 1
    });

    return existingBookAuthor[0];
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

export const remove = async (id) =>{
    const bookAuthor = await BookAuthor.findByPk(id);

      if (!bookAuthor) {
        return null;
      }
    await bookAuthor.destroy();
  
    return {
        msg: "BookAuthor deleted successfully",
        data: bookAuthor
    }
}

