import * as ReservationsService from '../../services/loan/ReservationsService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';
import { buildReservationFilters } from '../../utils/buildReservationFilters.js';

export const getAllReservations = async (req, res) => {
    try {
        const queryOptions = buildReservationFilters(req.query);
        const reservations = await ReservationsService.getAllReservations(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(reservations);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await ReservationsService.getReservation(id);

        if (!reservation) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Reservation with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(reservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createReservation = async (req, res) => {
    try {
        const reservation = req.body;

        if (!reservation) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid reservation body" });
        }

        const newReservation = await ReservationsService.createReservation(reservation);
        res.status(HTTP_STATUS.CREATED.code).send(newReservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateReservation = async (req, res) => {
    try {
        console.log("ss");
        console.log("ss");
        console.log("ss");

        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid reservation body" });
        }

        console.log("ss");
        const updatedReservation = await ReservationsService.updateReservation(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedReservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeReservation = async (req, res) => {
    try {
        const { id } = req.params;

        await ReservationsService.removeReservation(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted reservation with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
