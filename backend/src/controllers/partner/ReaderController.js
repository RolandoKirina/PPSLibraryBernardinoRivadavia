import * as ReaderService from '../../services/partner/ReaderService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllReaders = async (req, res) => {
    try {
        const result = await ReaderService.getAllReaders();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getReader = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ReaderService.getReader(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Reader with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createReader = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid Reader body" });
        }

        const result = await ReaderService.createReader(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateReader = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid Reader body" });
        }

        const result = await ReaderService.updateReader(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteReader = async (req, res) => {
    try {
        const { id } = req.params;

        await ReaderService.removeReader(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted Reader with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
