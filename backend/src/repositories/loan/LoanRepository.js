import sequelize from '../../configs/database.js';
import Sequelize from 'sequelize';

import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import Partner from '../../models/partner/partner.js';
import LoanType from '../../models/loan/LoanType.js';
import BookType from "../../models/options/BookType.js";
import { formatDate } from '../../utils/date/formatDate.js';

import reasonForWithDrawal from '../../models/partner/reasonForWithDrawal.js';

import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';
import * as LoanBookRepository from '../../repositories/loan/LoanBookRepository.js';
import * as LoanTypeRepository from '../../repositories/loan/LoanTypeRepository.js';


import { ValidationError } from '../../utils/errors/ValidationError.js';

import { Op } from 'sequelize';

const formatDateLoan = (date) => {
  if (!date) return '';

  const d = new Date(date);

  const day = String(d.getUTCDate()).padStart(2, '0');
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const year = d.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

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


export const getAllReturns = async (filters = {}) => {
  const {
    wherePartner = {},
    order,
    limit,
    offset
  } = filters;

  const { rows: idRows, count } = await LoanBook.findAndCountAll({
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
        required: true,
        include: [
          {
            model: Partner,
            as: 'Partner',
            attributes: [],
            required: true,
            where: Object.keys(wherePartner).length
              ? wherePartner
              : undefined
          }
        ]
      }
    ],
    distinct: true,
    col: 'LoanBookId',
    order,
    limit,
    offset,
    subQuery: false
  });

  const ids = idRows.map(r => r.LoanBookId);

  if (!ids.length) {
    return { rows: [], count };
  }

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
            attributes: ['id', 'name', 'surname', 'observations', 'partnerNumber']
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

  const rows = returns.map(lb => ({
    id: lb.LoanBookId,
    bookCode: lb.Book.codeInventory,
    bookTitle: lb.Book.title,
    renewes: lb.reneweAmount || 0,
    retiredDate: lb.Loan.retiredDate,
    partnerName: lb.Loan.Partner.name,
    partnerSurname: lb.Loan.Partner.surname,
    partnerNumber: lb.Loan.Partner.partnerNumber,
  }));

  return { rows, count };
};

export const getOne = async (id) => {
  return await Loan.findByPk(id);
}

export const getReturnPrintList = async (filters = {}) => {
  const { limit, offset } = filters;

  const { rows, count } = await LoanBook.findAndCountAll({

    attributes: [
      'bookCode',
      'expectedDate',
      'returnedDate',
      [Sequelize.col('Book.titulo'), 'bookTitle'],
      [Sequelize.col('Book.codigo'), 'bookCodeInventory'],
      [Sequelize.col('Loan.Partner.numero'), 'partnerNumber'],
      [Sequelize.col('Loan.Partner.apellido'), 'partnerSurname'],
      [Sequelize.col('Loan.Partner.nombre'), 'partnerName'],
      [Sequelize.col('Loan.Partner.dir_part'), 'homeAddress'],
      [Sequelize.col('Loan.FechaRetiro'), 'retiredDate'],
    ],
    include: [
      {
        model: Book,
        as: 'Book',
        attributes: [],
        required: true,
      },
      {
        model: Loan,
        as: 'Loan',
        attributes: [],
        required: true,
        include: [{
          model: Partner,
          as: 'Partner',
          attributes: [],
          required: true
        }]
      }
    ],

    order: [[Sequelize.literal('"Loan->Partner"."numero"'), 'ASC']],
    limit,
    offset,
    raw: true,
  });


  const formattedRows = rows.map(r => ({
    bookTitle: r.bookTitle || '',
    bookCode: r.bookCodeInventory || r.bookCode || '',
    partnerNumber: r.partnerNumber || '',
    partnerName: `${r.partnerSurname || ''} ${r.partnerName || ''}`,
    partnerAddress: r.homeAddress || '',
    retiredDate: formatDateLoan(r.retiredDate),
    expectedDate: formatDateLoan(r.expectedDate),
    returnedDate: formatDateLoan(r.returnedDate)
  }));

  return { rows: formattedRows, count };
};

export const getPhonePrintList = async (filters = {}) => {
  const { limit, offset } = filters;

  const { rows, count } = await LoanBook.findAndCountAll({

    attributes: [
      'bookCode',
      'expectedDate',
      [Sequelize.col('Book.titulo'), 'bookTitle'],
      [Sequelize.col('Book.codigo'), 'bookCodeInventory'],
      [Sequelize.col('Loan.Partner.numero'), 'partnerNumber'],
      [Sequelize.col('Loan.Partner.apellido'), 'partnerSurname'],
      [Sequelize.col('Loan.Partner.nombre'), 'partnerName'],
      [Sequelize.col('Loan.Partner.tel_part'), 'partnerPhone'],
      [Sequelize.col('Loan.FechaRetiro'), 'retiredDate'],
    ],
    include: [
      {
        model: Book,
        as: 'Book',
        attributes: [],
        required: true,
      },
      {
        model: Loan,
        as: 'Loan',
        attributes: [],
        required: true,
        include: [{
          model: Partner,
          as: 'Partner',
          attributes: [],
          required: true
        }]
      }
    ],
    order: [[Sequelize.literal('"Loan->Partner"."numero"'), 'ASC']],
    limit,
    offset,
    raw: true,
  });

  const formattedRows = rows.map(r => ({
    bookTitle: r.bookTitle || '',
    bookCode: r.bookCodeInventory || r.bookCode || '',
    partnerNumber: r.partnerNumber || '',
    partnerName: `${r.partnerSurname || ''} ${r.partnerName || ''}`,
    partnerPhone: r.partnerPhone || '',
    retiredDate: formatDateLoan(r.retiredDate),
    expectedDate: formatDateLoan(r.expectedDate)
  }));

  return { rows: formattedRows, count };
};


export const getPartnerPrintList = async (filters = {}) => {
  const { limit, offset } = filters;

  const { rows, count } = await Partner.findAndCountAll({
    attributes: [
      'partnerNumber',
      'surname',
      'name',
      'homeAddress',
      'homePhone',
      'isActive',
      'withdrawalDate',
      'idReason',
      'presentedBy',
      'registrationDate',

      // 🔹 Motivo de baja (texto)
      [Sequelize.col('ReasonForWithdrawal.Motivo'), 'reason'],

      // // 🔹 TOTAL libros prestados (histórico)
      // [
      //   Sequelize.literal(`(
      //     SELECT COUNT(*)
      //     FROM "PrestamoLibro" AS lb
      //     INNER JOIN "Prestamo" AS l ON lb."IdPrestamo" = l."Id"
      //     WHERE l."NumSocio" = "Partner"."id"
      //   )`),
      //   'totalBorrowedBooks'
      // ],

      // // 🔹 CUOTAS IMPAGAS
      // [
      //   Sequelize.literal(`(
      //     SELECT COUNT(*)
      //     FROM "Cuotas" AS f
      //     WHERE f."IdSocio" = "Partner"."id"
      //     AND f."Paga" = false
      //   )`),
      //   'unpaidFees'
      // ],

      // // 🔹 LIBROS PENDIENTES (no devueltos)
      // [
      //   Sequelize.literal(`(
      //     SELECT COUNT(*)
      //     FROM "PrestamoLibro" AS lb
      //     INNER JOIN "Prestamo" AS l ON lb."IdPrestamo" = l."Id"
      //     WHERE l."NumSocio" = "Partner"."id"
      //     AND lb."FechaDevolucion" IS NULL
      //   )`),
      //   'pendingBooks'
      // ]
    ],

    include: [
      {
        model: reasonForWithDrawal,
        as: "ReasonForWithdrawal",
        attributes: ["reason"],
      },
    ],

    order: [['partnerNumber', 'ASC']],

    limit,
    offset,

    raw: true,
    subQuery: false
  });

  const formattedRows = rows.map(p => ({
    partnerNumber: p.partnerNumber || '',
    partnerName: `${p.surname || ''} ${p.name || ''}`.trim(),

    partnerAddress: p.homeAddress || '',
    partnerPhone: p.homePhone || '',

    isActive: p.isActive === 1 ? 'Activo' : 'Inactivo',

    totalBorrowedBooks: parseInt(p.totalBorrowedBooks, 10) || 0,
    unpaidFees: parseInt(p.unpaidFees, 10) || 0,
    pendingBooks: parseInt(p.pendingBooks, 10) || 0,

    withdrawalDate: formatDateLoan(p.withdrawalDate),
    idReason: p.reason || '', // 🔥 ahora muestra el motivo real

    presentedBy: p.presentedBy || '',
    registrationDate: formatDateLoan(p.registrationDate),
  }));

  return {
    rows: formattedRows,
    count
  };
};

export const create = async (loanData, transaction = null) => {
  return await Loan.create(loanData, { transaction });
};


export const update = async (id, updates) => {
  if (!updates.books || updates.books.length === 0) {
    throw new ValidationError("No se puede actualizar el préstamo sin libros");
  }

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(null, updates.employeeCode);
    if (!employee) throw new ValidationError("Empleado no existe");

    const currentLoan = await Loan.findByPk(id, {
      include: [{ model: LoanBook, as: 'LoanBooks' }],
      transaction
    });
    if (!currentLoan) throw new ValidationError("No existe el préstamo");

    const partnerId = currentLoan.partnerId;

    const oldPendingCount = currentLoan.LoanBooks.filter(lb => !lb.returned).length;

    const loanData = {
      retiredDate: updates.retiredDate,
      employeeId: employee.id,
    };

    await Loan.update(loanData, { where: { id }, transaction });

    await LoanBookRepository.removeAllLoanBooks(id, transaction);

    const newLoanBooks = updates.books.map((book) => ({
      BookId: book.BookId,
      loanId: id,
      bookCode: book.BookCode,
      expectedDate: updates.expectedDate,
      reneweAmount: book.renewes || 0,
      returned: book.returned === "Sí" || book.returned === true,
      returnedDate: (book.returned === "Sí" || book.returned === true)
        ? (book.returnedDate || new Date())
        : null,
    }));

    await Promise.all(
      newLoanBooks.map((book) => LoanBookRepository.create(book, transaction))
    );

    const newPendingCount = newLoanBooks.filter(lb => !lb.returned).length;

    const diff = newPendingCount - oldPendingCount;

    if (diff > 0) {
      await PartnerRepository.changePendingBooks("increment", partnerId, diff, transaction);
    } else if (diff < 0) {
      await PartnerRepository.changePendingBooks("decrement", partnerId, Math.abs(diff), transaction);
    }

    await transaction.commit();

    return {
      msg: "Préstamo y libros actualizados correctamente",
      loanId: id,
    };
  } catch (err) {
    if (transaction) await transaction.rollback();
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
