import {Op} from "sequelize";
import Loan from "../models/loan/Loan.js";
import LoanBook from "../models/loan/LoanBook.js";
import Partner from "../models/partner/Partner.js";
import sequelize from "../configs/database.js";
export const buildBookFilters = (query) => {
    const{
        author,
        codeInventory,
        codeCDU,
        codeSignature, 
        yearEdition,
        numberEdition,
        limit, 
        offset
    } = query;

    const whereAuthor ={};
    const whereCodeInventory = {};
    const whereCodeCDU ={};
    const whereCodeSignature = {};
    const whereYearEdition = {};
    const whereNumberEdition = {};


   
  if (author && author.trim() !== '') {
    whereAuthor.name = { [Op.iLike]: `%${author.trim()}%`
  }}

  if (codeInventory && codeInventory.trim() !== '') {
    whereCodeInventory.codeInventory = codeInventory.trim();
  }
  
  if (codeCDU && codeCDU.trim() !== '') {
    whereCodeCDU.codeCDU = codeCDU.trim();
  }

  if (codeSignature && codeSignature.trim() !== '') {
    whereCodeSignature.codeSignature = codeSignature.trim();
  }

    if (yearEdition) {
    whereYearEdition.yearEdition = parseInt(yearEdition);
    }


  if (numberEdition) {
    whereNumberEdition.numberEdition = numberEdition;
  }
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

     return {
    whereAuthor,
    whereCodeInventory,
    whereCodeCDU,
    whereCodeSignature,
    yearEdition,
    numberEdition,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
}

export const buildFilterRanking = (query) => {
  const {
    retiredDate,
    cduBooksRetiredPartner,
    bookCodeRetiredBooks,
    direction,
    limit,
    offset
  } = query;

  const whereBooks = {}
  

  if (cduBooksRetiredPartner && cduBooksRetiredPartner.trim() !== '') {
    whereBooks.codeCDU = cduBooksRetiredPartner.trim();
  }
  
  if (bookCodeRetiredBooks && bookCodeRetiredBooks.trim() !== '') {
    whereBooks.codeInventory = bookCodeRetiredBooks.trim();
  }
  

  const whereRetiredDate = retiredDate?.trim()
    ? { retiredDate: { [Op.gte]: retiredDate.trim() } }
    : {};


const order = [
  [sequelize.literal(`"LoanBooks->Loan->Partner"."est_socio" ${direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`)]
];
  //const parsedLimit = parseInt(limit);
  //const parsedOffset = parseInt(offset);*/

  return {
    whereBooks,    
    whereRetiredDate,
    order,
    //limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    //offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};