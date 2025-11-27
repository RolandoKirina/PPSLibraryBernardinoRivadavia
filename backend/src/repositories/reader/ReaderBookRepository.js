import ReaderBook from '../../models/reader/ReaderBook.js';
import Reader from '../../models/reader/reader.js';
import { Op } from 'sequelize';

export const getAll = async () => {
  return await ReaderBook.findAll();
};

export const getOne = async (id) => {
  return await ReaderBook.findByPk(id);
};

export const verifyIfBookIsNotRepeated = async (id) => {
  const res = await ReaderBook.findOne({
    where: {
      BookId: id,
      returnedDate: null
    },
    include: [
      {
        model: Reader,
        as: 'Reader',
        attributes: ['dni']
      }
    ]
  });

  if (res) {
    return {
      available: false,
      message: 'El libro ya ha sido prestado y no puede ser añadido al préstamo.',
      currentLoan: {
        id: res.ReaderBookid, 
        readerDNI: res.Reader?.dni || '',
        readerName: res.Reader?.name || '',
      }
    };
  }

  return {
    available: true,
    message: 'El libro está disponible para ser prestado.'
  };
};

export const create = async (readerBook, transaction = null) => {
  return await ReaderBook.create(readerBook, { transaction });
};

export const update = async (id, updates, transaction = null) => {
  console.log("work");
  await ReaderBook.update(updates, {
    where: { ReaderBookId: id },
    transaction
  });

  return await ReaderBook.findByPk(id, { transaction });
};

export const remove = async (id) => {
  const readerBook = await ReaderBook.findByPk(id);

  if (!readerBook) {
    return null;
  }

  await readerBook.destroy();

  return {
    msg: "ReaderBook deleted successfully",
    data: readerBook
  };
};

export const findActiveByReaderAndBook = async (readerDNI, bookId) => {
  return await ReaderBook.findOne({
    where: {
      readerDNI,
      BookId: bookId,
      returnedDate: {
        [Op.is]: null
      }
    }
  });
};
