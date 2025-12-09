import PartnerCategory from '../../models/partner/PartnerCategory.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async () => {
    return await PartnerCategory.findAll();
};

export const getOne = async (id) => {
    return await PartnerCategory.findByPk(id);
};

export const create = async (data) => {
    if (!data.name || data.name.trim() === "") {
        throw new ValidationError("El campo Categoria no puede estar vacío");
    }

    data.amount = Number(data.amount);

    if (
        typeof data.amount !== "number" ||
        isNaN(data.amount) ||
        data.amount <= 0
    ) {
        throw new ValidationError("El campo Cantidad debe ser un número mayor que 0");
    }

    return await PartnerCategory.create(data);
};


export const update = async (id, updates) => {
    if (!updates.name || updates.name.trim() === "") {
        throw new ValidationError("El campo Categoria no puede estar vacío");
    }

    updates.amount = Number(updates.amount);

    if (
        typeof updates.amount !== "number" ||
        isNaN(updates.amount) ||
        updates.amount <= 0
    ) {
        throw new ValidationError("El campo Cantidad debe ser un número mayor que 0");
    }

    await PartnerCategory.update(updates, { where: { idCategory: id } });
    return await PartnerCategory.findByPk(id);
};


export const remove = async (id) => {
    const partnerCategory = await PartnerCategory.findByPk(id);

    if (!partnerCategory) {
        return null;
    }
    await partnerCategory.destroy();

    return {
        msg: "PartnerCategory deleted successfully",
        data: partnerCategory
    };
};
