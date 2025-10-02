import * as LastGenerationService from "../../services/lastGeneration/LastGenerationService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

export const getAllLastGenerations = async (req, res) => {
    try {
        const lastGenerations = await LastGenerationService.getAllLastGenerations();
        res.json(lastGenerations);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getLastGeneration = async (req, res) => {
    try {
        const lastGeneration = await LastGenerationService.getLastGeneration(req.params.id);

        if (!lastGeneration) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(lastGeneration);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createLastGeneration = async (req, res) => {
    try {
        const lastGeneration = req.body;
        if (!lastGeneration) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newLastGeneration = await LastGenerationService.createLastGeneration(lastGeneration);
        res.status(HTTP_STATUS.CREATED.code).json(newLastGeneration);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateLastGeneration = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newLastGeneration = await LastGenerationService.updateLastGeneration(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newLastGeneration);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteLastGeneration = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await LastGenerationService.deleteLastGeneration(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "LastGeneration not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
