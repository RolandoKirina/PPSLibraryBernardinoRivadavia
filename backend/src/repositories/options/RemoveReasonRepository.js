import RemoveReason from '../../models/options/RemoveReason.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async ({ limit, offset }) => {
    return await RemoveReason.findAll({
        limit,
        offset
    });
};

export const getCount = async () => {
    return await RemoveReason.count();
};


export const getOne = async (id) => {
    return await RemoveReason.findByPk(id);
};

export const create = async (data) => {
    if (!data.reason || !data.reason.trim()) {
    throw new ValidationError("El campo motivo de baja no puede estar vacío");
    }
    return await RemoveReason.create(data);
};

export const update = async (id, updates) => {
    if (!updates.reason || !updates.reason.trim()) {
    throw new ValidationError("El campo motivo de baja no puede estar vacío");
    }
    await RemoveReason.update(updates, { where: { id } });
    return await RemoveReason.findByPk(id);
};

export const remove = async (id) =>{
    const removeReason = await RemoveReason.findByPk(id);

      if (!removeReason) {
        return null;
      }
    await removeReason.destroy();
  
    return {
        msg: "removeReason deleted successfully",
        data: removeReason
    }
}
