import * as LoanTypeRepository from '../../repositories/loan/LoanTypeRepository.js';

export const getAllLoanTypes = async () => {
    return await LoanTypeRepository.getAll();
};

export const getLoanType = async (id) => {
    return await LoanTypeRepository.getOne(id);
};

export const createLoanType = async (loantype) => {
    return await LoanTypeRepository.create(loantype);
};

export const updateLoanType = async (id, updates) => {
    const existingLoanType = await LoanTypeRepository.getOne(id);

    if (!existingLoanType) throw new Error("LoanType not found");

    return await LoanTypeRepository.update(id, updates);
};

export const removeLoanType = async (id) => {
    const existingLoanType = await LoanTypeRepository.getOne(id);

    if (!existingLoanType) throw new Error("LoanType not found");

    return await LoanTypeRepository.remove(id);
};
