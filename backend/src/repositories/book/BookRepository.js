import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";
import BookType from "../../models/options/BookType.js";
import { fn, col, literal } from "sequelize";
import Op from "sequelize";
import sequelize from "../../configs/database.js";
import * as BookAuthorRepository from '../author/BookAuthorRepository.js';
import { formatDate } from "../../utils/date/formatDate.js";

export const getAll = async (filters) => {
  const {
    whereAuthor,
    whereCodeInventory,
    whereCodeCDU,
    whereCodeSignature,
    whereBookTitle,
    whereEdition,
    whereYearEdition,
    whereNumberEdition,
    order,
    limit,
    offset
  } = filters;

  const hasAuthorFilter =
    whereAuthor && Object.keys(whereAuthor).length > 0;

  const count = await Book.count({
    where: {
      ...whereCodeInventory,
      ...whereCodeCDU,
      ...whereCodeSignature,
      ...whereBookTitle,
      ...whereEdition,
      ...whereYearEdition,
      ...whereNumberEdition,
    },
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        required: hasAuthorFilter,
        include: [
          {
            model: Authors,
            as: 'Author',
            required: hasAuthorFilter,
            where: hasAuthorFilter ? whereAuthor : undefined
          }
        ]
      }
    ],
    distinct: true,
    col: 'id'
  });

  const bookIds = await Book.findAll({
    attributes: ['id'],
    subQuery: false,
    where: {
      ...whereCodeInventory,
      ...whereCodeCDU,
      ...whereCodeSignature,
      ...whereBookTitle,
      ...whereEdition,
      ...whereYearEdition,
      ...whereNumberEdition,
    },
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        required: hasAuthorFilter,
        include: [
          {
            model: Authors,
            as: 'Author',
            where: whereAuthor,
            required: hasAuthorFilter
          }
        ]
      }
    ],
    order,
    limit,
    offset,
    raw: true
  });

  const ids = bookIds.map(b => b.id);

  if (!ids.length) {
    return {
      rows: [],
      count
    };
  }

  const rows = await Book.findAll({
    where: { id: ids },
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        include: [
          {
            model: Authors,
            as: 'Author'
          }
        ]
      }
    ],
    order
  });

  return {
    rows,
    count
  };
};

export const getAllPendingBooks = async (partnerNumber, filters = {}) => {
  const { limit, offset } = filters;

  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ['BookId'],
    distinct: true,
    subQuery: false,
    col: ['id'],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        required: true,
        where: { returnedDate: null },
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
                where: { partnerNumber }
              }
            ]
          }
        ]
      }
    ],
    limit,
    offset
  });

  const bookIds = idRows.map(b => b.BookId);

  if (bookIds.length === 0) {
    return { rows: [], count };
  }

  const books = await Book.findAll({
    where: { BookId: bookIds },
    attributes: [
      'BookId',
      'title',
      'codeInventory',
      'codeCDU',
      'codeLing',
      'codeClasification'
    ],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['reneweAmount', 'returnedDate'],
        required: true,
        where: { returnedDate: null },
        include: [
          {
            model: Loan,
            as: 'Loan',
            attributes: ['id'],
            include: [
              {
                model: Partner,
                as: 'Partner',
                attributes: ['partnerNumber']
              }
            ]
          }
        ]
      },
      {
        model: BookType,
        as: 'BookType',
        attributes: ['bookTypeId', 'typeName'],
        required: true
      }
    ]
  });

  const rows = books.map(book => ({
    partnerNumber: book.BookLoans?.[0]?.Loan?.Partner?.partnerNumber ?? null,
    BookId: book.BookId,
    title: book.title,
    codeInventory: book.codeInventory,
    codeCDU: book.codeCDU,
    codeLing: book.codeLing,
    codeClasification: book.codeClasification,
    bookTypeId: book.BookType?.bookTypeId ?? null,
    typeName: book.BookType?.typeName ?? '',
    loanId: book.BookLoans?.[0]?.Loan?.id ?? null,
    renewes: book.BookLoans?.[0]?.reneweAmount ?? 0,
    returnedDate: formatDate(book.BookLoans?.[0]?.returnedDate),
    returned: book.BookLoans?.[0]?.returnedDate ? 'Si' : 'No',
    returnDateText: book.BookLoans?.[0]?.returnedDate || 'Sin fecha'
  }));

  return { rows, count };
};



export const getAllWithFields = async ({ limit, offset }) => {

  const { rows: ids, count } = await Book.findAndCountAll({
    attributes: ['BookId'],
    limit,
    offset,
    distinct: true
  });

  const bookIds = ids.map(b => b.BookId);

  if (!bookIds.length) {
    return {
      rows: [],
      total: count
    };
  }

  const books = await Book.findAll({
    where: {
      BookId: bookIds
    },
    attributes: [
      "BookId",
      "title",
      "codeInventory",
      "codeCDU",
      "codeLing",
      "codeClasification"
    ],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['BookId', 'loanId'],
        required: false,
        where: {
          returnedDate: null
        },
        include: [
          {
            model: Loan,
            as: 'Loan',
            attributes: ['id']
          }
        ]
      }
    ],
    order: [['BookId', 'ASC']]
  });

  const mappedBooks = books.map(book => ({
    ...book.toJSON(),
    isBorrowed: book.BookLoans?.length > 0
  }));

  return {
    rows: mappedBooks,
    total: count
  };
};

export const getAllBooksOfLoan = async (id, filters = {}) => {
  const { limit, offset } = filters;

  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ["BookId"],
    include: [
      {
        model: LoanBook,
        as: "BookLoans",
        required: true,
        attributes: [],
        include: [
          {
            model: Loan,
            as: "Loan",
            attributes: [],
            where: { id }
          }
        ]
      }
    ],
    limit,
    offset,
    distinct: true,
    subQuery: false,
    raw: true
  });

  const ids = idRows.map(r => r.BookId);
  if (!ids.length) {
    return { items: [], count };
  }

  const books = await Book.findAll({
    where: { BookId: ids },
    attributes: [
      "BookId",
      "title",
      "codeInventory",
      "codeCDU",
      "codeLing",
      "codeClasification"
    ],
    include: [
      {
        model: LoanBook,
        as: "BookLoans",
        attributes: ["reneweAmount", "returnedDate"],
        required: true,
        include: [
          {
            model: Loan,
            as: "Loan",
            attributes: ["id"],
            where: { id }
          }
        ]
      },
      {
        model: BookType,
        as: "BookType",
        attributes: ["bookTypeId", "typeName"],
        required: true
      }
    ],
    order: [["BookId", "ASC"]]
  });

  const rows = books.map(book => ({
    BookId: book.BookId,
    title: book.title,
    codeInventory: book.codeInventory,
    codeCDU: book.codeCDU,
    codeLing: book.codeLing,
    codeClasification: book.codeClasification,
    bookTypeId: book.BookType?.bookTypeId ?? null,
    typeName: book.BookType?.typeName ?? "",
    loanId: book.BookLoans?.[0]?.Loan?.id ?? null,
    renewes: book.BookLoans?.[0]?.reneweAmount ?? 0,
    returnedDate: formatDate(book.BookLoans?.[0]?.returnedDate),
    returned: book.BookLoans?.[0]?.returnedDate ? "Si" : "No",
    returnDateText: book.BookLoans?.[0]?.returnedDate ?? "Sin fecha"
  }));

  return {
    rows,
    count
  };
};
export const getLostBooks = async ({ whereBooks, order, limit, offset }) => {
  try {
    const count = await Book.count({
      where: whereBooks,
      distinct: true,
      col: "id",
      include: [
        {
          model: LoanBook,
          as: "BookLoans",
          required: true,
          include: [
            {
              model: Loan,
              as: "Loan",
              required: true
            }
          ]
        }
      ]
    });

    const bookIds = await Book.findAll({
      where: whereBooks,
      attributes: ["id"],
      include: [
        {
          model: LoanBook,
          as: "BookLoans",
          required: true,
          include: [
            {
              model: Loan,
              as: "Loan",
              required: true
            }
          ]
        }
      ],
      order,
      limit,
      offset,
      subQuery: false,
      raw: true
    });

    const ids = bookIds.map(b => b.id);

    if (!ids.length) {
      return { rows: [], count };
    }

    const books = await Book.findAll({
      where: { id: ids },
      include: [
        {
          model: LoanBook,
          as: "BookLoans",
          include: [
            {
              model: Loan,
              as: "Loan",
              include: [
                {
                  model: Partner,
                  as: "Partner"
                }
              ]
            }
          ]
        },
        {
          model: BookType,
          as: "BookType",
          attributes: ["typeName"]
        }
      ],
      order
    });

    const rows = books.map(book => {
      const firstLoan = book.BookLoans?.[0]?.Loan;
      const partner = firstLoan?.Partner;

      return {
        BookId: book.id,
        title: book.title,
        bookCode: book.codeInventory,
        lossDate: formatDate(book.lossDate),
        typeName: book.BookType?.typeName || '',
        partnerNumber: partner?.partnerNumber || null,
        surname: partner?.surname || '',
        name: partner?.name || '',
        homeAddress: partner?.homeAddress || '',
        homePhone: partner?.homePhone || '',
      };
    });

    return {
      rows,
      count
    };

  } catch (error) {
    console.error("Error en getLostBooks Repository:", error);
    throw error;
  }
};

export const getAllBooksOfAuthor = async (id, filters = {}) => {
  const { limit, offset, filter } = filters;

  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ["BookId"],
    include: [
      {
        model: BookAuthor,
        as: "BookAuthors",
        required: true,
        attributes: [],
        include: [
          {
            model: Authors,
            as: "Author",
            attributes: [],
            where: { id }
          }
        ]
      }
    ],
    limit,
    offset,
    distinct: true,
    subQuery: false,
    raw: true
  });

  const ids = idRows.map(r => r.BookId);

  if (!ids.length) {
    return { rows: [], count };
  }

  const books = await Book.findAll({
    where: { BookId: ids },
    attributes: [
      "BookId",
      "title",
      "codeInventory",
      "codeCDU",
      "codeLing",
      "codeClasification"
    ],
    include: [
      {
        model: BookAuthor,
        as: "BookAuthors",
        attributes: ["position"],
        required: true,
        include: [
          {
            model: Authors,
            as: "Author",
            attributes: ["name"],
            where: { id }
          }
        ]
      },
      {
        model: LoanBook,
        as: "BookLoans",
        required: false,
        attributes: ["returnedDate"],
        where: { returnedDate: null }
      }
    ],
    order: [["BookId", "ASC"]]
  });

  let rows = books.map(book => ({
    BookId: book.BookId,
    codeInventory: book.codeInventory || "",
    title: book.title || "",
    position: book.BookAuthors?.[0]?.position ?? "",
    codeClasification: book.codeClasification || "",
    codeCDU: book.codeCDU || "",
    codeLing: book.codeLing || "",
    isBorrowed: book.BookLoans?.length > 0
  }));

  if (filter === "borrowed") {
    rows = rows.filter(book => book.isBorrowed);
  }

  return {
    rows,
    count
  };
};


export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    orderBy = "Cantidad",
    direction = "DESC",
    limit,
    offset
  } = filters;

  const countResult = await Book.count({
    where: whereBooks,
    distinct: true,
    col: "id",
    include: [
      {
        model: LoanBook,
        as: "BookLoans",
        required: true,
        attributes: [],
        include: [
          {
            model: Loan,
            as: "Loan",
            required: true,
            attributes: [],
            where: whereRetiredDate
          }
        ]
      }
    ]
  });

  const rows = await Book.findAll({
    where: whereBooks,
    subQuery: false,
    include: [
      {
        model: LoanBook,
        as: "BookLoans",
        required: true,
        attributes: [],
        include: [
          {
            model: Loan,
            as: "Loan",
            required: true,
            attributes: [],
            where: whereRetiredDate
          }
        ]
      }
    ],
    attributes: [
      ["id", "BookId"],
      ["codigo", "codeInventory"],
      ["titulo", "title"],
      ["Cod_rcdu", "codeCDU"],
      [fn("COUNT", col("BookLoans.LoanBookId")), "Cantidad"]
    ],
    group: ["Book.id", "Book.codigo", "Book.titulo", "Book.Cod_rcdu"],
    order: [[literal(`"${orderBy}"`), direction]],
    limit,
    offset
  });

  return {
    rows,
    count: countResult
  };
};


export const getPartnersAndBooks = async (filters) => {
  const { whereLoan } = filters;

  try {

    const totalBooks = await Book.count({
      distinct: true,
      include: [
        {
          model: LoanBook,
          as: "BookLoans",
          required: true,
          attributes: [],
          include: [
            {
              model: Loan,
              as: "Loan",
              required: true,
              attributes: [],
              where: whereLoan
            }
          ]
        }
      ]
    });

    const totalPartners = await Loan.count({
      where: whereLoan,
      distinct: true,
      col: 'partnerId',
      include: [
        {
          model: Partner,
          as: "Partner",
          required: true,
          attributes: []
        }
      ]
    });

    return {
      totalBooks,
      totalPartners,
    };
  } catch (error) {
    console.error("Error en getPartnersAndBooks:", error);
    throw error;
  }
};

export const getById = async (id) => {
  return await Book.findByPk(id);
}

export const getByCodeInventory = async (codeInventory) => {
  return await Book.findOne({
    where: {
      codeInventory
    }
  });
};


export const create = async (book) => {
  return await Book.create(book);
}

export const duplicateBook = async (book) => {
  const oldBook = await getByCodeInventory(book.codeInventory);

  if (!oldBook) {
    throw new Error('Libro no encontrado');
  }

  // Convertimos a objeto plano
  const oldBookData = oldBook.get({ plain: true });

  // Eliminamos el ID autoincremental
  delete oldBookData.BookId;

  return await Book.create({
    ...oldBookData,
    codeInventory: book.newCodeInventory,
    lost: false,
    lossDate: null,
    lostPartnerNumber: null
  });
};


export const update = async (id, book) => {
  const transaction = await sequelize.transaction();

  try {

    await Book.update(book, {
      where: { id }, transaction
    });

    await BookAuthor.destroy({
      where: { BookId: id },
      transaction
    });

    const newAssociations = book.authors.map(author => ({
      BookId: id,
      authorCode: author.authorCode || author.id,
      position: author.position || null,
    }));


    await Promise.all(
      newAssociations.map(assoc =>
        BookAuthorRepository.create(assoc, transaction)
      )
    );

    await transaction.commit();

    return {
      msg: "Libro actualizado correctamente",
      updatedId: id
    };

  } catch (err) {
    await transaction.rollback();
    throw err;
  }

}

export const remove = async (id) => {
  const book = await Book.findByPk(id);

  if (!book) {
    return null;
  }
  await book.destroy();

  return {
    msg: "Book deleted successfully",
    data: book
  }
}

