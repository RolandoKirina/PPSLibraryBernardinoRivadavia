import * as ReaderBookRepository from '../../repositories/reader/ReaderBookRepository.js';

export const getAllReaderBooks = async () => {
    return await ReaderBookRepository.getAll();
};

export const getReaderBook = async (id) => {
    return await ReaderBookRepository.getOne(id);
};

export const verifyIfBookIsNotRepeated = async (id) => {
    return await ReaderBookRepository.verifyIfBookIsNotRepeated(id);
};

export const createReaderBook = async (data) => {
    return await ReaderBookRepository.create(data);
};

export const updateReaderBook = async (id, updates) => {
    const existing = await ReaderBookRepository.getOne(id);
    if (!existing) throw new Error("ReaderBook not found");
    return await ReaderBookRepository.update(id, updates);
};

export const removeReaderBook = async (id) => {
    const existing = await ReaderBookRepository.getOne(id);
    if (!existing) throw new Error("ReaderBook not found");
    return await ReaderBookRepository.remove(id);
};
