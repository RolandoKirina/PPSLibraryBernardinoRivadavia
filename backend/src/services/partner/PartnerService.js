import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';

export const printList = async (filters) => {
    const partners = await PartnerRepository.printList(filters);
    return partners;
};

export const getAllPartners = async (filters) => {
    const partners = await PartnerRepository.getAll(filters);
    return partners;
};

export const getPartner = async (id) => {
    return await PartnerRepository.getOne(id);
};

export const getOneByPartnerNumber = async (id) => {
    return await PartnerRepository.getOneByPartnerNumber(id);
};

export const createPartner = async (data) => {
    return await PartnerRepository.create(data);
};

export const updatePartner = async (id, updates) => {
    if (updates.idReason === 0) {
    updates.idReason = null;
    }
    const existing = await PartnerRepository.getOne(id);
    if (!existing) throw new Error("Partner not found");
    return await PartnerRepository.update(id, updates);
};

export const removePartner = async (id) => {
    const existing = await PartnerRepository.getOne(id);
    if (!existing) throw new Error("Partner not found");
    return await PartnerRepository.remove(id);
};
