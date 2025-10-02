
import Locality from '../../models/partner/Locality.js';

export const getAll = async () => {
    return await Locality.findAll();
};

export const getOne = async (id) => {
    return await Locality.findByPk(id);
};

export const create = async (data) => {
    return await Locality.create(data);
};

export const update = async (id, updates) => {
    await Locality.update(updates, { where: { id } });
    return await Locality.findByPk(id);
};

export const remove = async (id) => {
    const locality = await Locality.findByPk(id);

    if (!locality) {
        return null;
    }
    await locality.destroy();

    return {
        msg: "Locality deleted successfully",
        data: locality
    };
};
