import sequelize from '../../configs/database.js';

import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import Partner from '../../models/partner/Partner.js';
import LoanType from '../../models/loan/LoanType.js';
import BookType from "../../models/options/BookType.js";

import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';
import * as LoanBookRepository from '../../repositories/loan/LoanBookRepository.js';
import * as LoanTypeRepository from '../../repositories/loan/LoanTypeRepository.js';

import { Op } from 'sequelize';

// export const getAll = async (filters) => {
//   const {
//     whereLoan,
//     whereLoanType,
//     whereLoanBook,
//     whereBookType,
//     wherePartner,
//     whereBook,
//     whereEmployee,
//     order,
//     limit,
//     offset
//   } = filters;

//   return await Loan.findAll({
//     attributes: ['withdrawalTime', 'retiredDate'],
//     where: whereLoan,
//     subQuery: false,
//     include: [
//       {
//         model: LoanType,
//         as: 'LoanType',
//         attributes: ['description'],
//         where: Object.keys(whereLoanType).length ? whereLoanType : undefined, //solo se intentan aplicar los filtros si existen
//         required: Object.keys(whereLoanType).length > 0 //si no hay filtros aplicados se traen los datos igual
//       },
//       {
//         model: Partner,
//         as: 'Partner',
//         attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname'],
//         where: Object.keys(wherePartner).length ? wherePartner : undefined,
//         required: Object.keys(wherePartner).length > 0
//       },
//       {
//         model: LoanBook,
//         as: 'LoanBooks',
//         attributes: ['bookCode', 'expectedDate', 'returnedDate'],
//         where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
//         required: Object.keys(whereLoanBook).length > 0,
//         include: [
//           {
//             model: Book,
//             as: 'Book',
//             attributes: ['title'],
//             where: Object.keys(whereBook).length ? whereBook : undefined,
//             required: Object.keys(whereBook).length > 0,
//             include: [
//               {
//                 model: BookType,
//                 as: 'BookType',
//                 attributes: ["typeName"],
//                 where: Object.keys(whereBookType).length ? whereBookType : undefined,
//                 required: Object.keys(whereBookType).length > 0
//               }
//             ]
//           }
//         ]
//       },
//       {
//         model: Employees,
//         as: 'Employee',
//         attributes: ['name'],
//         where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
//         required: Object.keys(whereEmployee).length > 0
//       }
//     ],
//     order,
//     limit,
//     offset
//   });
// };

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

  const loans = await Loan.findAll({
    attributes: ['id', 'withdrawalTime', 'retiredDate'],
    where: whereLoan,
    subQuery: false,
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        attributes: ['description'],
        where: Object.keys(whereLoanType).length ? whereLoanType : undefined,
        required: Object.keys(whereLoanType).length > 0
      },
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname', 'partnerNumber'],
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: true,
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
        required: true,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            where: Object.keys(whereBook).length ? whereBook : undefined,
            required: true,
            include: [
              {
                model: BookType,
                as: 'BookType',
                attributes: ["typeName"],
                where: Object.keys(whereBookType).length ? whereBookType : undefined,
                required: true
              }
            ]
          }
        ]
      },
      {
        model: Employees,
        as: 'Employee',
        attributes: ['name', 'code'],
        where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
        required: Object.keys(whereEmployee).length > 0
      }
    ],
    order,
    limit,
    offset
  });

  const groupedLoans = loans.map(loan => ({
    loanId: loan?.id || '',
    retiredDate: loan.retiredDate,
    expectedDate: loan.LoanBooks?.[0]?.expectedDate || '',
    returnedDate: loan.LoanBooks?.[0]?.returnedDate || '',
    withdrawalTime: loan?.withdrawalTime || '',
    loanType: loan.LoanType?.description || '',
    employee: loan.Employee?.name || '',
    employeeCode: loan.Employee?.code || '',
    partnerId: loan.Partner?.id || null,
    partnerNumber: loan.Partner?.partnerNumber || '',
    name: `${loan.Partner?.name || ''} ${loan.Partner?.surname || ''}`,
    surname: loan.Partner?.surname || '',
    homePhone: loan.Partner?.homePhone || '',
    homeAddress: loan.Partner?.homeAddress || '',
    books: loan.LoanBooks.map(book => ({
      codeInventory: book.Book?.codeInventory || book.bookCode,
      title: book.Book?.title || '',
      typeName: book.Book.BookType?.typeName || ''
    }))
  }));


  return groupedLoans;
};

export const getAllReturns = async (filters) => {
  const {
    wherePartner,
    order,
    limit,
    offset
  } = filters;

  const returns = await Loan.findAll({
    attributes: ['retiredDate'],
    subQuery: false,
    include: [
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'name', 'surname', 'observations'],
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: true
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['LoanBookId', 'expectedDate', 'reneweAmount'],
        where: {
          returnedDate: null
        },
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['BookId', 'title', 'codeInventory'],
            required: true

          }
        ]
      }
    ],
    order,
    limit,
    offset
  });

  const floatReturns = returns.flatMap(loan =>
    loan.LoanBooks.map(lb => ({
      bookCode: lb.Book.codeInventory,
      bookTitle: lb.Book.title,
      renewes: lb.reneweAmount,
    }))
  );

  return floatReturns;
};

export const getOne = async (id) => {
  return await Loan.findByPk(id);
}

export const create = async (loan) => {
  if (!loan.books || loan.books.length === 0) {
    throw new Error("No se puede crear un préstamo sin libros");
  }

  console.log(loan);

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(loan.employeeCode);
    if (!employee) {
      throw new Error("Empleado no existe");
    }

    const partner = await PartnerRepository.getOneByPartnerNumber(loan.partnerNumber);
    if (!partner) {
      throw new Error("Socio no existe");
    }

    const loanType = await LoanTypeRepository.getOneByDescription(loan.loanType);

    const loanData = {
      partnerId: partner.id,
      loanType: loanType.id,
      retiredDate: loan.retiredDate,
      employeeId: employee.id,
      name: partner.name,
    };

    const newLoan = await Loan.create(loanData, { transaction });

    const loanBooks = loan.books.map(book => ({
      BookId: book.BookId,
      loanId: newLoan.id,
      bookCode: book.codeInventory,
      expectedDate: loan.expectedDate,
      reneweAmount: 0,
      returned: false,
    }));

    await Promise.all(
      loanBooks.map(book => LoanBookRepository.create(book, transaction))
    );

    await transaction.commit();

    return {
      msg: "Préstamo creado correctamente",
      loanId: newLoan.id,
      partnerNumber: loan.partnerNumber
    };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};


export const update = async (id, updates) => {
  if (!updates.books || updates.books.length === 0) {
    throw new Error("No se puede actualizar el préstamo sin libros");
  }

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(updates.employeeCode);
    if (!employee) {
      throw new Error("Empleado no existe");
    }

    // Actualiza los datos del préstamo
    const loanData = {
      retiredDate: updates.retiredDate,
      employeeId: employee.id,
    };

    const [updatedCount] = await Loan.update(loanData, {
      where: { id },
      transaction,
    });

    if (updatedCount === 0) {
      throw new Error("No se pudo actualizar el préstamo");
    }

    // Elimina los registros previos
    await LoanBookRepository.removeAllLoanBooks(id, transaction);

    const newLoanBooks = updates.books.map((book) => ({
      BookId: book.BookId,
      loanId: id,
      bookCode: book.codeInventory,
      expectedDate: updates.expectedDate,
      reneweAmount: book.renewes || 0,
      returned: book.returned === "Sí" || book.returned === true,
      returnedDate: book.returnedDate ? new Date(book.returnedDate) : null, // <- nombre correcto
    }));

    await Promise.all(
      newLoanBooks.map((book) => LoanBookRepository.create(book, transaction))
    );

    await transaction.commit();

    return {
      msg: "Préstamo y libros actualizados correctamente",
      loanId: id,
    };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

export const remove = async (id) => {
  const loan = await Loan.findByPk(id);

  if (!loan) {
    return null;
  }

  await loan.destroy();

  return {
    msg: "Loan deleted successfully",
  }
}