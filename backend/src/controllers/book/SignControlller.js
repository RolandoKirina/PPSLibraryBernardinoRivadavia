import * as SignService from "../../services/signs/SignService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import Sign from "../../models/signs/Sign.js";

export const getAllSigns = async (req, res) => {
    try {
        const signs = await SignService.getAllSigns();
        res.json(signs);
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getSign = async (req, res) => {
    try {
        const sign = await SignService.getSign(req.params.id);

        if (!sign) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(sign);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createSign = async (req, res) => {
    try {
        const sign = req.body;
        if (!sign) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newSign = await SignService.createSign(sign);
        res.status(HTTP_STATUS.CREATED.code).json(newSign);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateSign = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newSign = await SignService.updateSign(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newSign);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteSign = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await SignService.deleteSign(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Sign not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
