import BookReservations from '../../models/loan/BookReservations.js';

export const getAll = async () => {
    return await BookReservations.findAll();
};

export const getOne = async (id) => {
    return await BookReservations.findByPk(id);
};

export const create = async (reservation) => {
    return await BookReservations.create(reservation);
};

export const update = async (id, updates) => {
    await BookReservations.update(updates, {
        where: { id: id }
    });

    return await BookReservations.findByPk(id);
};

export const remove = async (id) => {
    return await BookReservations.destroy({
        where: { id: id }
    });
};
