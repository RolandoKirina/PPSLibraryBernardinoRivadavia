import * as BookKeyService from "../../services/book/BookKeyService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

export const getAllBookKeys = async (req, res) => {
    try {
        const bookKeys = await BookKeyService.getAllBookKeys();
        res.json(bookKeys); 
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: "error" });
    }
};

export const getBookKey = async (req, res) => {
    try {
        const bookKey = await BookKeyService.getBookKey(req.params.id);

        if (!bookKey) {
            return res
                .status(HTTP_STATUS.NOT_FOUND.code)
                .json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(bookKey);
    } catch (e) {
        console.error(e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookKey = async (req, res) => {
    try {
        const bookKey = req.body;
        if (!bookKey) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newBookKey = await BookKeyService.createBookKey(bookKey);
        res.status(HTTP_STATUS.CREATED.code).json(newBookKey);
    } catch (e) {
        console.error(e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookKey = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const updatedBookKey = await BookKeyService.updateBookKey(id, updates);
        res.status(HTTP_STATUS.OK.code).json(updatedBookKey);
    } catch (e) {
        console.error(e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteBookKey = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await BookKeyService.deleteBookKey(id);

        if (!deleted) {
            return res
                .status(HTTP_STATUS.NOT_FOUND.code)
                .json({ msg: "BookKey not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
