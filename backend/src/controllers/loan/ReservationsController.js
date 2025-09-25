import * as ReservationsService from '../../services/loan/ReservationsService.js';

export const getAllReservations = async (req, res) => {
    try {
        const reservations = await ReservationsService.getAllReservations();
        res.send(reservations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid reservation id" });
        }

        const reservation = await ReservationsService.getReservation(id);

        if (!reservation) {
            return res.status(404).json({ msg: `Reservation with id: ${id} not found` });
        }

        res.send(reservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createReservation = async (req, res) => {
    try {
        const reservation = req.body;

        if (!reservation) {
            return res.status(400).json({ msg: "Invalid reservation body" });
        }

        const newReservation = await ReservationsService.createReservation(reservation);
        res.status(201).send(newReservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid reservation id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid reservation body" });
        }

        const updatedReservation = await ReservationsService.updateReservation(id, updates);
        res.status(200).send(updatedReservation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeReservation = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid reservation id" });
        }

        await ReservationsService.removeReservation(id);
        res.status(200).json({ msg: `Successfully deleted reservation with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
