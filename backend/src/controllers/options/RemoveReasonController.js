import * as RemoveReasonService from '../../services/options/RemoveReasonService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllRemoveReasons = async (req, res) => {
    try {
        const result = await RemoveReasonService.getAllRemoveReasons();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await RemoveReasonService.getRemoveReason(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `RemoveReason with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createRemoveReason = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid remove reason body" });
        }

        const result = await RemoveReasonService.createRemoveReason(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {

        if (error.message && error.message.includes("campo")) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid remove reason body" });
        }

        const result = await RemoveReasonService.updateRemoveReason(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {

        if (error.message && error.message.includes("campo")) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }
        
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;

        await RemoveReasonService.removeRemoveReason(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted RemoveReason with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
