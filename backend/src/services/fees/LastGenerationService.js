import * as LastGenerationRepository from "../../repositories/lastGeneration/LastGenerationRepository.js";

export const getAllLastGenerations = async () => {
    const lastGenerations = await LastGenerationRepository.getAll();
    return lastGenerations;
};

export const getLastGeneration = async (id) => {
    return await LastGenerationRepository.getById(id);
};

export const createLastGeneration = async (lastGeneration) => {
    return await LastGenerationRepository.create(lastGeneration);
};

export const updateLastGeneration = async (id, data) => {
    const updatedLastGeneration = await LastGenerationRepository.update(id, data);
    if (!updatedLastGeneration) {
        throw new Error("LastGeneration not found or not updated");
    }
    return updatedLastGeneration;
};

export const deleteLastGeneration = async (id) => {
    const deletedLastGeneration = await LastGenerationRepository.remove(id);
    if (!deletedLastGeneration) {
        throw new Error("LastGeneration not found or already deleted");
    }
    return deletedLastGeneration;
};
