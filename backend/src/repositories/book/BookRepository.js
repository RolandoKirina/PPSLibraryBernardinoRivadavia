import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";
import BookType from "../../models/options/BookType.js";
import { fn, col, literal } from "sequelize";

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
    subQuery: false, // usalo cuando hay includes + order + limit
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
export const getAllWithFields = async () => {

  return await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
  });
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
    returnedDate: book.BookLoans?.[0]?.returnedDate , // null o fecha real
    returned: book.BookLoans?.[0]?.returnedDate ? 'Si' : 'No',
    returnDateText: book.BookLoans?.[0]?.returnedDate || 'Sin fecha' // para mostrar en tabla
  }));

  return flatBooks;
};

export const getAllBooksOfAuthor = async (id) => {

  return await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
    include: [
      {
        model: BookAuthor,
        as: 'BookAuthors',
        attributes: ['bookAuthorId'],
        required: true,
        include: [
          {
            model: Authors,
            as: 'Author',
            attributes: ['name'],
            where: {
              id: id
            }
          }
        ]
      }
    ],
  });
};

/*export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    whereByStatus,
    order,
    limit,
    offset
  } = filters;

  return await Book.findAll({
  where: whereBooks,
  subQuery: false,
  include: [
    {
      model: BookAuthor,
      as: 'BookAuthors',
      required: true,
      attributes: ['authorCode', 'BookId'],
      separate: true,
      include: [
        {
          model: Authors,
          as: 'Author',
          required: true,
          attributes: ['name']
        }
      ]
    },
    {
      model: LoanBook,
      as: 'BookLoans',
      required: true,
      separate: true,
      attributes: ['BookId', 'loanId'],
      include: [
        {
          model: Loan,
          as: 'Loan',
          required: true,
          attributes: ['retiredDate'],
          where: whereRetiredDate,
          include: [
            {
              model: Partner,
              as: 'Partner',
              required: true,
              attributes: ['id', 'name', 'isActive'],
              where: whereByStatus
            }
          ]
        }
      ]
    }
  ],
  group: ["Book.id", "Book.codigo", "Book.titulo", "Book.Cod_rcdu"],
  order,
   attributes: [
    'BookId', 'codeInventory', 'title', 'codeCDU',
    [sequelize.fn("COUNT", sequelize.col("BookLoans.LoanBookId")), "loansCount"],
  ],
  limit,
  offset
});

};



export const getLostBooks = async (filters) => {
  //hay que usar numsocioperdida (de libro) para que sean libros perdidos mostrando solamente el socio al que se le perdio
  const {
    whereBooks,
    order,
    limit,
    offset
  } = filters;
  console.log(filters);

  return await Book.findAll({
    where: whereBooks,
    subQuery: false, //evita que se haga una subconsulta para aplicar limit
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        attributes: ["BookId", "loanId"],
        required: true,
        include: [
          {
            model: Loan,
            as: 'Loan',
            required: true,
            attributes: ["id"],
            include:[
              {
                model: Partner,
                as: 'Partner',
                required: true,
                attributes: ["partnerNumber", "surname", "name", "homeAddress", "homePhone"]
              }
            ]
          }
        ]
      }
    ],
    order,
    attributes: ["lossDate", "codeInventory", "title",
   
    ],
    limit,
    offset
  });
};
*/
/*export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    whereByStatus,
    limit,
    offset
  } = filters;

  const books = await Book.findAll({
    where: whereBooks,
    include: [
      {
        model: LoanBook,
        as: "BookLoans",
        required: true,
        include: [
          {
            model: Loan,
            as: "Loan",
            required: true,
            where: whereRetiredDate,
            include: [
              {
                model: Partner,
                as: "Partner",
                required: true,
                where: whereByStatus
              }
            ]
          }
        ]
      }
    ],
    attributes: ["id", "codigo", "titulo", "Cod_rcdu"],
    limit,
    offset
  });

  const result = books.map(book => ({
    BookId: book.id,
    codeInventory: book.codigo,
    title: book.titulo,
    codeCDU: book.Cod_rcdu,
    loansCount: book.BookLoans?.length || 0
  }));

  return result;
};
*/


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
