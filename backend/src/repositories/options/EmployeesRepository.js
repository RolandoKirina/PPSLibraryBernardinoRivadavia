import Employees from '../../models/options/Employees.js';

export const getAll = async (filters) => {
    const {
        whereEmployee
    } = filters;

    return await Employees.findAll(
        { 
            where: whereEmployee
        }
    );
};

export const getOne = async (id) => {
    return await Employees.findByPk(id);
};

export const getOneByCode = async (code) => {

    const employee = await Employees.findAll({
        where: {
            code: code
        },
        limit: 1
    });

    return employee[0].dataValues;
};

export const create = async (data) => {

    if (!data || !data.name || data.name.trim() === "") {
        throw new Error("El campo Nombre completo no puede estar vacío");
    }


    return await Employees.create(data);
};

export const update = async (id, updates) => {
    if (!updates || !updates.name || updates.name.trim() === "") {
        throw new Error("El campo Nombre completo no puede estar vacío");
    }

    await Employees.update(updates, { where: { id } });
    return await Employees.findByPk(id);
};

export const remove = async (id) =>{
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
