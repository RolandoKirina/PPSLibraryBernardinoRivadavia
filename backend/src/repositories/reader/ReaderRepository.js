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
    limit,
    offset,
    order
  } = filters;

  const readerBookIds = await ReaderBook.findAll({
    attributes: ['ReaderBookId'],
    where: whereReaderBook,
    include: [
      {
        model: Reader,
        as: 'Reader',
        attributes: [], 
        where: whereReader
      },
      {
        model: Book,
        as: 'Book',
        attributes: [],
        where: whereBook
      },
      {
        model: Employees,
        as: 'Employee',
        attributes: [],
        where: whereEmployee
      }
    ],
    limit,
    offset,
    order,
    raw: true
  });

  const ids = readerBookIds.map(rb => rb.ReaderBookId);

  if (!ids.length) return [];

  const readers = await Reader.findAll({
    where: whereReader,
    attributes: ['dni', 'name'],
    include: [
      {
        model: ReaderBook,
        as: 'ReaderBooks',
        where: { ReaderBookId: ids },
        attributes: [
          'employeeId',
          'returnedDate',
          'retiredDate',
          'returnedHour',
          'retiredHour',
          'BookId',
          'readerDNI',
          'ReaderBookId'
        ],
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['codeInventory', 'title']
          },
          {
            model: Employees,
            as: 'Employee',
            attributes: ['id', 'name', 'code']
          }
        ]
      }
    ],
    order
  });

  const flatReaders = readers.flatMap(reader =>
    reader.ReaderBooks.map(rb => {
      const book = rb.Book;
      const employee = rb.Employee;

      return {
        dni: reader.dni,
        name: reader.name,
        bookCode: book?.codeInventory ?? '',
        bookTitle: book?.title ?? '',
        retiredDate: formatDate(rb.retiredDate),
        retiredHour: rb.retiredHour ?? '',
        returnedDate: formatDate(rb.returnedDate),
        returnedHour: rb.returnedHour ?? '',
        employee: employee?.name ?? '',
        id: rb.ReaderBookId
      };
    })
  );

  return flatReaders;
};

export const getCount = async (filters) => {
  const {
    whereReader,
    whereReaderBook,
    whereBook,
    whereEmployee
  } = filters;

  const countResult = await ReaderBook.count({
    where: whereReaderBook,
    include: [
      {
        model: Reader,
        as: 'Reader',
        where: whereReader,
        attributes: [] // no necesitamos columnas, solo el join
      },
      {
        model: Book,
        as: 'Book',
        where: whereBook,
        attributes: []
      },
      {
        model: Employees,
        as: 'Employee',
        where: whereEmployee,
        attributes: []
      }
    ]
  });

  return countResult;
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
    const employee = await EmployeesRepository.getOneByCode(data.employeeCode);
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
