import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import Partner from '../../models/partner/Partner.js';
import LoanType from '../../models/loan/LoanType.js';
import BookType from "../../models/options/BookType.js";

export const getAll = async (filters) => {
  const {
    whereLoan,
    whereLoanType,
    whereLoanBook,
    whereBookType,
    wherePartner,
    whereBook,
    whereEmployee,
    order,
    limit,
    offset
  } = filters;

  return await Loan.findAll({
    attributes: ['withdrawalTime', 'retiredDate'],
    where: whereLoan,
    include: [
      {
        model: LoanType,
        attributes: ['description'],
        where: Object.keys(whereLoanType).length ? whereLoanType : undefined, //solo se intentan aplicar los filtros si existen
        required: Object.keys(whereLoanType).length > 0 //si no hay filtros aplicados se traen los datos igual
      },
      {
        model: Partner,
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname'],
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: Object.keys(wherePartner).length > 0
      },
      {
        model: LoanBook,
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
        required: Object.keys(whereLoanBook).length > 0,
        include: [
          {
            model: Book,
            attributes: ['title'],
            where: Object.keys(whereBook).length ? whereBook : undefined,
            required: Object.keys(whereBook).length > 0,
            include: [
              {
                model: BookType,
                attributes: ["typeName"],
                where: Object.keys(whereBookType).length ? whereBookType : undefined,
                required: Object.keys(whereBookType).length > 0
              }
            ]
          }
        ]
      },
      {
        model: Employees,
        attributes: ['name'],
        where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
        required: Object.keys(whereEmployee).length > 0
      }
    ],
    order,
    limit,
    offset
  });
};

export const getAllReturns = async (filters) => {
  const {
    wherePartner,
    order,
    limit,
    offset
  } = filters;

  return await Loan.findAll({
    attributes: ['retiredDate'],
    include: [
      {
        model: Partner,
        attributes: ['id', 'name', 'surname', 'observations'],
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: Object.keys(wherePartner).length > 0
      },
      {
        model: LoanBook,
        attributes: ['LoanBookId', 'bookCode', 'expectedDate', 'reneweAmount'],
        include: [
          {
            model: Book,
            attributes: ['BookId', 'title'],
          }
        ]
      }
    ],
    order,
    limit,
    offset
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

export const remove = async (id) => {
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
