import * as BookTypeGroupService from '../../services/options/BookTypeGroupService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

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
        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        console.error("Server error:", error);

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
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
        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        console.error("Server error:", error);

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookTypesInGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid body" });
        }

        const result = await BookTypeGroupService.updateBookTypesInGroup(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBookTypeGroupById = async (req, res) => {
    try {
        const { id } = req.params;

        await BookTypeGroupService.removeBookTypeGroup(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted BookTypeGroup with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBookTypeGroup = async (req, res) => {
    try {
         const { bookTypeId, groupListId } = req.params;

         const found = await bookTypeGroupAlreadyExists(groupListId, bookTypeId);

        if(!found) {
            res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `BookTypeGroup not found with bookTypeId: ${bookTypeId} and groupListId: ${groupListId}` });
        }

        await BookTypeGroupService.removeBookTypeGroupById(found.BookTypeGroupId);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted bookTypeGroup with bookTypeId: ${bookTypeId} and groupListId: ${groupListId}` });

    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const bookTypeGroupAlreadyExists = async (BookTypeGroupListId, bookTypeId) => {
    try {
        const bookTypeGroup = await BookTypeGroupService.bookTypeGroupAlreadyExists(BookTypeGroupListId, bookTypeId);
  
        return bookTypeGroup;
    } catch (error) {
        console.error(error);
    }
};