import * as ReasonForWithdrawalService from '../../services/partner/ReasonForWithdrawalService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllReasonsForWithdrawal = async (req, res) => {
    try {
        const result = await ReasonForWithdrawalService.getAllReasonsForWithdrawal();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getReasonForWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await ReasonForWithdrawalService.getReasonForWithdrawal(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `ReasonForWithdrawal with id: ${id} not found` });
        }
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createReasonForWithdrawal = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid ReasonForWithdrawal body" });
        }
        const result = await ReasonForWithdrawalService.createReasonForWithdrawal(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateReasonForWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid ReasonForWithdrawal body" });
        }
        const result = await ReasonForWithdrawalService.updateReasonForWithdrawal(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteReasonForWithdrawal = async (req, res) => {
    try {
        const { id } = req.params;
        await ReasonForWithdrawalService.removeReasonForWithdrawal(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted ReasonForWithdrawal with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
