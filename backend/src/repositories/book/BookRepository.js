import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";
import BookType from "../../models/options/BookType.js";
import { fn, col, literal } from "sequelize";
import Op from "sequelize";

export const getAll = async (filters) => {
  const {
    whereAuthor,
    whereCodeInventory,
    whereCodeCDU,
    whereCodeSignature,
    whereEdition,
    whereYearEdition,
    whereNumberEdition,
    order,
    limit,
    offset
  } = filters;

  return await Book.findAll({
    subQuery: false,
    where: {
      ...whereCodeInventory,
      ...whereCodeCDU,
      ...whereCodeSignature,
      ...whereEdition,
      ...whereYearEdition,
      ...whereNumberEdition,
    },
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        include: [
          {
            model: Authors,
            as: 'Author',
            where: whereAuthor
          }
        ]
      }
    ],
    order,
    limit,
    offset
  });
};


export const getAllPendingBooks = async (partnerNumber) => {
  
  const books = await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['BookId', 'loanId', 'reneweAmount', 'returnedDate'],
        required: true,
        where: {
          returnedDate: null
        },
        include: [
          {
            model: Loan,
            as: 'Loan',
            attributes: ['id'],
            required: true,
            include: [
              {
                model: Partner,
                as: 'Partner',
                required: true,
                where: {
                  partnerNumber
                }
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

  const flatBooks = books.map(book => ({
    partnerNumber: book.BookLoans?.[0]?.Loan?.Partner?.partnerNumber || null,
    BookId: book.BookId,
    title: book.title,
    codeInventory: book.codeInventory,
    codeCDU: book.codeCDU,
    codeLing: book.codeLing,
    codeClasification: book.codeClasification,
    bookTypeId: book.BookType?.bookTypeId || null,
    typeName: book.BookType?.typeName || '',
    loanId: book.BookLoans?.[0]?.Loan?.id || null,
    renewes: book.BookLoans?.[0]?.reneweAmount || 0,
    returnedDate: book.BookLoans?.[0]?.returnedDate, // null o fecha real
    returned: book.BookLoans?.[0]?.returnedDate ? 'Si' : 'No',
    returnDateText: book.BookLoans?.[0]?.returnedDate || 'Sin fecha' // para mostrar en tabla
  }));

  return flatBooks;
};

export const getAllWithFields = async () => {

  const books = await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['BookId', 'loanId'],
        required: false,
        where: {
          returnedDate: null
        },
        include: [{ model: Loan, as: 'Loan', attributes: ['id'] }]
      }
    ]
  });

  const mappedBooks = books.map(book => ({
    ...book.toJSON(),
    isBorrowed: book.BookLoans?.length > 0
  }));

  return mappedBooks;
};

export const getAllBooksOfLoan = async (id) => {

  const books = await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['BookId', 'loanId', 'reneweAmount', 'returnedDate'],
        required: true,
        include: [
          {
            model: Loan,
            as: 'Loan',
            attributes: ['id'],
            where: {
              id: id
            }
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

  const flatBooks = books.map(book => ({
    BookId: book.BookId,
    title: book.title,
    codeInventory: book.codeInventory,
    codeCDU: book.codeCDU,
    codeLing: book.codeLing,
    codeClasification: book.codeClasification,
    bookTypeId: book.BookType?.bookTypeId || null,
    typeName: book.BookType?.typeName || '',
    loanId: book.BookLoans?.[0]?.Loan?.id || null,
    renewes: book.BookLoans?.[0]?.reneweAmount || 0,
    returnedDate: book.BookLoans?.[0]?.returnedDate, // null o fecha real
    returned: book.BookLoans?.[0]?.returnedDate ? 'Si' : 'No',
    returnDateText: book.BookLoans?.[0]?.returnedDate || 'Sin fecha' // para mostrar en tabla
  }));

  return flatBooks;
};

export const getLostBooks = async ({ whereBooks, order, limit, offset }) => {
  
  try {
    const books = await Book.findAll({
      where: whereBooks,
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
                  as: "Partner",
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
      order,
      limit,
      offset
    });

    const lostbooks = books.map(book => {
    const firstLoan = book.BookLoans?.[0]?.Loan;
    const partner = firstLoan?.Partner;

    
    return {
      BookId: book.BookId,
      title: book.title,
      lossDate: book.lossDate,
      typeName: book.BookType?.typeName || '',
      partnerNumber: partner?.partnerNumber || null,
      surname: partner?.surname || '',
      name: partner?.name || '',
      homeAddress: partner?.homeAddress || '',
      homePhone: partner?.homePhone || '',
    };
    });

    console.log(lostbooks)
    return lostbooks;


  } catch (error) {
    console.error("Error en getLostBooks Repository:", error);
    throw error;
  }
};


export const getAllBooksOfAuthor = async (id, filter) => {
  const books = await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        attributes: ['bookAuthorId', 'position'],
        required: true,
        include: [
          {
            model: Authors,
            as: 'Author',
            attributes: ['name'],
            where: { id }
          }
        ]
      },
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ['BookId', 'loanId'],
        required: false,
        where: {
          returnedDate: null
        },
        include: [{ model: Loan, as: 'Loan', attributes: ['id'] }]
      }
    ]
  });

  const mappedBooks = books.map(book => {
    const json = book.toJSON();

    return {
      BookId: json.BookId || '',
      codeInventory: json.codeInventory || '',
      title: json.title || '',
      position: json.BookAuthors?.[0]?.position ?? '', // puede ser null
      codeClasification: json.codeClasification || '',
      codeCDU: json.codeCDU || '',
      codeLing: json.codeLing || '',
      isBorrowed: json.BookLoans?.length > 0
    };
  });

  if (filter === 'borrowed') {
    return mappedBooks.filter(book => book.isBorrowed);
  }

  return mappedBooks;
};

/*
export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    whereByStatus,
    limit,
    offset
  } = filters;

  const books = await Book.findAll({
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
            where: whereRetiredDate,
            include: [
              {
                model: Partner,
                as: "Partner",
                attributes: [],
                required: true,
                where: whereByStatus
              }
            ]
          }
        ]
      },
      {
        model: BookAuthor,
        as: "BookAuthors",
        required: true,
        attributes: [],
        include: [
          {
            model: Authors,
            as: "Author",
            required: true,
            attributes: ["name"]
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
    group: [
      "Book.id",
      "Book.codigo",
      "Book.titulo",
      "Book.Cod_rcdu"
    ],
    order: [[literal('"Cantidad"'), "DESC"]],
    limit,
    offset
  });

  return books;
};
*/
export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    orderBy,
    direction,
    limit,
    offset
  } = filters;

  const books = await Book.findAll({
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

  return books;
};

export const getPartnersAndBooks = async (filters) => {
  const { whereLoan } = filters;

  try {
  
    console.log(whereLoan)

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

export const create = async (book) => {
  return await Book.create(book);
}

export const update = async (id, book) => {
  const [rowsUpdated] = await Book.update(book, { where: { id } });
  if (rowsUpdated === 0) {
    return null;
  }
  return await Book.findByPk(id);
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

