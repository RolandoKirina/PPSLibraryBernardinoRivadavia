import LoanBook from '../../models/loan/LoanBook.js';

export const getAll = async () => {
  return await LoanBook.findAll();
};

export const verifyIfBookIsNotRepeated = async (id) => {
  const res = await LoanBook.findOne({
    where: {
      BookId: id,
      returnedDate: null
    }
  });

  if (res !== null) {
    console.log(res);
    console.log("s");
    return {
      available: false,
      message: 'El libro ya ha sido prestado y no puede ser añadido al préstamo.',
      currentLoan: {
        loanId: res.loanId,
        partnerName: `${res.Loan?.Partner?.name || ''} ${res.Loan?.Partner?.surname || ''}`,
        expectedDate: res.expectedDate
      }
    };
  }

  return {
    available: true,
    message: 'El libro está disponible para ser prestado.'
  };
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

export const remove = async (id) => {
  const loanBook = await LoanBook.findByPk(id);

  if (!loanBook) {
    return null;
  }

  await loanBook.destroy();

  return {
    msg: "LoanBook deleted successfully",
    data: loanBook
  }
}

export const removeAllLoanBooks = async (loanId) => {
  try {
    const loanBooks = await LoanBook.findAll({
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

