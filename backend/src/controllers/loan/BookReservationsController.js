import * as BookReservationsService from '../../services/loan/BookReservationsService.js';

export const getAllBookReservations = async (req, res) => {
    try {
        const bookreservations = await BookReservationsService.getAllBookReservations();
        res.send(bookreservations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getBookReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookreservation id" });
        }

        const bookreservation = await BookReservationsService.getBookReservation(id);

        if (!bookreservation) {
            return res.status(404).json({ msg: `BookReservation with id: ${id} not found` });
        }

        res.send(bookreservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createBookReservation = async (req, res) => {
    try {
        const bookreservation = req.body;

        if (!bookreservation) {
            return res.status(400).json({ msg: "Invalid bookreservation body" });
        }

        const newBookReservation = await BookReservationsService.createBookReservation(bookreservation);
        res.status(201).send(newBookReservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateBookReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookreservation id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid bookreservation body" });
        }

        const updatedBookReservation = await BookReservationsService.updateBookReservation(id, updates);
        res.status(200).send(updatedBookReservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeBookReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid bookreservation id" });
        }

        await BookReservationsService.removeBookReservation(id);
        res.status(200).json({ msg: `Successfully deleted bookreservation with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
