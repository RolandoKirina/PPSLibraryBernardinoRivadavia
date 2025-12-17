import * as AuthorsService from '../../services/author/AuthorsService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';
import { buildAuthorFilters } from '../../utils/buildAuthorFilters.js';

export const getAllAuthors = async (req, res) => {
    try {
        const queryOptions = buildAuthorFilters(req.query);

        const authors = await AuthorsService.getAllAuthors(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(authors);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};



export const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        const author = await AuthorsService.getAuthor(id);

        if (!author) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Author with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(author);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createAuthor = async (req, res) => {
    try {
        const author = req.body;

        if (!author) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid author body" });
        }

        const newAuthor = await AuthorsService.createAuthor(author);
        res.status(HTTP_STATUS.CREATED.code).send(newAuthor);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid author body" });
        }

        const updatedAuthor = await AuthorsService.updateAuthor(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedAuthor);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        await AuthorsService.removeAuthor(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted author with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
