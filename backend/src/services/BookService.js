import * as BookRepository from "../repositories/BookRepository.js";

export const getAllBooks = async () => {
    let books = await BookRepository.getAll();
    return books;
}