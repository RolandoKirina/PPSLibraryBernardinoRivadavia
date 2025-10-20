import { Op } from "sequelize";
import Loan from "../models/loan/Loan.js";
import LoanBook from "../models/loan/LoanBook.js";
import Partner from "../models/partner/Partner.js";
import sequelize from "../configs/database.js";
export const buildBookFilters = (query) => {
  const {
    author,
    codeInventory,
    codeCDU,
    codeSignature,
    yearEdition,
    numberEdition,
    limit,
    offset
  } = query;

  const whereAuthor = {};
  const whereCodeInventory = {};
  const whereCodeCDU = {};
  const whereCodeSignature = {};
  const whereYearEdition = {};
  const whereNumberEdition = {};



  if (author && author.trim() !== '') {
    whereAuthor.name = {
      [Op.iLike]: `%${author.trim()}%`
    }
  }

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

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const directionNormalized = direction?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const order = [
        [
          { model: LoanBook, as: 'BookLoans' },
          { model: Loan, as: 'Loan' },
          { model: Partner, as: 'Partner' },
          'isActive',
          directionNormalized
        ]
      ];

  return {
    whereBooks,
    whereRetiredDate,
    order,
    direction: directionNormalized,
    limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};

export const buildFilterLostBook = (query) => {
  const { lossStartDate, lossEndDate, orderBy, direction, limit, offset } = query;

  const whereBooks = {};

  whereBooks.lost = true;

  if (lossStartDate) whereBooks.lossDate = { [Op.gte]: new Date(lossStartDate) };
  if (lossEndDate) {
    whereBooks.lossDate = {
      ...(whereBooks.lossDate || {}),
      [Op.lte]: new Date(lossEndDate)
    };
  }

  const directionNormalized = direction?.toUpperCase() === "ASC" ? "ASC" : "DESC";


  let order = [];

  switch (orderBy?.trim()) {
    case "Apellido Socio":
      order = [
        [
          { model: LoanBook, as: 'BookLoans' },
          { model: Loan, as: 'Loan' },
          { model: Partner, as: 'Partner' },
          'surname',
          directionNormalized
        ]
      ];
      break;
    case "Número Socio":
      order = [
        [
          { model: LoanBook, as: 'BookLoans' },
          { model: Loan, as: 'Loan' },
          { model: Partner, as: 'Partner' },
          'partnerNumber',
          directionNormalized
        ]
      ];
      break;
    case "Código Libro":
      order = [['codeInventory', directionNormalized]];
      break;
    case "Título Libro":
      order = [['title', directionNormalized]];
      break;
    case "Fecha pérdida":
      order = [['lossDate', directionNormalized]];
      break;
    default:
      order = [['lossDate', directionNormalized]];
      break;
  }


  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  return {
    whereBooks,
    order,
    direction: directionNormalized,
    limit: isNaN(parsedLimit) ? 5 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};

