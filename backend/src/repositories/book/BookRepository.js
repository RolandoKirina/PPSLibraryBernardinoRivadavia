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
    subQuery: false, //usarlo cuando hay includes + order + limit
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
        attributes: ['bookAuthorId'],
        include: [
          {
            model: Authors,
            as: 'Author',
            where: whereAuthor,
            attributes: ['name']
          }
        ]
      }
    ],
    order,
    limit,
    offset,
    attributes: ['title', 'codeInventory', 'codeCDU']
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

  return await Book.findAll({
  where: whereBooks,
  subQuery: false,
  include: [
    {
      model: BookAuthor,
      as: 'BookAuthors',
      required: true,
      attributes: ['authorCode', 'BookId'],
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
  order,
  attributes: ['BookId', 'codeInventory', 'title', 'codeCDU'],
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
    attributes: ["lossDate", "codeInventory", "title"],
    limit,
    offset
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
