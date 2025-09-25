import * as AuthorsService from '../../services/author/AuthorsService.js';

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await AuthorsService.getAllAuthors();
        res.send(authors);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid author id" });
        }

        const author = await AuthorsService.getAuthor(id);

        if (!author) {
            return res.status(404).json({ msg: `Author with id: ${id} not found` });
        }

        res.send(author);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createAuthor = async (req, res) => {
    try {
        const author = req.body;

        if (!author) {
            return res.status(400).json({ msg: "Invalid author body" });
        }

        const newAuthor = await AuthorsService.createAuthor(author);
        res.status(201).send(newAuthor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid author id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid author body" });
        }

        const updatedAuthor = await AuthorsService.updateAuthor(id, updates);
        res.status(200).send(updatedAuthor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid author id" });
        }

        await AuthorsService.removeAuthor(id);
        res.status(200).json({ msg: `Successfully deleted author with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
