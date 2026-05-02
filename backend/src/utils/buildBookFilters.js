import { Op } from "sequelize";
import Partner from "../models/partner/partner.js";

export const buildBookFilters = (query) => {
  const {
    author,
    codeInventory,
    codeCDU,
    codeSignature,
    yearEdition,
    numberEdition,
    bookTitle,
    notes,
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
  const whereNotes = {};

  if (author && author.trim() !== '') {
    whereAuthor.name = {
      [Op.iLike]: `%${author.trim()}%`
    };
  }

  if (notes && notes.trim() !== '') {
    whereNotes.notesText = {
      [Op.iLike]: `%${notes.trim()}%`
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
    whereNotes,
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


  const toStartOfDay = (str) => {
    const d = new Date(`${str}T00:00:00`);
    return d;
  };

  const toEndOfDay = (str) => {
    const d = new Date(`${str}T23:59:59.999`);
    return d;
  };

  const conditions = {};

  if (dateFrom) {
    conditions[Op.gte] = toStartOfDay(dateFrom);
  }

  if (dateTo) {
    conditions[Op.lte] = toEndOfDay(dateTo);
  }

  if (Object.keys(conditions).length > 0 || Object.getOwnPropertySymbols(conditions).length > 0) {
    whereRetiredDate.retiredDate = conditions;
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
  const {
    lossStartDate,
    lossEndDate,
    orderBy,
    direction,
    limit,
    offset
  } = query;

  const whereBooks = {
    lost: true,
    lossDate: { [Op.ne]: null } 
  };

  if (lossStartDate || lossEndDate) {
    const conditions = { [Op.ne]: null }; 

    if (lossStartDate) {
      const start = new Date(lossStartDate);
      start.setHours(0, 0, 0, 0);
      conditions[Op.gte] = start;
    }

    if (lossEndDate) {
      const end = new Date(lossEndDate);
      end.setHours(23, 59, 59, 999);
      conditions[Op.lte] = end;
    }


    whereBooks.lossDate = conditions;
  }

  const directionNormalized = direction?.toUpperCase() === "ASC" ? "ASC" : "DESC";
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  let order = [];
  switch (orderBy?.trim()) {
    case "Apellido Socio":
      order = [[{ model: Partner, as: 'LostPartner' }, 'surname', directionNormalized]];
      break;
    case "Número Socio":
      order = [['lostPartnerNumber', directionNormalized]];
      break;
    case "Código Libro":
      order = [['codeInventory', directionNormalized]];
      break;
    case "Título Libro":
      order = [['title', directionNormalized]];
      break;
    case "Fecha pérdida":
    default:
      order = [['lossDate', directionNormalized]];
      break;
  }

  return {
    whereBooks,
    order,
    limit: isNaN(parsedLimit) ? 35 : parsedLimit,
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

