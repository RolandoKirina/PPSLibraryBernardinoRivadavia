import * as PartnerService from '../../services/partner/PartnerService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';
import { buildPartnerFilters } from "../../utils/buildPartnerFilters.js";

export const getAllPartners = async (req, res) => {
    try {
        const queryOptions = buildPartnerFilters(req.query);
        const partners = await PartnerService.getAllPartners(queryOptions);

        res.status(HTTP_STATUS.OK.code).send(partners);

    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getCount = async (req, res) => {
    try {
        const count = await PartnerService.getCount();

        res.status(HTTP_STATUS.OK.code).send(count);

    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getPartner = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await PartnerService.getPartner(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Partner with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getOneByPartnerNumber = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await PartnerService.getOneByPartnerNumber(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Partner with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createPartner = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid partner body" });
        }

        const result = await PartnerService.createPartner(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updatePartner = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid partner body" });
        }

        const result = await PartnerService.updatePartner(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removePartner = async (req, res) => {
    try {
        const { id } = req.params;

        await PartnerService.removePartner(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted Partner with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
