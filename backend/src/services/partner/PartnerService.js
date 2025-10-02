import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';

export const getAllPartners = async () => {
    return await PartnerRepository.getAll();
};

export const getPartner = async (id) => {
    return await PartnerRepository.getOne(id);
};

export const createPartner = async (data) => {
    return await PartnerRepository.create(data);
};

export const updatePartner = async (id, updates) => {
    const existing = await PartnerRepository.getOne(id);
    if (!existing) throw new Error("Partner not found");
    return await PartnerRepository.update(id, updates);
};

export const removePartner = async (id) => {
    const existing = await PartnerRepository.getOne(id);
    if (!existing) throw new Error("Partner not found");
    return await PartnerRepository.remove(id);
};
