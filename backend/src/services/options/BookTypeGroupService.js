import * as BookTypeGroupRepository from '../../repositories/options/BookTypeGroupRepository.js';

export const getAllBookTypeGroups = async () => {
    return await BookTypeGroupRepository.getAll();
};

export const getBookTypeGroup = async (id) => {
    return await BookTypeGroupRepository.getOne(id);
};

export const createBookTypeGroup = async (data) => {
    return await BookTypeGroupRepository.create(data);
};

export const updateBookTypeGroup = async (id, updates) => {
    const existing = await BookTypeGroupRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroup not found");
    return await BookTypeGroupRepository.update(id, updates);
};

export const removeBookTypeGroup = async (id) => {
    const existing = await BookTypeGroupRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroup not found");
    return await BookTypeGroupRepository.remove(id);
};
