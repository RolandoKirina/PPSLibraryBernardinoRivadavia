import LoanBook from '../../models/loan/LoanBook.js';

export const getAll = async () => {
    return await LoanBook.findAll();
};

export const getOne = async (id) => {
    return await LoanBook.findByPk(id);
};

export const create = async (loanbook) => {
    return await LoanBook.create(loanbook);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
    await LoanBook.update(updates, {
        where: { id: id }
    });

    return await LoanBook.findByPk(id);
};

export const remove = async (id) =>{
    const loanBook = await LoanBook.findByPk(id);

      if (!loanBook) {
        return null;
      }
    await book.destroy();
  
    return {
        msg: "LoanBook deleted successfully",
        data: loanBook
    }
}

