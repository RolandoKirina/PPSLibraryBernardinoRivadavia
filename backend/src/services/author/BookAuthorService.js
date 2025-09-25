import * as BookAuthorRepository from '../../repositories/author/BookAuthorRepository.js';

export const getAllBookAuthors = async () => {
    return await BookAuthorRepository.getAll();
};

export const getBookAuthor = async (id) => {
    return await BookAuthorRepository.getOne(id);
};

export const createBookAuthor = async (bookAuthor) => {
    return await BookAuthorRepository.create(bookAuthor);
};

export const updateBookAuthor = async (id, updates) => {
    const existingBookAuthor = await BookAuthorRepository.getOne(id);

    if (!existingBookAuthor) throw new Error("BookAuthor not found");

    return await BookAuthorRepository.update(id, updates);
};

export const removeBookAuthor = async (id) => {
    const existingBookAuthor = await BookAuthorRepository.getOne(id);

    if (!existingBookAuthor) throw new Error("BookAuthor not found");

    return await BookAuthorRepository.remove(id);
};
