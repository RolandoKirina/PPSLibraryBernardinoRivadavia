import * as BookTypeGroupListService from '../../services/options/BookTypeGroupListService.js';

export const getAllBookTypeGroupLists = async (req, res) => {
    try {
        const result = await BookTypeGroupListService.getAllBookTypeGroupLists();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        const result = await BookTypeGroupListService.getBookTypeGroupList(id);
        if (!result) return res.status(404).json({ msg: `BookTypeGroupList with id: ${id} not found` });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createBookTypeGroupList = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({ msg: "Invalid body" });

        const result = await BookTypeGroupListService.createBookTypeGroupList(data);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });
        if (!updates) return res.status(400).json({ msg: "Invalid body" });

        const result = await BookTypeGroupListService.updateBookTypeGroupList(id, updates);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeBookTypeGroupList = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) return res.status(400).json({ msg: "Invalid id" });

        await BookTypeGroupListService.removeBookTypeGroupList(id);
        res.status(200).json({ msg: `Successfully deleted BookTypeGroupList with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
