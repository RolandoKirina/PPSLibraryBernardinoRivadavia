import * as LoanRepository from '../../repositories/loan/LoanRepository.js';

export const getAllLoans = async (filters) => {
    return await LoanRepository.getAll(filters);
}

export const getLoanPrintList = async (option) => {
    let loans = [];

    switch(option) {
        case 'return': {
            loans = await LoanRepository.getReturnPrintList();
            break;
        }
        case 'phone': {
            loans = await LoanRepository.getPhonePrintList();
            break;
        }
        case 'partner': {
            loans = await LoanRepository.getPartnerPrintList();
            break;
        }
        default: {
            
        }
    }

    return loans;
}


export const getAllReturns= async (filters) => {
    return await LoanRepository.getAllReturns(filters);
}
export const getLoan = async (id) => {
    return await LoanRepository.getOne(id);
}

export const createLoan = async (loan) => {
    return await LoanRepository.create(loan);
}

export const updateLoan = async (id, updates) => {
    const existingLoan = await LoanRepository.getOne(id);

    if (!existingLoan) throw new Error("Loan not found");

    return await LoanRepository.update(id, updates);
}

export const removeLoan = async (id) => {
    const existingLoan = await LoanRepository.getOne(id);
    
    if (!existingLoan) throw new Error("Loan not found");

    return await LoanRepository.remove(id);
}