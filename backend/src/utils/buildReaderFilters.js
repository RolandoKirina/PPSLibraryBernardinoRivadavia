import { Op } from "sequelize";

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
    bookTitle,      // <-- Nuevo filtro
    isbn,           // <-- Opcional, si querés usarlo
  } = query;

  const whereReader = {};
  const whereReaderBook = {};
  const whereBook = {};
  const whereEmployee = {};

  // -----------------------------
  //  FILTRO NOMBRE & DNI (READER)
  // -----------------------------
  if (name?.trim()) {
    whereReader.name = { [Op.iLike]: `%${name.trim()}%` };
  }

  if (dni?.trim()) {
    whereReader.dni = dni;
  }

  // -----------------------------
  //  FILTRO ESTADO DEL PRÉSTAMO
  // -----------------------------
  if (state && state !== "all") {
    if (state === "returned") {
      whereReaderBook.returnedDate = { [Op.ne]: null };
    } else if (state === "current") {
      whereReaderBook.returnedDate = { [Op.is]: null };
    }
  }

  // -----------------------------
  //  FECHA DE RETIRO
  // -----------------------------
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

  // -----------------------------
  //  FECHA DE DEVOLUCIÓN
  // -----------------------------
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

  // -----------------------------
  //  FILTRO POR LIBRO
  // -----------------------------
  if (bookTitle?.trim()) {
    whereBook.title = { [Op.iLike]: `%${bookTitle.trim()}%` };
  }

  if (isbn?.trim()) {
    whereBook.isbn = { [Op.iLike]: `%${isbn.trim()}%` }; // o igualdad exacta si lo preferís
  }

  // -----------------------------
  // PAGINACIÓN + ORDEN
  // -----------------------------
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  const order = sortBy
    ? [[sortBy, direction === "asc" ? "ASC" : "DESC"]]
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
