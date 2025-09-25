import * as BookTypeGroupListRepository from '../../repositories/options/BookTypeGroupListRepository.js';

export const getAllBookTypeGroupLists = async () => {
    return await BookTypeGroupListRepository.getAll();
};

export const getBookTypeGroupList = async (id) => {
    return await BookTypeGroupListRepository.getOne(id);
};

export const createBookTypeGroupList = async (data) => {
    return await BookTypeGroupListRepository.create(data);
};

export const updateBookTypeGroupList = async (id, updates) => {
    const existing = await BookTypeGroupListRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroupList not found");
    return await BookTypeGroupListRepository.update(id, updates);
};

export const removeBookTypeGroupList = async (id) => {
    const existing = await BookTypeGroupListRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroupList not found");
    return await BookTypeGroupListRepository.remove(id);
};
