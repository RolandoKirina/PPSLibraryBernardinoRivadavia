import Reader from '../../models/reader/reader.js';
import ReaderBook from '../../models/reader/ReaderBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import sequelize from '../../configs/database.js';
import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as ReaderBookRepository from '../../repositories/reader/ReaderBookRepository.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';
import { formatDate } from '../../utils/date/formatDate.js';
export const getAll = async (filters) => {
  const {
    whereReader,
    whereReaderBook,
    whereBook,
    whereEmployee,
    order,
    limit,
    offset
  } = filters;

  const count = await Reader.count({
    col: 'DNI',
    where: Object.keys(whereReader).length ? whereReader : undefined,
    include: [
      {
        model: ReaderBook,
        as: 'ReaderBooks',
        required: true,
        where: Object.keys(whereReaderBook).length ? whereReaderBook : undefined,
        include: [
          {
            model: Book,
            as: 'Book',
            where: Object.keys(whereBook).length ? whereBook : undefined
          },
          {
            model: Employees,
            as: 'Employee',
            where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
            required: Object.keys(whereEmployee).length > 0
          }
        ]
      }
    ]
  });

  const readerIds = await Reader.findAll({
    attributes: ['dni', 'name'],
    where: Object.keys(whereReader).length ? whereReader : undefined,
    include: [
      {
        model: ReaderBook,
        as: 'ReaderBooks',
        required: true,
        where: Object.keys(whereReaderBook).length ? whereReaderBook : undefined
      }
    ],
    order,
    limit,
    offset,
    raw: true
  });

  const ids = readerIds.map(r => r.dni);

  if (!ids.length) {
    return {
      rows: [],
      count
    };
  }

  const readers = await Reader.findAll({
    where: { dni: ids },
    attributes: ['dni', 'name'],
    include: [
      {
        model: ReaderBook,
        as: 'ReaderBooks',
        required: true,
        where: Object.keys(whereReaderBook).length ? whereReaderBook : undefined,
        attributes: [
          'ReaderBookId',
          'retiredDate',
          'returnedDate',
          'retiredHour',
          'returnedHour'
        ],
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['codeInventory', 'title'],
            where: Object.keys(whereBook).length ? whereBook : undefined
          },
          {
            model: Employees,
            as: 'Employee',
            attributes: ['id', 'name', 'code'],
            where: Object.keys(whereEmployee).length ? whereEmployee : undefined,
            required: Object.keys(whereEmployee).length > 0
          }
        ]
      }
    ],
    order
  });

  const rows = readers.flatMap(reader =>
    reader.ReaderBooks.map(rb => ({
      dni: reader.dni,
      name: reader.name,
      bookCode: rb.Book?.codeInventory ?? '',
      bookTitle: rb.Book?.title ?? '',
      retiredDate: formatDate(rb.retiredDate),
      retiredHour: rb.retiredHour ?? '',
      returnedDate: formatDate(rb.returnedDate),
      returnedHour: rb.returnedHour ?? '',
      employee: rb.Employee?.name ?? '',
      employeeCode: rb.Employee?.code ?? '',
      id: rb.ReaderBookId
    }))
  );

  return {
    rows,
    count
  };
};


export const getOne = async (id) => {
  return await Reader.findByPk(id);
};
export const create = async (data) => {

  if (!data.books || data.books.length === 0) {
    throw new ValidationError("No se puede crear un lector sin libros");
  }

  if (!data.readerDNI || data.readerDNI.trim() === "") {
    throw new ValidationError("El campo DNI del lector no puede estar vacío");
  }

  if (!data.readerName || data.readerName.trim() === "") {
    throw new ValidationError("El campo Nombre del lector no puede estar vacío");
  }

  if (!data.employeeCode || data.employeeCode.trim() === "") {
    throw new ValidationError("El campo Código de empleado no puede estar vacío");
  }

  if (!data.retiredDate || data.retiredDate.trim() === "") {
    throw new ValidationError("El campo Fecha de retiro no puede estar vacío");
  }

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(null, data.employeeCode);
    if (!employee) {
      throw new ValidationError("Empleado no existe");
    }

    let existingReader = await getOne(data.readerDNI);

    let reader = existingReader;
    if (!reader) {
      reader = await Reader.create({
        dni: data.readerDNI,
        name: data.readerName,
      }, { transaction });
    }

    const [datePart, timePart] = data.retiredDate.split('T');
    const retiredDate = datePart;
    const retiredHour = timePart + ':00';

    const readerBooks = data.books.map(book => ({
      BookId: book.BookId,
      readerDNI: reader.dni,
      employeeId: employee.id,
      retiredDate,
      retiredHour,
      returned: false
    }));

    await Promise.all(
      readerBooks.map(book =>
        ReaderBookRepository.create(book, transaction)
      )
    );

    await transaction.commit();

    return {
      msg: "Operación realizada correctamente",
      readerDNI: reader.dni,
      readerCreated: !existingReader
    };

  } catch (err) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    throw err;
  }
};


export const update = async (id, updates) => {
  await Reader.update(updates, { where: { id } });
  return await Reader.findByPk(id);
};

export const remove = async (id) => {
  const reader = await Reader.findByPk(id);

  if (!reader) {
    return null;
  }
  await reader.destroy();

  return {
    msg: "Reader deleted successfully",
    data: reader
  };
};
