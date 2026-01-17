import Employees from '../../models/options/Employees.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async (filters = {}) => {
    const { whereEmployee, limit, offset, order } = filters;

    const { rows, count } = await Employees.findAndCountAll({
        where: Object.keys(whereEmployee || {}).length ? whereEmployee : undefined,
        limit,
        offset,
        order
    });

    return {
        rows,
        count
    };
};


export const getOne = async (id) => {
    return await Employees.findByPk(id);
};

export const getOneByCode = async (code) => {
    try {
        const employee = await Employees.findOne({
            where: { code },
        });

        if (!employee) {
            throw new ValidationError(`El empleado con código "${code}" no existe`);
        }

        return employee.dataValues;

    } catch (err) {
        throw err;
    }
};


export const create = async (data) => {

    if (!data || !data.name || data.name.trim() === "") {
        throw new ValidationError("El campo Nombre completo no puede estar vacío");
    }


    return await Employees.create(data);
};

export const update = async (id, updates) => {
    if (!updates || !updates.name || updates.name.trim() === "") {
        throw new ValidationError("El campo Nombre completo no puede estar vacío");
    }

    await Employees.update(updates, { where: { id } });
    return await Employees.findByPk(id);
};

export const remove = async (id) => {
    const employees = await Employees.findByPk(id);

    if (!employees) {
        return null;
    }
    await employees.destroy();

    return {
        msg: "employees deleted successfully",
        data: employees
    }
}
