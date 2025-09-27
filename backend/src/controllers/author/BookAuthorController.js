import * as BookAuthorService from '../../services/author/BookAuthorService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllBookAuthors = async (req, res) => {
    try {
        const bookAuthors = await BookAuthorService.getAllBookAuthors();
        res.status(HTTP_STATUS.OK.code).send(bookAuthors);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const bookAuthor = await BookAuthorService.getBookAuthor(id);

        if (!bookAuthor) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `BookAuthor with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(bookAuthor);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookAuthor = async (req, res) => {
    try {
        const bookAuthor = req.body;

        if (!bookAuthor) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid bookAuthor body" });
        }

        const newBookAuthor = await BookAuthorService.createBookAuthor(bookAuthor);
        res.status(HTTP_STATUS.CREATED.code).send(newBookAuthor);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid bookAuthor body" });
        }

        const updatedBookAuthor = await BookAuthorService.updateBookAuthor(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedBookAuthor);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        await BookAuthorService.removeBookAuthor(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted bookAuthor with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
