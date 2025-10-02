import * as ReasonForWithdrawalRepository from '../../repositories/partner/ReasonForWithdrawalRepository.js';

export const getAllReasonsForWithdrawal = async () => {
    return await ReasonForWithdrawalRepository.getAll();
};

export const getReasonForWithdrawal = async (id) => {
    return await ReasonForWithdrawalRepository.getOne(id);
};

export const createReasonForWithdrawal = async (data) => {
    return await ReasonForWithdrawalRepository.create(data);
};

export const updateReasonForWithdrawal = async (id, updates) => {
    const existing = await ReasonForWithdrawalRepository.getOne(id);
    if (!existing) throw new Error("ReasonForWithdrawal not found");
    return await ReasonForWithdrawalRepository.update(id, updates);
};

export const removeReasonForWithdrawal = async (id) => {
    const existing = await ReasonForWithdrawalRepository.getOne(id);
    if (!existing) throw new Error("ReasonForWithdrawal not found");
    return await ReasonForWithdrawalRepository.remove(id);
};
