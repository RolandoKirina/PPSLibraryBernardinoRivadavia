import * as BookRepository from "../../repositories/book/BookRepository.js";

export const getAllBooks = async () => {
    let books = await BookRepository.getAll();
    return books;
}