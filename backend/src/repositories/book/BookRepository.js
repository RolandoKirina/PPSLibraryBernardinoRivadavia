import Book from "../../models/book/Book.js";


export const getAll = async () => {

    return  await Book.findAll();
} 

export const getById = async (id) => {
    return await Book.findByPk(id);
}