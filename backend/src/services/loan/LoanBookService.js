import * as LoanBookRepository from '../../repositories/loan/LoanBookRepository.js';

export const getAllLoanBooks = async () => {
    return await LoanBookRepository.getAll();
};

export const getLoanBook = async (id) => {
    return await LoanBookRepository.getOne(id);
};

export const createLoanBook = async (loanbook) => {
    return await LoanBookRepository.create(loanbook);
};

export const updateLoanBook = async (id, updates) => {
    const existingLoanBook = await LoanBookRepository.getOne(id);

    if (!existingLoanBook) throw new Error("LoanBook not found");

    return await LoanBookRepository.update(id, updates);
};

export const removeLoanBook = async (id) => {
    const existingLoanBook = await LoanBookRepository.getOne(id);

    if (!existingLoanBook) throw new Error("LoanBook not found");

    return await LoanBookRepository.remove(id);
};


export const removeBooksOfLoan= async (id) => {
    return await LoanBookRepository.removeAllOfLoan(id);
};
