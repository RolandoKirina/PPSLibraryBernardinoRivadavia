import * as AuthorsRepository from '../../repositories/author/AuthorsRepository.js';

export const getAllAuthors = async () => {
    return await AuthorsRepository.getAll();
};

export const getAllAuthorsByName = async (name) => {
    return await AuthorsRepository.getAllByName(name);
};

export const getAuthor = async (id) => {
    return await AuthorsRepository.getOne(id);
};

export const createAuthor = async (author) => {
    return await AuthorsRepository.create(author);
};

export const updateAuthor = async (id, updates) => {
    const existingAuthor = await AuthorsRepository.getOne(id);

    if (!existingAuthor) throw new Error("Author not found");

    return await AuthorsRepository.update(id, updates);
};

export const removeAuthor = async (id) => {
    const existingAuthor = await AuthorsRepository.getOne(id);

    if (!existingAuthor) throw new Error("Author not found");

    return await AuthorsRepository.remove(id);
};
