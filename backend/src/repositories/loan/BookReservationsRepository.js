import BookReservations from '../../models/loan/BookReservations.js';

export const getAll = async () => {
    return await BookReservations.findAll();
};

export const getOne = async (id) => {
    return await BookReservations.findByPk(id);
};

export const create = async (reservation, transaction = null) => {
    return await BookReservations.create(reservation, { transaction });
};

export const update = async (id, updates, transaction = null) => {
    await BookReservations.update(updates, {
        where: { id },
        transaction
    });

    return await BookReservations.findByPk(id, { transaction });
};

export const remove = async (id) => {
    const bookReservations = await BookReservations.findByPk(id);

    if (!bookReservations) {
        return null;
    }
    await bookReservations.destroy();

    return {
        msg: "BookReservation deleted successfully",
        data: bookReservations
    }
}

