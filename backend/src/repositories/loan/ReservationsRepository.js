import { Book, BookReservations, Partner } from '../../models/index.js';
import Reservations from '../../models/loan/Reservations.js';

export const getAll = async (filters) => {
    const {
        whereReservation,
        wherePartner,
        whereBook,
        order,
        limit,
        offset
    } = filters;

    return await Reservations.findAll({
        attributes: ["reservationDate", "expectedDate"],
        where: Object.keys(whereReservation).length ? whereReservation : undefined,
        required: Object.keys(whereReservation).length > 0,
        include: [
            {
                model: Partner,
                attributes: ["partnerNumber", "name", "surname"],
                where: Object.keys(wherePartner).length ? wherePartner : undefined,
                required: Object.keys(wherePartner).length > 0,
            },
            {
                model: BookReservations,
                attributes: ["BookId", "reservationId"],
                include: [
                    {
                        model: Book,
                        attributes: ["title"],
                        where: Object.keys(whereBook).length ? whereBook : undefined,
                        required: Object.keys(whereBook).length > 0,
                    }
                ]
            }
        ],
        order,
        limit,
        offset
    });

};

export const getOne = async (id) => {
    return await Reservations.findByPk(id);
};

export const create = async (reservation) => {
    return await Reservations.create(reservation);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await Reservations.update(updates, {
        where: { id: id }
    });

    return await Reservations.findByPk(id);
};

export const remove = async (id) => {
    const reservations = await Reservations.findByPk(id);

    if (!reservations) {
        return null;
    }
    await reservations.destroy();

    return {
        msg: "Reservations deleted successfully",
        data: reservations
    }
}

