import * as MaritalStatusService from '../../services/partner/MaritalStatusService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllMaritalStatuses = async (req, res) => {
    try {
        const result = await MaritalStatusService.getAllMaritalStatuses();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getMaritalStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await MaritalStatusService.getMaritalStatus(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `MaritalStatus with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createMaritalStatus = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid marital status body" });
        }

        const result = await MaritalStatusService.createMaritalStatus(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateMaritalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid marital status body" });
        }

        const result = await MaritalStatusService.updateMaritalStatus(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteMaritalStatus = async (req, res) => {
    try {
        const { id } = req.params;

        await MaritalStatusService.deleteMaritalStatus(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted MaritalStatus with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
