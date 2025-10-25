import Employees from '../../models/options/Employees.js';

export const getAll = async () => {
    return await Employees.findAll();
};

export const getOne = async (id) => {
    return await Employees.findByPk(id);
};

export const getOneByCode = async (code) => {
    console.log(code);
    const employee = await Employees.findAll({
        where: {
            code: code
        },
        limit: 1
    });
    return employee[0].dataValues;
};

export const create = async (data) => {
    return await Employees.create(data);
};

export const update = async (id, updates) => {
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
