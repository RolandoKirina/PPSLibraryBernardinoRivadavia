import * as BookTypeGroupService from '../../services/options/BookTypeGroupService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllBookTypeGroups = async (req, res) => {
    try {
        const result = await BookTypeGroupService.getAllBookTypeGroups();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await BookTypeGroupService.getBookTypeGroup(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `BookTypeGroup with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookTypeGroup = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid body" });
        }

        const result = await BookTypeGroupService.createBookTypeGroup(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid body" });
        }

        const result = await BookTypeGroupService.updateBookTypeGroup(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;

        await BookTypeGroupService.removeBookTypeGroup(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted BookTypeGroup with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
