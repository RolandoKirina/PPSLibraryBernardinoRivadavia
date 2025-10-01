import * as BookKeyRepository from "../../repositories/book/BookKeyRepository.js";

export const getAllBookKeys = async () => {
    let bookKeys = await BookKeyRepository.getAll();
    return bookKeys;
};

export const getBookKey = async (id) => {
    return await BookKeyRepository.getById(id);
};

export const createBookKey = async (bookKey) => {
    return await BookKeyRepository.create(bookKey);
};

export const updateBookKey = async (id, data) => {
    const updatedBookKey = await BookKeyRepository.update(id, data);
    if (!updatedBookKey) {
        throw new Error("BookKey not found or not updated");
    }
    return updatedBookKey;
};

export const deleteBookKey = async (id) => {
    const deletedBookKey = await BookKeyRepository.remove(id);
    if (!deletedBookKey) {
        throw new Error("BookKey not found or already deleted");
    }
    return deletedBookKey;
};
