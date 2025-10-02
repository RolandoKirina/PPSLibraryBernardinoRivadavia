import * as FeeRepository from "../../repositories/fees/FeeRepository.js";

export const getAllFees = async () => {
    const fees = await FeeRepository.getAll();
    return fees;
};

export const getFee = async (id) => {
    return await FeeRepository.getById(id);
};

export const createFee = async (fee) => {
    return await FeeRepository.create(fee);
};

export const updateFee = async (id, data) => {
    const updatedFee = await FeeRepository.update(id, data);
    if (!updatedFee) {
        throw new Error("Fee not found or not updated");
    }
    return updatedFee;
};

export const deleteFee = async (id) => {
    const deletedFee = await FeeRepository.remove(id);
    if (!deletedFee) {
        throw new Error("Fee not found or already deleted");
    }
    return deletedFee;
};
