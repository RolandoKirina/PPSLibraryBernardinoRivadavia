import { Op } from "sequelize";
import Loan from "../models/loan/Loan.js";
import LoanBook from "../models/loan/LoanBook.js";
import Partner from "../models/partner/Partner.js";
import sequelize from "../configs/database.js";
import Sequelize from "sequelize";

export const buildBookFilters = (query) => {
  const {
    author,
    codeInventory,
    codeCDU,
    codeSignature,
    yearEdition,
    numberEdition,
    bookTitle,
    limit,
    offset,
    sortBy,
    direction,
  } = query;

  const whereAuthor = {};
  const whereCodeInventory = {};
  const whereCodeCDU = {};
  const whereBookTitle = {};
  const whereCodeSignature = {};
  const whereYearEdition = {};
  const whereNumberEdition = {};

  if (author && author.trim() !== '') {
    whereAuthor.name = {
      [Op.iLike]: `%${author.trim()}%`
    };
  }

  if (codeInventory && codeInventory.trim() !== '') {
    whereCodeInventory.codeInventory = codeInventory.trim();
  }

  if (codeCDU && codeCDU.trim() !== '') {
    whereCodeCDU.codeCDU = codeCDU.trim();
  }

  if (codeSignature && codeSignature.trim() !== '') {
    whereCodeSignature.codeSignature = {
      [Op.iLike]: `%${codeSignature.trim()}%`
    };
  }

  if (bookTitle && bookTitle.trim() !== '') {
    whereBookTitle.title = {
      [Op.iLike]: `%${bookTitle.trim()}%`
    };
  }

  if (yearEdition) {
    whereYearEdition.yearEdition = parseInt(yearEdition);
  }

  if (numberEdition) {
    whereNumberEdition.numberEdition = numberEdition;
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    whereAuthor,
    whereCodeInventory,
    whereCodeCDU,
    whereCodeSignature,
    whereBookTitle,
    whereYearEdition,
    whereNumberEdition,
    limit: isNaN(parsedLimit) ? 40 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset,
    order
  };
}


export const buildFilterRanking = (query) => {
  const {
    dateFrom,
    dateTo,
    codeCDU,
    bookCode,
    orderBy,
    orderDirection,
    limit,
    offset
  } = query;

  const whereBooks = {};

  if (codeCDU?.trim()) {
    whereBooks.codeCDU = codeCDU.trim();
  }

  if (bookCode?.trim()) {
    whereBooks.codeInventory = bookCode.trim();
  }

  const whereRetiredDate = {};

  // ⭐ Parsea formato DD/MM/YYYY (Argentina)
  const parseArgDate = (str) => {
    const [day, month, year] = str.split("/").map(Number);
    return new Date(year, month - 1, day);
  };
  const toStartOfDay = (str) => {
    const d = new Date(`${str}T00:00:00`);
    return d;
  };

  const toEndOfDay = (str) => {
    const d = new Date(`${str}T23:59:59.999`);
    return d;
  };

  console.log("dateFrom:", dateFrom);
  console.log("dateTo:", dateTo);
  if (dateFrom && dateTo) {
    whereRetiredDate.retiredDate = {
      [Op.between]: [
        toStartOfDay(dateFrom),
        toEndOfDay(dateTo)
      ]
    };
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);
  const directionNormalized = orderDirection?.toUpperCase() === "ASC" ? "ASC" : "DESC";

  return {
    whereBooks,
    whereRetiredDate,
    orderBy: orderBy || "Cantidad",
    direction: directionNormalized,
    limit: isNaN(parsedLimit) ? 10 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};

export const buildFilterLostBook = (query) => {
  const { lossStartDate, lossEndDate, orderBy, direction, limit, offset } = query;

  const whereBooks = {};

  whereBooks.lost = true;

  if (lossStartDate) {
    const start = new Date(lossStartDate);
    start.setHours(0, 0, 0, 0); // inicio del día
    whereBooks.lossDate = { [Op.gte]: start };
  }

  if (lossEndDate) {
    const end = new Date(lossEndDate);
    end.setHours(23, 59, 59, 999); // fin del día
    whereBooks.lossDate = {
      ...(whereBooks.lossDate || {}),
      [Op.lte]: end
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

export const buildFilterPartnerAndBooks = (query) => {
  const { dateFrom, dateTo } = query;

  const whereLoan = {};

  if (dateFrom) {
    const start = new Date(dateFrom);
    start.setHours(0, 0, 0, 0);
    whereLoan.retiredDate = { [Op.gte]: start };
  }

  if (dateTo) {
    const end = new Date(dateTo);
    end.setHours(23, 59, 59, 999);
    whereLoan.retiredDate = {
      ...(whereLoan.retiredDate || {}),
      [Op.lte]: end
    };
  }

  return {
    whereLoan,
  };
};

