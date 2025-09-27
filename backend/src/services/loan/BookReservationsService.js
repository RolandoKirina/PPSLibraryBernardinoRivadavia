import * as BookReservationsRepository from '../../repositories/loan/BookReservationsRepository.js';

export const getAllReservations = async () => {
    return await BookReservationsRepository.getAll();
};

export const getReservation = async (id) => {
    return await BookReservationsRepository.getOne(id);
};

export const createReservation = async (reservation) => {
    return await BookReservationsRepository.create(reservation);
};

export const updateReservation = async (id, updates) => {
    const existingReservation = await BookReservationsRepository.getOne(id);

    if (!existingReservation) throw new Error("Reservation not found");

    return await BookReservationsRepository.update(id, updates);
};

export const removeReservation = async (id) => {
    const existingReservation = await BookReservationsRepository.getOne(id);

    if (!existingReservation) throw new Error("Reservation not found");

    return await BookReservationsRepository.remove(id);
};
