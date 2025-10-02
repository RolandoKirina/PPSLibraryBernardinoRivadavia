import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import Partner from '../../models/partner/partner.js';

// export const getAll = async ({ where, order, limit, offset, include }) => {
//   return await Loan.findAll({
//     where,
//     order,
//     limit,
//     offset,
//     include
//   });
// };

export const getAll = async () => {
  return await Loan.findAll({
    attributes: ['withdrawalTime', 'retiredDate'],
    include: [
      {
        model: Partner,
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname']
      },
      {
        model: LoanBook,
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        include: [
          {
            model: Book,
            attributes: ['title']
          }
        ]
      },
      {
        model: Employees,
        attributes: ['name']
      }
    ]
  });
};

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

export const remove = async (id) =>{
    const loan = await Loan.findByPk(id);

      if (!loan) {
        return null;
      }
    await loan.destroy();
  
    return {
        msg: "Loan deleted successfully",
        data: loan
    }
}
