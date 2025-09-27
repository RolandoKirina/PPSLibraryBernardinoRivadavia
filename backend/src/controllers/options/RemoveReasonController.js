import * as RemoveReasonService from '../../services/options/RemoveReasonService.js';

export const getAllRemoveReasons = async (req, res) => {
    try {
        const result = await RemoveReasonService.getAllRemoveReasons();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid remove reason id" });
        }

        const result = await RemoveReasonService.getRemoveReason(id);
        if (!result) {
            return res.status(404).json({ msg: `RemoveReason with id: ${id} not found` });
        }

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createRemoveReason = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(400).json({ msg: "Invalid remove reason body" });
        }

        const result = await RemoveReasonService.createRemoveReason(data);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid remove reason id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid remove reason body" });
        }

        const result = await RemoveReasonService.updateRemoveReason(id, updates);
        res.status(201).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeRemoveReason = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid remove reason id" });
        }

        await RemoveReasonService.removeRemoveReason(id);
        res.status(200).json({ msg: `Successfully deleted RemoveReason with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
