
import * as StatePartnerService from '../../services/partner/StatePartnerService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllStatePartners = async (req, res) => {
    try {
        const result = await StatePartnerService.getAllStatePartners();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getStatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await StatePartnerService.getStatePartner(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `StatePartner with id: ${id} not found` });
        }
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createStatePartner = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid StatePartner body" });
        }
        const result = await StatePartnerService.createStatePartner(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateStatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid StatePartner body" });
        }
        const result = await StatePartnerService.updateStatePartner(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteStatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        await StatePartnerService.removeStatePartner(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted StatePartner with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
