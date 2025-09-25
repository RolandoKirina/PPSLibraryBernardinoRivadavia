import Loan from '../../models/loan/Loan.js';

export const getAll = async () => {
    return await Loan.findAll();
}

export const getOne = async (id) => {
    return await Loan.findByPk(id);
}

export const create = async (loan) => {
    return await Loan.create(loan);
}

//a diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await Loan.update(updates, {
        where: {
            id: id
        }
    });

    return await Loan.findByPk(id);
}

export const remove = async (id) => {
    return Loan.destroy({
        where: {
            id: id
        }
    })
}