import * as BookService from "../../services/book/BookService.js";


export const getAllBooks = async (req,res) => {
    try{
        const books = await BookService.getAllBooks();
        res.json(books); 
    }
    catch(e){
        console.error(e);
    res.status(500).json({ msg: "error" });
    }
    
}