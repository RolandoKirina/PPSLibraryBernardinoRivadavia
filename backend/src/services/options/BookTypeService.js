import * as BookTypeRepository from "../../repositories/options/BookTypeRepository.js";

export const getAllBookTypes = async (filters) => {
    const bookTypes = await BookTypeRepository.getAll(filters);
    return bookTypes;
};

export const getBookType = async (id) => {
    return await BookTypeRepository.getById(id);
};

export const createBookType = async (bookType) => {
    return await BookTypeRepository.create(bookType);
};

export const updateBookType = async (id, data) => {
    const updatedBookType = await BookTypeRepository.update(id, data);
    if (!updatedBookType) {
        throw new Error("BookType not found or not updated");
    }
    return updatedBookType;
};

export const deleteBookType = async (id) => {
    const deletedBookType = await BookTypeRepository.remove(id);
    if (!deletedBookType) {
        throw new Error("BookType not found or already deleted");
    }
    return deletedBookType;
};
