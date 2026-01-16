import * as RemoveReasonRepository from '../../repositories/options/RemoveReasonRepository.js';

export const getAllRemoveReasons = async (filters) => {
    return await RemoveReasonRepository.getAll(filters);
};

export const getCount = async () => {
    return await RemoveReasonRepository.getCount();
};

export const getRemoveReason = async (id) => {
    return await RemoveReasonRepository.getOne(id);
};

export const createRemoveReason = async (data) => {
    return await RemoveReasonRepository.create(data);
};

export const updateRemoveReason = async (id, updates) => {
    const existing = await RemoveReasonRepository.getOne(id);
    if (!existing) throw new Error("RemoveReason not found");
    return await RemoveReasonRepository.update(id, updates);
};

export const removeRemoveReason = async (id) => {
    const existing = await RemoveReasonRepository.getOne(id);
    if (!existing) throw new Error("RemoveReason not found");
    return await RemoveReasonRepository.remove(id);
};
