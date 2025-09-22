import Book from "../models/book/Book.js";


export const getAll = async () => {

    return  await Book.findAll();
} 