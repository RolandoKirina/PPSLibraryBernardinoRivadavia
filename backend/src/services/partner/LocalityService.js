import * as LocalityRepository from '../../repositories/partner/LocalityRepository.js';

export const getAllLocalities = async () => {
    return await LocalityRepository.getAll();
};

export const getLocality = async (id) => {
    return await LocalityRepository.getOne(id);
};

export const createLocality = async (data) => {
    return await LocalityRepository.create(data);
};

export const updateLocality = async (id, updates) => {
    const existing = await LocalityRepository.getOne(id);
    if (!existing) throw new Error("Locality not found");
    return await LocalityRepository.update(id, updates);
};

export const deleteLocality = async (id) => {
    const existing = await LocalityRepository.getOne(id);
    if (!existing) throw new Error("Locality not found");
    return await LocalityRepository.remove(id);
};
