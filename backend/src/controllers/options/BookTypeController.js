import * as BookTypeService from "../../services/options/BookTypeService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";
import { buildBookTypeFilters } from "../../utils/buildBookTypeFilters.js";

export const getAllBookTypes = async (req, res) => {
    try {
        const queryOptions = buildBookTypeFilters(req.query);
        const bookTypes = await BookTypeService.getAllBookTypes(queryOptions);
        res.json(bookTypes); 
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getCount = async (req, res) => {
    try {
        const count = await BookTypeService.getCount();
        res.json(count); 
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getBookType = async (req, res) => {
    try {
        const bookType = await BookTypeService.getBookType(req.params.id);

        if (!bookType) {
            return res
                .status(HTTP_STATUS.NOT_FOUND.code)
                .json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(bookType);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookType = async (req, res) => {
    try {
        const bookType = req.body;
        if (!bookType) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newBookType = await BookTypeService.createBookType(bookType);
        res.status(HTTP_STATUS.CREATED.code).json(newBookType);
        
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

export const updateBookType = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const updatedBookType = await BookTypeService.updateBookType(id, updates);
        res.status(HTTP_STATUS.OK.code).json(updatedBookType);
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

export const deleteBookType = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await BookTypeService.deleteBookType(id);

        if (!deleted) {
            return res
                .status(HTTP_STATUS.NOT_FOUND.code)
                .json({ msg: "BookType not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
