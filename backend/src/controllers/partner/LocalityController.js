import * as LocalityService from '../../services/partner/LocalityService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllLocalities = async (req, res) => {
    try {
        const result = await LocalityService.getAllLocalities();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getLocality = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await LocalityService.getLocality(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Locality with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createLocality = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid locality body" });
        }

        const result = await LocalityService.createLocality(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateLocality = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid locality body" });
        }

        const result = await LocalityService.updateLocality(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteLocality = async (req, res) => {
    try {
        const { id } = req.params;

        await LocalityService.deleteLocality(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted Locality with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
