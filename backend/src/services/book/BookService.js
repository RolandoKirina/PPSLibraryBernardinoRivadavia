import * as BookRepository from "../../repositories/book/BookRepository.js";

export const getAllBooks = async (filters) => {
    let books = await BookRepository.getAll(filters);
    return books;
}

export const getAllBooksWithFields = async () => {
    let books = await BookRepository.getAllWithFields();
    return books;
}

export const getAllBooksOfAuthor = async (id, filter) => {
    let books = await BookRepository.getAllBooksOfAuthor(id, filter);
    return books;
}

export const getAllBooksOfLoan = async (id) => {
    let books = await BookRepository.getAllBooksOfLoan(id);
    return books;
}


export const getRanking = async (filters) => {
    let ranking = await BookRepository.getRanking(filters);
    return ranking;
}

export const getLostBooks = async (filters) => {
    let ranking = await BookRepository.getLostBooks(filters);
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