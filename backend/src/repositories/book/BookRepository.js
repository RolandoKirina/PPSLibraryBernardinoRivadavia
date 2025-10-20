import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
import LoanBook from "../../models/loan/LoanBook.js"
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";

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
        include: [
          {
            model: Authors,
            where: whereAuthor,
            attributes: ["name"]
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

export const getAllWithFields = async () => {

  return await Book.findAll({
    attributes: ["BookId", "title", "codeInventory", "codeCDU", "codeLing", "codeClasification"],
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


  if (filters.orderBy === 'partnerStatus') {
    order = [
      [sequelize.literal(`"LoanBooks->Loan->Partner"."est_socio" ${filters.direction}`)]
    ];
  }
  return await Book.findAll({
    where: whereBooks,
    include: [
      {
        model: BookAuthor,
        required: true,
        attributes: ["authorCode", "BookId"],
        include: [
          {
            model: Authors,
            required: true,
            attributes: ["name"]
          }
        ]
      },
      {
        model: LoanBook,
        required: true,
        attributes: ["BookId", "loanId"],
        include: [
          {
            model: Loan,
            required: true,
            attributes: ["retiredDate"],
            where: whereRetiredDate,
            include: [
              {
                model: Partner,
                required: true,
                attributes: ["id", "name", "isActive"],
                where: whereByStatus
              }
            ]
          }
        ]
      }
    ],
    order,
    attributes: ["BookId", "codeInventory", "title", "codeCDU"],
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
    include: [
      {
        model: LoanBook,
        attributes: ["BookId", "loanId"],
        required: true,
        include: [
          {
            model: Loan,
            required: true,
            attributes: ["id"],
            include:[
              {
                model: Partner,
                required: true,
                attributes: ["partnerNumber", "surname", "name", "homeAddress", "homePhone"]
              }
            ]
          }
        ]
      }
    ],
    order,
     attributes: ["lossDate", "codeInventory", "title"],
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
