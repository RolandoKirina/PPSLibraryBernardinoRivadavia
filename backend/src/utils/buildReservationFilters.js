import { Op } from "sequelize";

export const buildReservationFilters = (query) => {
    const {
        bookTitle,
        bookCode,
        expectedStartDate,
        expectedEndDate,
        reservationStartDate,
        reservationEndDate,
        partnerNumber,
        partnerName,
        partnerSurname,
        limit,
        offset,
        sortBy,
        direction
    } = query;

    const whereBook = {};

    const whereReservation = {};

    const wherePartner = {};

    if (bookTitle) whereBook.title = { [Op.iLike]: `%${bookTitle}%` };

    if (bookCode) whereBook.codeInventory = `${bookCode}`;

    const normalizeDate = (date) => new Date(date).toISOString().split('T')[0];

    // 🔹 FILTRO DE EXPECTED DATE (rango)
    if (expectedStartDate) {
        whereReservation.expectedDate = {
            [Op.gte]: normalizeDate(expectedStartDate),
        };
    }

    if (expectedEndDate) {
        whereReservation.expectedDate = {
            ...(whereReservation.expectedDate || {}),
            [Op.lte]: normalizeDate(expectedEndDate),
        };
    }

    // 🔹 FILTRO DE RESERVATION DATE (rango)
    if (reservationStartDate) {
        whereReservation.reservationDate = {
            [Op.gte]: normalizeDate(reservationStartDate),
        };
    }

    if (reservationEndDate) {
        whereReservation.reservationDate = {
            ...(whereReservation.reservationDate || {}),
            [Op.lte]: normalizeDate(reservationEndDate),
        };
    }

    if (partnerName?.trim()) {
        wherePartner.name = { [Op.iLike]: `%${partnerName.trim()}%` };
    }

    if (partnerSurname?.trim()) {
        wherePartner.surname = { [Op.iLike]: `%${partnerSurname.trim()}%` };
    }

    if (partnerNumber) {
        wherePartner.id = partnerNumber; // o usar Op.iLike si es string
    }

    const parsedLimit = parseInt(limit);
    const parsedOffset = parseInt(offset);

    const order = sortBy
        ? [[sortBy, direction === 'asc' ? 'ASC' : 'DESC']]
        : undefined;

    return {
        wherePartner,
        whereBook,
        whereReservation,
        order,
        limit: isNaN(parsedLimit) ? 20 : parsedLimit,
        offset: isNaN(parsedOffset) ? 0 : parsedOffset
    };
};
