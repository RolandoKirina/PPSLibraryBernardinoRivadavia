import * as PartnerCategoryRepository from '../../repositories/partner/PartnerCategoryRepository.js';

export const getAllPartnerCategories = async () => {
    return await PartnerCategoryRepository.getAll();
};

export const getCount = async () => {
    return await PartnerCategoryRepository.getCount();
};

export const getPartnerCategory = async (id) => {
    return await PartnerCategoryRepository.getOne(id);
};

export const createPartnerCategory = async (data) => {
    return await PartnerCategoryRepository.create(data);
};

export const updatePartnerCategory = async (id, updates) => {
    const existing = await PartnerCategoryRepository.getOne(id);
    if (!existing) throw new Error("PartnerCategory not found");
    return await PartnerCategoryRepository.update(id, updates);
};

export const removePartnerCategory = async (id) => {
    const existing = await PartnerCategoryRepository.getOne(id);
    if (!existing) throw new Error("PartnerCategory not found");
    return await PartnerCategoryRepository.remove(id);
};
