import * as FeeConfigRepository from "../../repositories/fee/FeeConfigRepository.js";

export const getAllConfigs = async () => {
    const configs = await FeeConfigRepository.getAll();
    return configs;
};

export const getConfig = async (id) => {
    const config = await FeeConfigRepository.getById(id);
    return config;
};

export const createConfig = async (configData) => {

    return await FeeConfigRepository.create(configData);
};

export const updateConfig = async (id, data) => {
    const updatedConfig = await FeeConfigRepository.update(id, data);
    
    if (!updatedConfig) {
        throw new Error("Configuración de cuota no encontrada o no actualizada");
    }
    
    return updatedConfig;
};

export const deleteConfig = async (id) => {
    const deletedConfig = await FeeConfigRepository.remove(id);
    
    if (!deletedConfig) {
        throw new Error("Configuración de cuota no encontrada o ya eliminada");
    }
    
    return deletedConfig;
};