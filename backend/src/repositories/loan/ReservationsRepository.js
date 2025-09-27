import Reservations from '../../models/loan/Reservations.js';

export const getAll = async () => {
    return await Reservations.findAll();
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

export const remove = async (id) =>{
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

