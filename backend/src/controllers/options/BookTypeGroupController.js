import * as BookTypeGroupService from '../../services/options/BookTypeGroupService.js';

export const getAllBookTypeGroups = async (req, res) => {
    try {
        const result = await BookTypeGroupService.getAllBookTypeGroups();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        const result = await BookTypeGroupService.getBookTypeGroup(id);
        if (!result) return res.status(404).json({ msg: `BookTypeGroup with id: ${id} not found` });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createBookTypeGroup = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ msg: "Invalid body" });

        const result = await BookTypeGroupService.createBookTypeGroup(data);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });
        if (!updates) return res.status(400).json({ msg: "Invalid body" });

        const result = await BookTypeGroupService.updateBookTypeGroup(id, updates);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeBookTypeGroup = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        await BookTypeGroupService.removeBookTypeGroup(id);
        res.status(200).json({ msg: `Successfully deleted BookTypeGroup with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
