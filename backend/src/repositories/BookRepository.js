import BOOK from "../models/Book.js";


export const  getAll = async () => {

    return  await BOOK.findAll();
} 