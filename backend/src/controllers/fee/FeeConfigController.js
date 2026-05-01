import * as FeeConfigService from "../../services/fee/FeeConfigService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

export const getAllConfigs = async (req, res) => {
    try {
        const configs = await FeeConfigService.getAllConfigs();
        res.status(HTTP_STATUS.OK.code).json(configs);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: "Error al obtener las configuraciones" });
    }
};

export const getConfig = async (req, res) => {
    try {
        const config = await FeeConfigService.getConfig(req.params.id);

        if (!config) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(config);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createConfig = async (req, res) => {
    try {
        const data = req.body;
        // Validación básica de contenido
        if (!data || Object.keys(data).length === 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Datos de configuración requeridos" });
        }

        const newConfig = await FeeConfigService.createConfig(data);
        res.status(HTTP_STATUS.CREATED.code).json(newConfig);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateConfig = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }

        const updatedConfig = await FeeConfigService.updateConfig(id, updates);

        if (!updatedConfig) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Configuración no encontrada" });
        }

        res.status(HTTP_STATUS.OK.code).json(updatedConfig);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
export const deleteConfig = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await FeeConfigService.deleteConfig(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Configuración no encontrada" });
        }

        return res.status(HTTP_STATUS.OK.code).json({ msg: "Configuración eliminada con éxito" });
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};