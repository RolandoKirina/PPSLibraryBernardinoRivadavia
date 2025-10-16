import * as BookTypeGroupRepository from '../../repositories/options/BookTypeGroupRepository.js';

export const getAllBookTypeGroups = async () => {
    return await BookTypeGroupRepository.getAll();
};

export const getBookTypeGroup = async (id) => {
    return await BookTypeGroupRepository.getOne(id);
};

export const bookTypeGroupAlreadyExists = async (BookTypeGroupListId, bookTypeId) => {
    return await BookTypeGroupRepository.alreadyExists(BookTypeGroupListId, bookTypeId);
};

export const createBookTypeGroup = async (data) => {
    return await BookTypeGroupRepository.create(data);
};

export const updateBookTypeGroup = async (id, updates) => {
    const existing = await BookTypeGroupRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroup not found");
    return await BookTypeGroupRepository.update(id, updates);
};

export const updateBookTypesInGroup = async (groupId, updates) => {
  await BookTypeGroupRepository.removeAll(groupId);

  const newLinks = updates.map(bookTypeId =>
    BookTypeGroupRepository.create({
      BookTypeGroupListId: groupId,
      bookTypeId
    })
  );

  return await Promise.all(newLinks); // espera que se creen todos
};

export const removeBookTypeGroupById = async (id) => {
    const existing = await BookTypeGroupRepository.getOne(id);
    if (!existing) throw new Error("BookTypeGroup not found");
    return await BookTypeGroupRepository.remove(id);
};

export const removeAll = async (id) => {
    return await BookTypeGroupRepository.removeAll(id);
};
