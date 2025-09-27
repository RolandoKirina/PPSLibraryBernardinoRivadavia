import * as BookReservationsService from '../../services/loan/BookReservationsService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllBookReservations = async (req, res) => {
    try {
        const bookreservations = await BookReservationsService.getAllBookReservations();
        res.status(HTTP_STATUS.OK.code).send(bookreservations);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getBookReservation = async (req, res) => {
    try {
        const { id } = req.params;

        const bookreservation = await BookReservationsService.getBookReservation(id);

        if (!bookreservation) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `BookReservation with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(bookreservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createBookReservation = async (req, res) => {
    try {
        const bookreservation = req.body;

        if (!bookreservation) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid bookreservation body" });
        }

        const newBookReservation = await BookReservationsService.createBookReservation(bookreservation);
        res.status(HTTP_STATUS.CREATED.code).send(newBookReservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateBookReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid bookreservation body" });
        }

        const updatedBookReservation = await BookReservationsService.updateBookReservation(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedBookReservation);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBookReservation = async (req, res) => {
    try {
        const { id } = req.params;

        await BookReservationsService.removeBookReservation(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted bookreservation with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
