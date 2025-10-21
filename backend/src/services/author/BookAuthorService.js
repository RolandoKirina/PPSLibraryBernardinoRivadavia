import * as BookAuthorRepository from '../../repositories/author/BookAuthorRepository.js';

export const getAllBookAuthors = async () => {
    return await BookAuthorRepository.getAll();
};

export const getBookAuthorById = async (id) => {
    return await BookAuthorRepository.getOne(id);
};

export const bookAuthorAlreadyExists = async (authorCode, bookId) => {
    return await BookAuthorRepository.alreadyExists(authorCode, bookId);
};

export const createBookAuthor = async (bookAuthor) => {
    return await BookAuthorRepository.create(bookAuthor);
};

export const updateBookAuthor = async (id, updates) => {
    const existingBookAuthor = await BookAuthorRepository.getOne(id);

    if (!existingBookAuthor) throw new Error("BookAuthor not found");

    return await BookAuthorRepository.update(id, updates);
};

export const removeBookAuthorById = async (id) => {
    const existingBookAuthor = await BookAuthorRepository.getOne(id);

    if (!existingBookAuthor) throw new Error("BookAuthor not found");

    return await BookAuthorRepository.remove(id);
};



export const removeBooksOfAuthor= async (id) => {
    return await BookAuthorRepository.removeAllOfAuthor(id);
};
