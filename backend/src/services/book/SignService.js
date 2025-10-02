import * as SignRepository from "../../repositories/signs/SignRepository.js";

export const getAllSigns = async () => {
    const signs = await SignRepository.getAll();
    return signs;
};

export const getSign = async (id) => {
    return await SignRepository.getById(id);
};

export const createSign = async (sign) => {
    return await SignRepository.create(sign);
};

export const updateSign = async (id, data) => {
    const updatedSign = await SignRepository.update(id, data);
    if (!updatedSign) {
        throw new Error("Sign not found or not updated");
    }
    return updatedSign;
};

export const deleteSign = async (id) => {
    const deletedSign = await SignRepository.remove(id);
    if (!deletedSign) {
        throw new Error("Sign not found or already deleted");
    }
    return deletedSign;
};
