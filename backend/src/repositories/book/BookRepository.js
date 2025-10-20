import Book from '../../models/book/Book.js';
import BookAuthors from '../../models/author/BookAuthor.js';
import BookLoans from '../../models/loan/LoanBook.js';
import Author from '../../models/author/Authors.js';
import Loan from '../../models/loan/Loan.js';
import Partner from '../../models/partner/Partner.js';
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
        attributes: ["bookAuthorId"],
        as: "BookAuthors",
        include: [
          {
            model: Authors,
            where: whereAuthor,
            attributes: ["name"],
            as: "Author"
          }
        ]
      }
    ],
    order,
    limit,
    offset,
     attributes: ["title", "codeInventory", "codeCDU"],
  });
};export const getRanking = async (filters) => {
  const {
    whereBooks = {},
    orderBy,
    direction = 'DESC',
    limit = 5,
    offset = 0
  } = filters;

  let finalOrder = [];

  if (orderBy === 'partnerStatus') {
    // usa el alias completo generado por Sequelize
    finalOrder = [
      [sequelize.literal(`"BookLoans->Loan->Partner"."est_socio" ${direction}`)]
    ];
  }

  Book.findAll({
  include: [
    {
      model: BookAuthors,
      as: 'BookAuthors', // 🔑 debe coincidir con el alias de la asociación
      include: [
        {
          model: Author,
          as: 'Author' // si también tiene alias
        }
      ]
    },
    {
      model: BookLoans,
      as: 'BookLoans', // igual, si definiste alias en la asociación
      include: [
        {
          model: Loan,
          as: 'Loan', // si tiene alias
          include: [
            { model: Partner, as: 'Partner' } // si tiene alias
          ]
        }
      ]
    }
  ],
  limit: 5,
  offset: 0
});

};

export const getLostBook = async () => {
  return await Book.findAll({
    where: { lost: true },
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
            include: [
              { model: Partner, as: "Partner", required: true } 
            ]
          }
        ]
      }
    ],
    order: [["lossDate", "DESC"]],
    limit: 5,
    offset: 0,
    subQuery: false
  });
};



export const getById = async (id) => {
    return await Book.findByPk(id);
}

export const create = async (book) =>{
    return await Book.create(book);
}

export const update = async (id,book) =>{
    const [rowsUpdated] = await Book.update(book, { where: { id } });
    if (rowsUpdated === 0){
        return null;
    }
  return await Book.findByPk(id);
}

export const remove = async (id) =>{
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
