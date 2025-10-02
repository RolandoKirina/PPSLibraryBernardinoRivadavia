import * as ReaderRepository from '../../repositories/partner/ReaderRepository.js';

export const getAllReaders = async () => {
    return await ReaderRepository.getAll();
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
