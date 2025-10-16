import * as ReservationsRepository from '../../repositories/loan/ReservationsRepository.js';

export const getAllReservations = async (filters) => {
    return await ReservationsRepository.getAll(filters);
};

export const getReservation = async (id) => {
    return await ReservationsRepository.getOne(id);
};

export const createReservation = async (reservation) => {
    return await ReservationsRepository.create(reservation);
};

export const updateReservation = async (id, updates) => {
    const existingReservation = await ReservationsRepository.getOne(id);

    if (!existingReservation) throw new Error("Reservation not found");

    return await ReservationsRepository.update(id, updates);
};

export const removeReservation = async (id) => {
    const existingReservation = await ReservationsRepository.getOne(id);

    if (!existingReservation) throw new Error("Reservation not found");

    return await ReservationsRepository.remove(id);
};
