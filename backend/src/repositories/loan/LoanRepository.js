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
        required: Object.keys(wherePartner).length > 0
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
        required: Object.keys(whereLoanBook).length > 0,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            where: Object.keys(whereBook).length ? whereBook : undefined,
            required: Object.keys(whereBook).length > 0,
            include: [
              {
                model: BookType,
                as: 'BookType',
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
        as: 'Employee',
        attributes: ['name'],
        where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
        required: Object.keys(whereEmployee).length > 0
      }
    ],
    order,
    limit,
    offset
  });

  // 🔁 Transformar a array plano
  const flatLoans = loans.flatMap(loan =>
    loan.LoanBooks.map(loanBook => ({
      loanId: loan?.id || '',
      codeInventory: loanBook.Book?.codeInventory || loanBook.bookCode,
      title: loanBook.Book?.title || '',
      name: `${loan.Partner?.name || ''} ${loan.Partner?.surname || ''}`,
      surname: loan.Partner?.surname || '',
      partnerNumber: loan.Partner?.partnerNumber || '',
      homePhone:  loan.Partner?.homePhone || '',
      homeAddress:  loan.Partner?.homeAddress || '',
      retiredDate: loan.retiredDate,
      withdrawalTime: loan?.withdrawalTime || '',
      expectedDate: loanBook.expectedDate,
      returnedDate: loanBook.returnedDate,
      loanType: loan.LoanType?.description || '',
      employee: loan.Employee?.name || '',
      partnerId: loan.Partner?.id || null
    }))
  );

  return flatLoans;
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
        as: 'Partner',
        attributes: ['id', 'name', 'surname', 'observations'],
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: Object.keys(wherePartner).length > 0
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['LoanBookId', 'expectedDate', 'reneweAmount'],
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['BookId', 'title', 'codeInventory'],
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


  /*
  //ej res que viene del front 
  {
  codeInventory: 'LB002', 
  title: 'Cien Años de Soledad',
  partnerName: 'sdsadsad',
  partnerNumber: '34343',
  retiredDate: '2025-10-23',
  expectedDate: '2025-10-23',
  retiredHour: '11:00',
  code: '3434'
  }

  //hay que crear los loan books.

  //mediante el partnerNumber conseguir el partnerId para loan
  //mediante el codeInventory conseguir el bookId para bookloan,
  //mediante el id del loan recien creado conseguir el loanId para bookloan,
  //mediante el code conseguir el employeeId

  pasos:
  1- crear el loan
  2- crear todos los bookloans
  */
  //return await Loan.create(loan);


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
    //withdrawalTime por nuevo input de hora en front
    employeeId: employee.id,
    name: partner.name,
    //dni por reader
  }

  
  const newLoan = await Loan.create(loanData);

  await Promise.all(loan.books.map(book => {
    const loanBook = { 
      BookId: book.BookId,
      loanId: newLoan.id,
      bookCode: book.codeInventory,
      expectedDate: loan.expectedDate,
      reneweAmount: 0,
      returned: false,
      //copy: obtener mediante count 
    };

    return LoanBookRepository.create(loanBook);
  }));

  
  return {
    msg: "Loan created",
  }
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
