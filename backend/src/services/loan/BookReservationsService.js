import * as BookReservationsRepository from '../../repositories/loan/BookReservationsRepository.js';

export const getAllBookReservations = async () => {
    return await BookReservationsRepository.getAll();
};

export const getBookReservation = async (id) => {
    return await BookReservationsRepository.getOne(id);
};

export const createBookReservation = async (reservation) => {
    return await BookReservationsRepository.create(reservation);
};

export const updateBookReservation = async (id, updates) => {
    const existingBookReservation = await BookReservationsRepository.getOne(id);

    if (!existingBookReservation) throw new Error("Reservation not found");

    return await BookReservationsRepository.update(id, updates);
};

export const removeBookReservation = async (id) => {
    const existingBookReservation = await BookReservationsRepository.getOne(id);

    if (!existingBookReservation) throw new Error("Reservation not found");

    return await BookReservationsRepository.remove(id);
};
