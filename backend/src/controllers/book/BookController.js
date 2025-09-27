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


export const getBook = async (req,res) => {
    try{
        const {id} = req.params;
        if(!id || isNaN(Number(id))){
            return res.status(400).json("Invalid Book id")
        }
    }
    catch(e){
         console.error(e);
        res.status(500).json({ msg: "error" });
    }
}
