import * as KeyService from "../../services/key/KeyService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import Key from "../../models/key/Key.js";

export const getAllKeys = async (req, res) => {
    try {
        const keys = await KeyService.getAllKeys();
        res.json(keys);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getKey = async (req, res) => {
    try {
        const key = await KeyService.getKey(req.params.id);

        if (!key) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(key);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createKey = async (req, res) => {
    try {
        const key = req.body;
        if (!key) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newKey = await KeyService.createKey(key);
        res.status(HTTP_STATUS.CREATED.code).json(newKey);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateKey = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newKey = await KeyService.updateKey(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newKey);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteKey = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await KeyService.deleteKey(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Key not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
