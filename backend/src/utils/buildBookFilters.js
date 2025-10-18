import {Op} from "sequelize";
import Loan from "../models/loan/Loan.js";
import LoanBook from "../models/loan/LoanBook.js";
import Partner from "../models/partner/Partner.js";
import sequelize from "../configs/database.js";
import Sequelize from "sequelize";

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


export const buildFilterLostBook = (query) => {
  const { LossDate, orderBy, direction, limit, offset } = query;

  const whereBooks = {
    ...(LossDate?.trim() && { lossDate: { [Op.lte]: LossDate.trim() } }),
    lost: true
  };

  const directionNormalized = direction?.toUpperCase() === "ASC" ? "ASC" : "DESC";

  let finalorder = [];

  switch (orderBy?.trim()) {
    case "partnerStatus":
      finalorder = [[{ val: `"BookLoans->Loan->Partner"."isActive"` }, directionNormalized]];
      break;
    case "Apellido Socio":
      finalorder = [[{ val: `"BookLoans->Loan->Partner"."surname"` }, directionNormalized]];
      break;
    case "Número Socio":
      finalorder = [[{ val: `"BookLoans->Loan->Partner"."partnerNumber"` }, directionNormalized]];
      break;
    case "Código Libro":
      finalorder = [["codeInventory", directionNormalized]];
      break;
    case "Título Libro":
      finalorder = [["title", directionNormalized]];
      break;
    case "Fecha pérdida":
    default:
      finalorder = [["lossDate", directionNormalized]];
      break;
  }

  return {
    whereBooks,
    order: finalorder,
    limit: parseInt(limit) || 5,
    offset: parseInt(offset) || 0
  };
};

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
    [sequelize.literal(`"BookLoans->Loan->Partner"."est_socio" ${direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'}`)]
  ];

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);
  const directionNormalized = direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  return {
    whereBooks,    
    whereRetiredDate,
    order,
    direction: directionNormalized,
    limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};

