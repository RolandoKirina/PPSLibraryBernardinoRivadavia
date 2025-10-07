import * as KeyRepository from "../../repositories/book/KeyRepository.js";

export const getAllKeys = async () => {
    const keys = await KeyRepository.getAll();
    return keys;
};

export const getKey = async (id) => {
    return await KeyRepository.getById(id);
};

export const createKey = async (key) => {
    return await KeyRepository.create(key);
};

export const updateKey = async (id, data) => {
    const updatedKey = await KeyRepository.update(id, data);
    if (!updatedKey) {
        throw new Error("Key not found or not updated");
    }
    return updatedKey;
};

export const deleteKey = async (id) => {
    const deletedKey = await KeyRepository.remove(id);
    if (!deletedKey) {
        throw new Error("Key not found or already deleted");
    }
    return deletedKey;
};
