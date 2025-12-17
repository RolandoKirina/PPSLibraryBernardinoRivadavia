import * as BookService from "../../services/book/BookService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import Book from "../../models/book/Book.js";
import { buildBookFilters, buildFilterRanking, buildFilterLostBook, buildFilterPartnerAndBooks } from "../../utils/buildBookFilters.js";

export const getAllBooks = async (req,res) => {
    try{

        const queryOptions = buildBookFilters(req.query);

        const books = await BookService.getAllBooks(queryOptions);
      
        res.status(HTTP_STATUS.OK.code).send(books);    

    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
    
}

export const getAllBooksWithFields = async (req,res) => {
    try{

        const books = await BookService.getAllBooksWithFields();
      
        res.status(HTTP_STATUS.OK.code).send(books);    

    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    } 
}


export const getAllBooksOfLoan = async (req,res) => {
    try{
        const { id } = req.params;
        const books = await BookService.getAllBooksOfLoan(id);
      
        res.status(HTTP_STATUS.OK.code).send(books);    

    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    } 
}

export const getAllBooksOfAuthor = async (req,res) => {
    try{
        const { id } = req.params;
        const { filter } = req.query;

        const books = await BookService.getAllBooksOfAuthor(id, filter);
      
        res.status(HTTP_STATUS.OK.code).send(books);    

    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    } 
}

 export const getRanking = async (req,res) =>{
    try{
        const queryOptions = buildFilterRanking(req.query);
        const ranking =  await BookService.getRanking(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(ranking);    
    }
    catch(e){
        console.log(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });

    }
 }
 
 export const getLostBooks = async (req,res) =>{
    try{
        const queryOptions = buildFilterLostBook(req.query);
        const lostBooks =  await BookService.getLostBooks(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(lostBooks);    
    }
    catch(e){
        console.log(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });

    }
 }

  export const getPartnersAndBooks = async (req,res) => {

    try{
        const queryOptions = buildFilterPartnerAndBooks(req.query);
        const partnerAndBooks =  await BookService.getPartnersAndBooks(queryOptions);
        res.status(HTTP_STATUS.OK.code).send(partnerAndBooks);    
    }

    catch(e){
        console.log(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });

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

export const createBook = async (req,res) =>{
    try{
        //lo que viene en el json del body de la solicitud http
        const book = req.body;
        console.log(req.body)

        if(!book){
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({msg: HTTP_STATUS.BAD_REQUEST.msg});
        }
        const newBook = await BookService.createBook(book);
        res.status(HTTP_STATUS.CREATED.code).json(newBook);
    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });   

    }
}

export const updateBook = async (req,res) =>{
    try{
        //lo que viene en el json del body de la solicitud http
        const {id} = req.params;
        const updates = req.body;
        if(!updates){
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({msg: HTTP_STATUS.BAD_REQUEST.msg});
        }
        const newBook = await BookService.updateBook(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newBook);
    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });   

    }
}

export const deleteBook = async (req,res) =>{
    try{
        //lo que viene en el json del body de la solicitud http
        const {id} = req.params;

        const deleted = await BookService.deleteBook(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Book not found" });
        }
        
        return res.status(HTTP_STATUS.OK.code).json(deleted);
    }
    catch(e){
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });   

    }
}