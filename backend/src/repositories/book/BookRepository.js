import Book from "../../models/book/Book.js";
import Author from "../../models/author/Authors.js";

export const getRanking = async () => {
  return await Book.findAll({
    include: [
      {
        model: Author,
        attributes: ['name'],  
      },
    ],
    attributes: ['BookId', 'title', 'codeCdu', 'numberOfCopies']
  });
};



export const getAll = async () => {

    return  await Book.findAll();
} 

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
