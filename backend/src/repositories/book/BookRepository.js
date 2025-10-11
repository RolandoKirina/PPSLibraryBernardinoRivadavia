import Book from "../../models/book/Book.js";
import Authors from "../../models/author/Authors.js";
import BookAuthor from "../../models/author/BookAuthor.js";
export const getRanking = async () => {
  return await Book.findAll({
    include: [
      {
        model: Authors,
        attributes: ['name'],  
      },
    ],
    attributes: ['BookId', 'title', 'codeCdu', 'numberOfCopies']
  });
};

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
