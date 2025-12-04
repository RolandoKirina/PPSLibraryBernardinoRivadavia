import * as BookTypeGroupListService from '../../services/options/BookTypeGroupListService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllBookTypeGroupLists = async (req, res) => {
    try {
        const result = await BookTypeGroupListService.getAllBookTypeGroupLists();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await BookTypeGroupListService.getBookTypeGroupList(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `BookTypeGroupList with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookTypeGroupList = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid body" });
        }

        const result = await BookTypeGroupListService.createBookTypeGroupList(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);

        if (error.message && error.message.includes("campos")) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        // Si es otro error desconocido → 500
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid body" });
        }

        const result = await BookTypeGroupListService.updateBookTypeGroupList(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);

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

export const removeBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;

        await BookTypeGroupListService.removeBookTypeGroupList(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted BookTypeGroupList with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
