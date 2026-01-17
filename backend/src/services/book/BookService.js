import * as BookRepository from "../../repositories/book/BookRepository.js";

export const getAllBooks = async (filters) => {
    let books = await BookRepository.getAll(filters);
    return books;
}

export const getCount = async (filters) => {
    let count = await BookRepository.getCount(filters);
    return count;
}

export const getAllBooksWithFields = async (filters) => {
    let books = await BookRepository.getAllWithFields(filters);
    return books;
}

export const getAllBooksOfAuthor = async (id, filter) => {
    let books = await BookRepository.getAllBooksOfAuthor(id, filter);
    return books;
}

export const getAllBooksOfLoan = async (id, filters) => {
    let books = await BookRepository.getAllBooksOfLoan(id, filters);
    return books;
}

export const getAllPendingBooks = async (partnerNumber, filters) => {
    let books = await BookRepository.getAllPendingBooks(partnerNumber, filters);
    return books;
}


export const getRanking = async (filters) => {
    let ranking = await BookRepository.getRanking(filters);
    return ranking;
}

export const getLostBooks = async (filters) => {
    const lostBooks = await BookRepository.getLostBooks(filters);
    return lostBooks;
};

export const getBook = async (id) => {
    return await BookRepository.getById(id);
};


export const createBook = async( book) => {
    return await BookRepository.create(book);
}

export const duplicateBook = async( book) => {
    return await BookRepository.duplicateBook(book);
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


export const  getPartnersAndBooks = async (filters) => {
    let books = await BookRepository.getPartnersAndBooks(filters);
    return books;
}