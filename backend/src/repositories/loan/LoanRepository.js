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

import { formatDate } from '../../utils/date/formatDate.js';

import { ValidationError } from '../../utils/errors/ValidationError.js';

import { Op } from 'sequelize';

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

  // COUNT TOTAL (sin limit/offset)
  const count = await Loan.count({
    where: whereLoan,
    distinct: true,
    col: 'Id',
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        where: Object.keys(whereLoanType).length ? whereLoanType : undefined,
        required: Object.keys(whereLoanType).length > 0
      },
      {
        model: Partner,
        as: 'Partner',
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: true
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        required: true,
        where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
        include: [
          {
            model: Book,
            as: 'Book',
            where: Object.keys(whereBook).length ? whereBook : undefined,
            include: [
              {
                model: BookType,
                as: 'BookType',
                where: Object.keys(whereBookType).length ? whereBookType : undefined
              }
            ]
          }
        ]
      },
      {
        model: Employees,
        as: 'Employee',
        where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
        required: Object.keys(whereEmployee).length > 0
      }
    ]
  });

  // IDs paginados (para que limit funcione bien)
  const loanIds = await Loan.findAll({
    attributes: ['Id'],
    where: whereLoan,
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        where: Object.keys(whereLoanType).length ? whereLoanType : undefined,
        required: Object.keys(whereLoanType).length > 0
      },
      {
        model: Partner,
        as: 'Partner',
        where: Object.keys(wherePartner).length ? wherePartner : undefined,
        required: true
      }
    ],
    order,
    limit,
    offset,
    raw: true
  });

  const ids = loanIds.map(l => l.Id);

  if (!ids.length) {
    return {
      rows: [],
      count
    };
  }

  const loans = await Loan.findAll({
    where: { id: ids },
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        attributes: ['description']
      },
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname', 'partnerNumber']
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        required: true,
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        where: Object.keys(whereLoanBook).length ? whereLoanBook : undefined,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            where: Object.keys(whereBook).length ? whereBook : undefined,
            include: [
              {
                model: BookType,
                as: 'BookType',
                attributes: ['typeName'],
                where: Object.keys(whereBookType).length ? whereBookType : undefined
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
    order
  });

  const rows = loans.map(loan => ({
    loanId: loan?.id || '',
    retiredDate: formatDate(loan.retiredDate),
    expectedDate: formatDate(loan.LoanBooks?.[0]?.expectedDate),
    returnedDate: formatDate(loan.LoanBooks?.[0]?.returnedDate),
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

  return {
    rows,
    count
  };
};

export const getAllReturns = async (filters) => {
  const {
    wherePartner,
    order,
    limit,
    offset
  } = filters;

  const loanBookIds = await LoanBook.findAll({
    attributes: ['LoanBookId'],
    where: {
      returnedDate: {
        [Op.ne]: null
      }
    },
    include: [
      {
        model: Loan,
        as: 'Loan',
        attributes: [],
        include: [
          {
            model: Partner,
            as: 'Partner',
            attributes: [],
            where: Object.keys(wherePartner).length
              ? wherePartner
              : undefined,
            required: true
          }
        ]
      }
    ],
    order,
    limit,
    offset,
    raw: true
  });

  const ids = loanBookIds.map(lb => lb.LoanBookId);

  if (!ids.length) return [];

  const returns = await LoanBook.findAll({
    where: {
      LoanBookId: ids
    },
    attributes: ['LoanBookId', 'expectedDate', 'reneweAmount'],
    include: [
      {
        model: Loan,
        as: 'Loan',
        attributes: ['retiredDate'],
        include: [
          {
            model: Partner,
            as: 'Partner',
            attributes: ['id', 'name', 'surname', 'observations']
          }
        ]
      },
      {
        model: Book,
        as: 'Book',
        attributes: ['BookId', 'title', 'codeInventory'],
        required: true
      }
    ]
  });

  return returns.map(lb => ({
    id: lb.LoanBookId,
    bookCode: lb.Book.codeInventory,
    bookTitle: lb.Book.title,
    renewes: lb.reneweAmount,
    retiredDate: lb.Loan.retiredDate,
    partnerName: lb.Loan.Partner.name,
    partnerSurname: lb.Loan.Partner.surname
  }));
};

export const getReturnsCount = async (filters) => {
  const {
    wherePartner
  } = filters;

  const total = await LoanBook.count({
    where: {
      returnedDate: {
        [Op.ne]: null
      }
    },
    include: [
      {
        model: Loan,
        as: 'Loan',
        required: true,
        include: [
          {
            model: Partner,
            as: 'Partner',
            required: true,
            where: Object.keys(wherePartner).length
              ? wherePartner
              : undefined
          }
        ]
      }
    ],
    distinct: true,
    col: 'LoanBookId'
  });

  return total;
};



export const getOne = async (id) => {
  return await Loan.findByPk(id);
}


export const getReturnPrintList = async () => {
  const loans = await Loan.findAll({
    attributes: ['id', 'withdrawalTime', 'retiredDate'],
    subQuery: false,
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        attributes: ['description'],
        required: true
      },
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname', 'partnerNumber'],
        required: true,
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        required: true,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            required: true,
            include: [
              {
                model: BookType,
                as: 'BookType',
                attributes: ["typeName"],
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
        required: true
      }
    ],
    // order,
    // limit,
    // offset
  });

  const flatLoans = loans.flatMap(loan =>
    loan.LoanBooks.map(loanBook => ({
      bookTitle: loanBook.Book?.title || '',
      bookCode: loanBook.Book?.codeInventory || loanBook.bookCode || '',
      partnerNumber: loan.Partner?.partnerNumber || '',
      partnerName: `${loan.Partner?.surname || ''} ${loan.Partner?.name || ''}`,
      partnerAddress: loan.Partner?.homeAddress || '',
      retiredDate: formatDate(loan.retiredDate),
      expectedDate: formatDate(loanBook.expectedDate),
      returnedDate: formatDate(loanBook.returnedDate)
    }))
  );

  return flatLoans;
};

export const getPhonePrintList = async () => {
  const loans = await Loan.findAll({
    attributes: ['id', 'withdrawalTime', 'retiredDate'],
    subQuery: false,
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        attributes: ['description'],
        required: true
      },
      {
        model: Partner,
        as: 'Partner',
        attributes: ['id', 'homePhone', 'homeAddress', 'name', 'surname', 'partnerNumber'],
        required: true,
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        required: true,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            required: true,
            include: [
              {
                model: BookType,
                as: 'BookType',
                attributes: ["typeName"],
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
        required: true
      }
    ],
    // order,
    // limit,
    // offset
  });

  const flatLoans = loans.flatMap(loan =>
    loan.LoanBooks.map(loanBook => ({
      bookTitle: loanBook.Book?.title || '',
      bookCode: loanBook.Book?.codeInventory || loanBook.bookCode || '',
      partnerNumber: loan.Partner?.partnerNumber || '',
      partnerName: `${loan.Partner?.surname || ''} ${loan.Partner?.name || ''}`,
      partnerPhone: loan.Partner?.homePhone || '',
      retiredDate: formatDate(loan.retiredDate),
      expectedDate: formatDate(loanBook.expectedDate),
    }))
  );

  return flatLoans;
};

export const getPartnerPrintList = async () => {
  const loans = await Loan.findAll({
    attributes: ['id', 'withdrawalTime', 'retiredDate'],
    subQuery: false,
    include: [
      {
        model: LoanType,
        as: 'LoanType',
        attributes: ['description'],
        required: true
      },
      {
        model: Partner,
        as: 'Partner',
        attributes: [
          'id',
          'homePhone',
          'homeAddress',
          'name',
          'surname',
          'partnerNumber'
        ],
        required: true
      },
      {
        model: LoanBook,
        as: 'LoanBooks',
        attributes: ['bookCode', 'expectedDate', 'returnedDate'],
        required: true,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            required: true,
            include: [
              {
                model: BookType,
                as: 'BookType',
                attributes: ['typeName'],
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
        required: true
      }
    ]
  });

  const partnerMap = {};

  for (const loan of loans) {
    const partner = loan.Partner;
    if (!partner) continue;

    const partnerId = partner.id;

    if (!partnerMap[partnerId]) {
      partnerMap[partnerId] = {
        partnerNumber: partner.partnerNumber || '',
        partnerName: `${partner.surname || ''} ${partner.name || ''}`,
        partnerAddress: partner.homeAddress || '',
        partnerPhone: partner.homePhone || '',
        bookAmount: 0
      };
    }

    partnerMap[partnerId].bookAmount += loan.LoanBooks.length;
  }

  return Object.values(partnerMap);
};

export const create = async (loanData, transaction = null) => {
  return await Loan.create(loanData, { transaction });
};


export const update = async (id, updates) => {
  if (!updates.books || updates.books.length === 0) {
    throw new ValidationError("No se puede actualizar el préstamo sin libros");
  }

  if (!updates.employeeCode || updates.employeeCode.trim() === "") {
    throw new ValidationError("El campo código de empleado no puede estar vacío");
  }

  if (updates.loanType === "retired") {
    if (!updates.retiredDate || updates.retiredDate.trim() === "") {
      throw new ValidationError("La fecha de retiro no puede estar vacía");
    }
  } else {
    if (!updates.expectedDate || updates.expectedDate.trim() === "") {
      throw new ValidationError("La fecha prevista de devolución no puede estar vacía");
    }
  }

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(updates.employeeCode);
    if (!employee) {
      throw new ValidationError("Empleado no existe");
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
      throw new ValidationError("No se pudo actualizar el préstamo");
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
      returnedDate: book.returnedDate || null,
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

export const getLoansByEmployeeCount = async (filters) => {
  const replacements = {};
  let baseQuery = `
    SELECT "Empleados"."Nombre", COUNT(DISTINCT "Prestamo"."Id") AS "Cantidad"
    FROM "Prestamo"
    INNER JOIN "Empleados" ON "Prestamo"."IdEmpleado" = "Empleados"."Id"
  `;

  if (filters.ignoreLossDate === 'devueltos') {
    baseQuery += `
    WHERE "Prestamo"."Id" IN (
      SELECT "IdPrestamo"
      FROM "PrestamoLibro"
      GROUP BY "IdPrestamo"
      HAVING COUNT(*) = COUNT("FechaDevolucion")
         AND COUNT(*) = COUNT(CASE WHEN "FechaDevolucion" > "FechaPrevista" THEN 1 END)
         AND COUNT(*) = COUNT(CASE 
                                WHEN (${filters.afterDateFrom ? '"FechaDevolucion" >= :afterDateFrom' : '1=1'})
                                 AND (${filters.beforeDateTo ? '"FechaDevolucion" <= :beforeDateTo' : '1=1'})
                                THEN 1 END)
    )
    GROUP BY "Empleados"."Nombre"
  `;

    if (filters.afterDateFrom) replacements.afterDateFrom = filters.afterDateFrom;
    if (filters.beforeDateTo) replacements.beforeDateTo = filters.beforeDateTo;
  }
  else if (filters.ignoreLossDate === 'sinDevolver') {
    // Join normal, pero todos sin devolver
    baseQuery += `
      INNER JOIN "PrestamoLibro" ON "Prestamo"."Id" = "PrestamoLibro"."IdPrestamo"
      WHERE "PrestamoLibro"."FechaDevolucion" IS NULL
      ${filters.afterDateFrom ? 'AND "PrestamoLibro"."FechaPrevista" >= :afterDateFrom' : ''}
      ${filters.beforeDateTo ? 'AND "PrestamoLibro"."FechaPrevista" <= :beforeDateTo' : ''}
      GROUP BY "Empleados"."Nombre"
    `;

    if (filters.afterDateFrom) replacements.afterDateFrom = filters.afterDateFrom;
    if (filters.beforeDateTo) replacements.beforeDateTo = filters.beforeDateTo;

  } else {
    const conditions = [];
    if (filters.afterDateFrom) {
      conditions.push(`"PrestamoLibro"."FechaDevolucion" >= :afterDateFrom`);
      replacements.afterDateFrom = filters.afterDateFrom;
    }
    if (filters.beforeDateTo) {
      conditions.push(`"PrestamoLibro"."FechaDevolucion" <= :beforeDateTo`);
      replacements.beforeDateTo = filters.beforeDateTo;
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    baseQuery += `
      INNER JOIN "PrestamoLibro" ON "Prestamo"."Id" = "PrestamoLibro"."IdPrestamo"
      ${whereClause}
      GROUP BY "Empleados"."Nombre"
    `;
  }

  const [results] = await sequelize.query(baseQuery, { replacements });
  return results;
};
