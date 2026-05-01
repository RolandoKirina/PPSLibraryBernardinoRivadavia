import FeeConfig from "../../models/fee/FeeConfig.js";

export const getAll = async () => {
    return await FeeConfig.findAll();
};

export const getById = async (id) => {
    return await FeeConfig.findByPk(id);
};

export const create = async (configData) => {
    return await FeeConfig.create(configData);
};

export const update = async (id, configData) => {
    const numericId = parseInt(id);

    const [rowsUpdated] = await FeeConfig.update(configData, {
        where: { id: numericId }
    });

    if (rowsUpdated === 0) {
        console.log("No se actualizó el ID:", numericId);
        return null;
    }

    return await FeeConfig.findByPk(numericId);
};

export const remove = async (id) => {
    const config = await FeeConfig.findByPk(id);

    if (!config) {
        return null;
    }

    await config.destroy();

    return {
        msg: "Configuración de cuota eliminada correctamente",
        data: config
    };
};