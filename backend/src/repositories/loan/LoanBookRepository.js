import LoanBook from '../../models/loan/LoanBook.js';

export const getAll = async () => {
    return await LoanBook.findAll();
};

export const getOne = async (id) => {
    return await LoanBook.findByPk(id);
};

export const create = async (loanbook, transaction = null) => {
  return await LoanBook.create(loanbook, { transaction });
};

export const update = async (id, updates, transaction = null) => {
  await LoanBook.update(updates, {
    where: { id },
    transaction
  });

  return await LoanBook.findByPk(id, { transaction });
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

export const removeAllLoanBooks = async (loanId) => {
  try {
    const loanBooks= await LoanBook.findAll({
      where: { loanId: loanId }
    });

    if (!loanBooks.length) {
      return { msg: "No se encontraron registros para ese loanId", data: [] };
    }

    await Promise.all(loanBooks.map(loanBook => loanBook.destroy()));

    return {
      msg: "Todos los LoanBook del prestamo fueron eliminados correctamente",
      data: loanBooks
    };
  } catch (error) {
    console.error("Error al eliminar LoanBooks:", error);
    throw error;
  }
};

