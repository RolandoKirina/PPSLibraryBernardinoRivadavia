import { Op } from "sequelize";
import Reader from "../models/reader/reader.js";

export const buildReaderFilters = (query) => {
  const {
    name,
    dni,
    state,
    startDate,
    endDate,
    returnStartDate,
    returnEndDate,
    limit,
    offset,
    sortBy,
    direction,
    bookTitle,
    isbn,
  } = query;

  const whereReader = {};
  const whereReaderBook = {};
  const whereBook = {};
  const whereEmployee = {};

  if (name?.trim()) {
    whereReader.name = { [Op.iLike]: `%${name.trim()}%` };
  }

  if (dni?.trim()) {
    whereReader.dni = dni;
  }

  if (state && state !== "all") {
    if (state === "returned") {
      whereReaderBook.returnedDate = { [Op.ne]: null };
    } else if (state === "current") {
      whereReaderBook.returnedDate = { [Op.is]: null };
    }
  }

  const normalize = (date) =>
    new Date(date).toISOString().split("T")[0];

  if (startDate) {
    whereReaderBook.retiredDate = {
      [Op.gte]: normalize(startDate)
    };
  }

  if (endDate) {
    whereReaderBook.retiredDate = {
      ...(whereReaderBook.retiredDate || {}),
      [Op.lte]: normalize(endDate),
    };
  }

  if (returnStartDate) {
    whereReaderBook.returnedDate = {
      [Op.gte]: normalize(returnStartDate)
    };
  }

  if (returnEndDate) {
    whereReaderBook.returnedDate = {
      ...(whereReaderBook.returnedDate || {}),
      [Op.lte]: normalize(returnEndDate),
    };
  }

  if (bookTitle?.trim()) {
    whereBook.title = { [Op.iLike]: `%${bookTitle.trim()}%` };
  }

  if (isbn?.trim()) {
    whereBook.isbn = { [Op.iLike]: `%${isbn.trim()}%` }; // o igualdad exacta si lo preferís
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const order = sortBy
    ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
    : undefined;

  return {
    whereReader,
    whereReaderBook,
    whereBook,
    whereEmployee,
    order,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset,
  };
};
