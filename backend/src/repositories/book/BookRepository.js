import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/partner.js";
import Loan from "../../models/loan/Loan.js";
import BookType from "../../models/options/BookType.js";
import { fn, col, literal } from "sequelize";
import { Op } from "sequelize";
import sequelize from "../../configs/database.js";
import * as BookAuthorRepository from '../author/BookAuthorRepository.js';
import { formatDate } from "../../utils/date/formatDate.js";
import Sequelize from "sequelize";

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
    whereNotes,
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
      ...whereNotes,
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
      ...whereNotes,
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

  const processedRows = rows.map(book => {
    const bookJSON = book.toJSON();

    const authorsString = bookJSON.BookAuthors
      ? bookJSON.BookAuthors
        .map(ba => ba.Author?.name)
        .filter(name => name)
        .join(' ; ')
      : '';

    return {
      ...bookJSON,
      notesText: bookJSON.notesText || bookJSON.notes,
      authors: authorsString
    };
  });

  return {
    rows: processedRows,
    count
  };

};

export const getAllPendingBooks = async (partnerNumber, filters = {}) => {
  const { limit, offset, title, code, status } = filters;

  const bookWhere = {};
  if (title) {
    bookWhere.title = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('titulo')), // Columna a minúsculas
      { [Op.like]: `%${title.toLowerCase()}%` }       // Tu búsqueda a minúsculas
    );
  }
  if (code) bookWhere.codeInventory = { [Op.like]: `%${code}%` };

  let loanBookWhere = {};
  if (status === 'pending') loanBookWhere.returnedDate = null;
  else if (status === 'returned') loanBookWhere.returnedDate = { [Op.ne]: null };

  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ['BookId'],
    distinct: true,
    subQuery: false,
    where: bookWhere,
    include: [{
      model: LoanBook,
      as: 'BookLoans',
      required: true,
      where: loanBookWhere,
      include: [{
        model: Loan,
        as: 'Loan',
        required: true,
        include: [{
          model: Partner,
          as: 'Partner',
          required: true,
          where: { partnerNumber }
        }]
      }]
    }],
    limit,
    offset
  });

  const bookIds = idRows.map(b => b.BookId);
  if (bookIds.length === 0) return { rows: [], count };

  const books = await Book.findAll({
    where: { BookId: bookIds },
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        required: true,
        where: loanBookWhere,
        attributes: ['reneweAmount', 'returnedDate', 'expectedDate', 'LoanBookId'],
        include: [{
          model: Loan,
          as: 'Loan',
          attributes: ['id', 'retiredDate'],
          include: [{
            model: Partner,
            as: 'Partner',
            attributes: ['partnerNumber']
          }]
        }]
      },
      { model: BookType, as: 'BookType', required: true }
    ]
  });

  const rows = books.map(book => {
    const loanDetail = book.BookLoans?.[0];

    return {
      partnerNumber: loanDetail?.Loan?.Partner?.partnerNumber,
      BookId: book.BookId,
      bookCode: book.codeInventory,
      loanBookId: loanDetail?.LoanBookId,
      title: book.title,
      retiredDate: loanDetail?.Loan?.retiredDate ? formatDate(loanDetail.Loan.retiredDate) : null,
      dueDate: loanDetail?.expectedDate ? formatDate(loanDetail.expectedDate) : 'Sin fecha',
      renewalCount: loanDetail?.reneweAmount ?? 0,
      returnedDate: loanDetail?.returnedDate ? formatDate(loanDetail.returnedDate) : 'Sin fecha',
      isReturned: !!loanDetail?.returnedDate,
      loanId: loanDetail?.Loan?.id
    };
  });

  return { rows, count };
};


export const getGlobalPendingBooks = async (filters = {}) => {
  const { limit, offset, title, code, status, partnerNumber } = filters;

  // 1. Condiciones para el Libro
  const bookWhere = {};

  if (title) {
    bookWhere.title = Sequelize.where(
      Sequelize.fn('LOWER', Sequelize.col('titulo')), // Columna a minúsculas
      { [Op.like]: `%${title.toLowerCase()}%` }       // Tu búsqueda a minúsculas
    );
  }
  if (code) bookWhere.codeInventory = { [Op.like]: `%${code}%` };

  // 2. Condiciones para el Préstamo (LoanBook)
  const loanBookWhere = {};
  if (status === 'pending') {
    loanBookWhere.returnedDate = null;
  } else if (status === 'returned') {
    loanBookWhere.returnedDate = { [Op.ne]: null };
  }

  // 3. Condición para el Socio (Importante: trim y validación)
  const hasPartnerFilter = partnerNumber && partnerNumber.toString().trim() !== "";
  const partnerWhere = hasPartnerFilter ? { partnerNumber: partnerNumber.toString().trim() } : {};

  // PRIMERA CONSULTA: Obtener los IDs de los libros que cumplen TODO
  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ['BookId'],
    distinct: true,
    subQuery: false, // Evita problemas de limit/offset con includes
    where: bookWhere,
    include: [{
      model: LoanBook,
      as: 'BookLoans',
      required: true, // Obligatorio: debe tener un préstamo
      where: loanBookWhere,
      include: [{
        model: Loan,
        as: 'Loan',
        required: true, // Obligatorio: el préstamo debe existir
        include: [{
          model: Partner,
          as: 'Partner',
          // CRÍTICO: Si hay filtro de socio, required debe ser true
          required: hasPartnerFilter,
          where: partnerWhere
        }]
      }]
    }],
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined
  });

  const bookIds = idRows.map(b => b.BookId);
  if (bookIds.length === 0) return { rows: [], count: 0 };

  // SEGUNDA CONSULTA: Traer la data completa de esos IDs
  const books = await Book.findAll({
    where: { BookId: bookIds },
    include: [
      {
        model: LoanBook,
        as: 'BookLoans',
        required: true,
        where: loanBookWhere, // Mantenemos el filtro de estado (pending/returned)
        include: [{
          model: Loan,
          as: 'Loan',
          required: true,
          include: [{
            model: Partner,
            as: 'Partner',
            // Volvemos a aplicar el filtro aquí para que el map no tome el primer socio que encuentre
            required: hasPartnerFilter,
            where: partnerWhere,
            attributes: ['partnerNumber', 'name', 'surname']
          }]
        }]
      },
      { model: BookType, as: 'BookType', required: false }
    ]
  });

  // Mapeo de resultados
  const rows = books.map(book => {
    // Buscamos el préstamo que coincide con el filtro de socio (si existe)
    const loanDetail = hasPartnerFilter
      ? book.BookLoans.find(bl => bl.Loan?.Partner?.partnerNumber == partnerNumber)
      : book.BookLoans?.[0];

    const partner = loanDetail?.Loan?.Partner;

    return {
      partnerNumber: partner?.partnerNumber,
      partnerName: partner ? `${partner.name} ${partner.surname}` : 'N/A',
      BookId: book.BookId,
      bookCode: book.codeInventory,
      loanBookId: loanDetail?.LoanBookId,
      title: book.title,
      retiredDate: loanDetail?.Loan?.retiredDate ? formatDate(loanDetail.Loan.retiredDate) : null,
      dueDate: loanDetail?.expectedDate ? formatDate(loanDetail.expectedDate) : 'Sin fecha',
      renewalCount: loanDetail?.reneweAmount ?? 0,
      returnedDate: loanDetail?.returnedDate ? formatDate(loanDetail.returnedDate) : 'Sin fecha',
      isReturned: !!loanDetail?.returnedDate,
      loanId: loanDetail?.Loan?.id
    };
  });

  return { rows, count };
};
export const getAllWithFields = async (filters) => {
  const {
    whereCodeInventory = {}, // Viene como { codeInventory: { [Op.iLike]: '%702...' } }
    whereBookTitle = {},    // Viene como { title: { [Op.iLike]: '%hija...' } }
    limit,
    offset
  } = filters;

  // 1. Combinamos los filtros directamente. 
  // No hace falta usar `${}` porque los objetos ya traen los comodines % y el operador iLike.
  const where = {
    ...whereBookTitle,
    ...whereCodeInventory
  };

  // 2. Primera consulta para IDs (Paginación)
  const { rows: ids, count } = await Book.findAndCountAll({
    attributes: ['BookId'],
    where,
    limit: limit ? Number(limit) : undefined,
    offset: offset ? Number(offset) : undefined,
    distinct: true,
    raw: true // Agregamos raw para que sea más ligera la obtención de IDs
  });

  const bookIds = ids.map(b => b.BookId);

  if (!bookIds.length) {
    return {
      rows: [],
      total: count
    };
  }

  // 3. Segunda consulta: Hidratación
  const books = await Book.findAll({
    where: {
      BookId: {
        [Op.in]: bookIds
      }
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
          returnedDate: null // Solo préstamos activos
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

  return {
    rows: books,
    total: count
  };
};

export const getAllBooksOfLoan = async (id, filters = {}) => {
  const { limit, offset } = filters;

  const { rows: idRows, count } = await Book.findAndCountAll({
    attributes: ["BookId", 'codeInventory'],
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
        attributes: ["reneweAmount", "returnedDate", "returned"],
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
    returned: book.BookLoans?.[0]?.returned,
    returnDateText: book.BookLoans?.[0]?.returnedDate ?? "Sin fecha"
  }));

  return {
    rows,
    count
  };
};

export const getLostBooks = async ({ whereBooks, order, limit, offset }) => {
  try {
    const { rows, count } = await Book.findAndCountAll({
      where: whereBooks,
      include: [
        {
          model: Partner,
          as: "LostPartner",
          required: false, // LEFT JOIN: Si el socio no existe, el libro NO desaparece
          attributes: ["partnerNumber", "surname", "name", "homeAddress", "homePhone"]
        },
        {
          model: BookType,
          as: "BookType",
          attributes: ["typeName"]
        }
      ],
      order,
      limit,
      offset,
      distinct: true
    });

    const formattedRows = rows.map(book => {
      const partner = book.LostPartner;

      return {
        BookId: book.id,
        title: book.title,
        bookCode: book.codeInventory,
        lossDate: formatDate(book.lossDate),
        typeName: book.BookType?.typeName || '',
        // Prioridad: Dato de la tabla Partner > Dato legacy en Book > N/A
        partnerNumber: partner?.partnerNumber || book.lostPartnerNumber || 'N/A',
        surname: partner?.surname || (book.lostPartnerNumber ? `Socio #${book.lostPartnerNumber} no hallado` : 'Sin socio'),
        name: partner?.name || '',
        homeAddress: partner?.homeAddress || '',
        homePhone: partner?.homePhone || '',
      };
    });

    return { rows: formattedRows, count };

  } catch (error) {
    console.error("Error en getLostBooks:", error);
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
      col: 'NumSocio',
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

