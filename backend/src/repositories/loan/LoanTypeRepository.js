import LoanType from '../../models/loan/LoanType.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async () => {
    return await LoanType.findAll();
};

export const getOne = async (id) => {
    return await LoanType.findByPk(id);
};

export const getOneByDescription = async (description) => {
  try {
    const loanType = await LoanType.findOne({
      where: { description }
    });

    if (!loanType) {
      throw new ValidationError(`El tipo de préstamo: "${description}" no existe`);
    }

    return loanType.dataValues;

  } catch (err) {
    throw err; // vuelve a lanzar el error para manejarlo arriba
  }
};

export const create = async (loantype) => {
    return await LoanType.create(loantype);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await LoanType.update(updates, {
        where: { id: id }
    });

    return await LoanType.findByPk(id);
};

export const remove = async (id) =>{
    const loanType = await LoanType.findByPk(id);

      if (!loanType) {
        return null;
      }
    await loanType.destroy();
  
    return {
        msg: "LoanType deleted successfully",
        data: loanType
    }
}
