import * as BookAuthorService from '../../services/author/BookAuthorService.js';

export const getAllBookAuthors = async (req, res) => {
    try {
        const bookAuthors = await BookAuthorService.getAllBookAuthors();
        res.send(bookAuthors);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookAuthor id" });
        }

        const bookAuthor = await BookAuthorService.getBookAuthor(id);

        if (!bookAuthor) {
            return res.status(404).json({ msg: `BookAuthor with id: ${id} not found` });
        }

        res.send(bookAuthor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createBookAuthor = async (req, res) => {
    try {
        const bookAuthor = req.body;

        if (!bookAuthor) {
            return res.status(400).json({ msg: "Invalid bookAuthor body" });
        }

        const newBookAuthor = await BookAuthorService.createBookAuthor(bookAuthor);
        res.status(201).send(newBookAuthor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookAuthor id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid bookAuthor body" });
        }

        const updatedBookAuthor = await BookAuthorService.updateBookAuthor(id, updates);
        res.status(200).send(updatedBookAuthor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeBookAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookAuthor id" });
        }

        await BookAuthorService.removeBookAuthor(id);
        res.status(200).json({ msg: `Successfully deleted bookAuthor with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
