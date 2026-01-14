import * as ReaderRepository from '../../repositories/reader/ReaderRepository.js';

export const getAllReaders = async (queryOptions) => {
    return await ReaderRepository.getAll(queryOptions);
};

export const getCount = async (queryOptions) => {
    return await ReaderRepository.getCount(queryOptions);
};

export const getReader = async (id) => {
    return await ReaderRepository.getOne(id);
};

export const createReader = async (data) => {
    return await ReaderRepository.create(data);
};

export const updateReader = async (id, updates) => {
    const existing = await ReaderRepository.getOne(id);
    if (!existing) throw new Error("Reader not found");
    return await ReaderRepository.update(id, updates);
};

export const removeReader = async (id) => {
    const existing = await ReaderRepository.getOne(id);
    if (!existing) throw new Error("Reader not found");
    return await ReaderRepository.remove(id);
};
