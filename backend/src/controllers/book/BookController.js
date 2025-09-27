import * as BookService from "../../services/book/BookService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";

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


export const getBook = async (req,res) => {
    try{
        const book = await BookService.getBook(req.params.id);

        if (!book) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(book);
    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });   
    
    }

    }
