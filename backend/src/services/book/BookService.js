import * as BookRepository from "../../repositories/book/BookRepository.js";

export const getAllBooks = async () => {
    let books = await BookRepository.getAll();
    return books;
}

export const getRanking = async () => {
    let ranking = await BookRepository.getAll();
    return ranking;
}


export const getBook = async (id) => {
    return await BookRepository.getById(id);
};


export const createBook = async( book) => {
    return await BookRepository.create(book);
}

export const updateBook = async (id, data) => {
  const updatedBook = await BookRepository.update(id, data);
  if (!updatedBook) {
    
    throw new Error("Book not found or not updated");
  }
  return updatedBook;
};

export const deleteBook = async (id) => {
    const deletedBook = await BookRepository.remove(id);
    if(!deletedBook){
        throw new Error("Book not found or already deleted");
    }
    return deletedBook;
}