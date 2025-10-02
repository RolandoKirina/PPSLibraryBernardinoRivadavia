import * as MaritalStatusRepository from '../../repositories/partner/MaritalStatusRepository.js';

export const getAllMaritalStatuses = async () => {
    return await MaritalStatusRepository.getAll();
};

export const getMaritalStatus = async (id) => {
    return await MaritalStatusRepository.getOne(id);
};

export const createMaritalStatus = async (data) => {
    return await MaritalStatusRepository.create(data);
};

export const updateMaritalStatus = async (id, updates) => {
    const existing = await MaritalStatusRepository.getOne(id);
    if (!existing) throw new Error("Marital status not found");
    return await MaritalStatusRepository.update(id, updates);
};

export const removeMaritalStatus = async (id) => {
    const existing = await MaritalStatusRepository.getOne(id);
    if (!existing) throw new Error("Marital status not found");
    return await MaritalStatusRepository.remove(id);
};
