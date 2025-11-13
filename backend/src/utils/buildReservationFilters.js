import { Op } from "sequelize";

export const buildReservationFilters = (query) => {
    const {
        bookTitle,
        bookCode,
        expectedDate,
        reservationDate,
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

    if (expectedDate) {
      whereReservation.expectedDate = { [Op.eq]: expectedDate };
    }

    if (reservationDate) {
      whereReservation.reservationDate = { [Op.eq]: reservationDate };
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
