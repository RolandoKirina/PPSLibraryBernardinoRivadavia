import Reader from '../../models/reader/reader.js';
import ReaderBook from '../../models/reader/ReaderBook.js';
import Book from '../../models/book/Book.js';
import Employees from '../../models/options/Employees.js';
import sequelize from '../../configs/database.js';
import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as ReaderBookRepository from '../../repositories/reader/ReaderBookRepository.js';

export const getAll = async () => {
  const readers = await Reader.findAll({
    attributes: ['dni', 'name'],
    include: [
      {
        model: ReaderBook,
        as: 'ReaderBooks',
        attributes: ['employeeId', 'returnedDate', 'retiredDate', 'returnedHour', 'retiredHour','BookId', 'readerDNI', 'ReaderBookId'],
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
    ]
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
        retiredDate: rb.retiredDate ?? '',                // YYYY-MM-DD
        retiredHour: rb.retiredHour ?? '',   // HH:mm
        returnedDate: rb.returnedDate ?? '',              // YYYY-MM-DD
        returnedHour: rb.returnedHour ?? '', // HH:mm
        employee: employee?.name ?? '',
        id: rb.ReaderBookId 
      };
    })
  );

  return flatReaders;


};

export const getOne = async (id) => {
  return await Reader.findByPk(id);
};

export const create = async (data) => {
  if (!data.books || data.books.length === 0) {
    throw new Error("No se puede crear un lector sin libros");
  }

  const transaction = await sequelize.transaction();

  try {
    const employee = await EmployeesRepository.getOneByCode(data.employeeCode);
    if (!employee) {
      throw new Error("Empleado no existe");
    }

    const readerData = {
      dni: data.readerDNI,
      name: data.readerName,
    };

    const newReader = await Reader.create(readerData, { transaction });

    const [datePart, timePart] = data.retiredDate.split('T');
    const retiredDate = datePart;               
    const retiredHour = timePart + ':00';       

    const readerBooks = data.books.map(book => ({
      BookId: book.BookId,
      readerDNI: newReader.dni,
      employeeId: employee.id,
      retiredDate,
      retiredHour,
      returned: false
    }));

    await Promise.all(
      readerBooks.map(book => ReaderBookRepository.create(book, transaction)) 
    );

    await transaction.commit();

    return {
      msg: "Lector creado correctamente",
      readerDNI: newReader.dni,
    };
  } catch (err) {
    await transaction.rollback();
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
