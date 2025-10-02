import * as StatePartnerRepository from '../../repositories/partner/StatePartnerRepository.js';

export const getAllStatePartners = async () => {
    return await StatePartnerRepository.getAll();
};

export const getStatePartner = async (id) => {
    return await StatePartnerRepository.getOne(id);
};

export const createStatePartner = async (data) => {
    return await StatePartnerRepository.create(data);
};

export const updateStatePartner = async (id, updates) => {
    const existing = await StatePartnerRepository.getOne(id);
    if (!existing) throw new Error("StatePartner not found");
    return await StatePartnerRepository.update(id, updates);
};

export const removeStatePartner = async (id) => {
    const existing = await StatePartnerRepository.getOne(id);
    if (!existing) throw new Error("StatePartner not found");
    return await StatePartnerRepository.remove(id);
};
