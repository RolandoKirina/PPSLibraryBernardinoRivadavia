import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";
import sequelize from "../../configs/database.js";
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
};

export const getRanking = async (filters) => {
  const {
    whereBooks,
    whereRetiredDate,
    whereByStatus,
    order,
    limit,
    offset
  } = filters;

  let finalOrder = order;
  if (filters.orderBy === 'partnerStatus') {
    finalOrder = [
      [sequelize.literal(`"LoanBooks->Loan->Partner"."est_socio" ${filters.direction}`)]
    ];
  }

  return await Book.findAll({
    where: whereBooks,
    include: [
      {
        model: BookAuthor,
        as: "BookAuthors", // <- alias agregado
        required: true,
        attributes: ["authorCode", "BookId"],
        include: [
          {
            model: Authors,
            as: "Author", // <- alias agregado
            required: true,
            attributes: ["name"]
          }
        ]
      },
      {
        model: LoanBook,
        as: "BookLoans", // <- alias agregado
        required: true,
        attributes: ["BookId", "loanId"],
        include: [
          {
            model: Loan,
            as: "Loan", // <- alias agregado
            required: true,
            attributes: ["retiredDate"],
            where: whereRetiredDate,
            include: [
              {
                model: Partner,
                as: "Partner", // <- alias agregado
                required: true,
                attributes: ["id", "name", "isActive"],
                where: whereByStatus
              }
            ]
          }
        ]
      }
    ],
    order: finalOrder,
    attributes: ["BookId", "codeInventory", "title", "codeCDU"],
    limit,
    offset
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
