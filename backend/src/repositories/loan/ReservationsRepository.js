import { Book, BookReservations, Partner } from '../../models/index.js';
import sequelize from '../../configs/database.js';
import Reservations from '../../models/loan/Reservations.js';
import * as EmployeesRepository from '../../repositories/options/EmployeesRepository.js';
import * as PartnerRepository from '../../repositories/partner/PartnerRepository.js';
import * as BookReservationsRepository from '../../repositories/loan/BookReservationsRepository.js';
import { formatDate } from '../../utils/date/formatDate.js';

export const getAll = async (filters = {}) => {
  const {
    whereReservation = {},
    wherePartner = {},
    whereBook = {},
    order,
    limit,
    offset
  } = filters;

  const idRows = await Reservations.findAll({
    subQuery: false,
    attributes: ['id'],
    where: Object.keys(whereReservation).length ? whereReservation : undefined,
    include: [
      {
        model: Partner,
        as: 'Partner',
        attributes: [],
        required: Object.keys(wherePartner).length > 0,
        where: Object.keys(wherePartner).length ? wherePartner : undefined
      },
      {
        model: BookReservations,
        as: 'BookReservations',
        attributes: [],
        required: Object.keys(whereBook).length > 0,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: [],
            required: Object.keys(whereBook).length > 0,
            where: Object.keys(whereBook).length ? whereBook : undefined
          }
        ]
      }
    ],
    order,
    limit,
    offset
  });

  const reservationIds = idRows.map(r => r.id);

  if (!reservationIds.length) {
    return { rows: [], count: 0 };
  }

  const count = await BookReservations.count({
    where: {
      reservationId: reservationIds
    },
    include: [
      {
        model: Book,
        as: 'Book',
        required: Object.keys(whereBook).length > 0,
        where: Object.keys(whereBook).length ? whereBook : undefined
      }
    ]
  });

  const reservations = await Reservations.findAll({
    subQuery: false,
    attributes: ['id', 'reservationDate', 'expectedDate'],
    where: {
      id: reservationIds
    },
    include: [
      {
        model: Partner,
        as: 'Partner',
        attributes: ['partnerNumber', 'name', 'surname']
      },
      {
        model: BookReservations,
        as: 'BookReservations',
        attributes: ['BookId', 'reservationId'],
        required: Object.keys(whereBook).length > 0,
        include: [
          {
            model: Book,
            as: 'Book',
            attributes: ['title', 'codeInventory'],
            required: Object.keys(whereBook).length > 0,
            where: Object.keys(whereBook).length ? whereBook : undefined
          }
        ]
      }
    ],
    order
  });

  const rows = reservations.flatMap(res =>
    res.BookReservations.map(br => ({
      id: res.id,
      partnerNumber: res.Partner?.partnerNumber || '—',
      name: res.Partner
        ? `${res.Partner.name} ${res.Partner.surname}`
        : '—',
      surname: res.Partner?.surname || '—',
      bookTitle: br.Book?.title || '—',
      bookCode: br.Book?.codeInventory || '—',
      reservationDate: formatDate(res.reservationDate),
      expectedDate: formatDate(res.expectedDate)
    }))
  );

  return {
    rows,
    count
  };
};


export const getOne = async (id) => {
  return await Reservations.findByPk(id);
};

export const create = async (reservation) => {
  ;

  if (!reservation.books || reservation.books.length === 0) {
    throw new Error("No se puede crear un préstamo sin libros");
  }

  const transaction = await sequelize.transaction();

  try {
    const partner = await PartnerRepository.getOneByPartnerNumber(reservation.partnerNumber);
    if (!partner) {
      throw new Error("Socio no existe");
    }

    const reservationData = {
      partnerId: partner.id,
      partnerNumber: reservation.partnerNumber,
      reservationDate: reservation.reservationDate,
      expectedDate: reservation.expectedDate,
      name: partner.name,
    };

    const newReservation = await Reservations.create(reservationData, { transaction });
    console.log(newReservation.id);
    console.log(reservation.books);

    const reservationBooks = reservation.books.map(book => ({
      BookId: book.BookId,
      reservationId: newReservation.id,
      bookCode: book.codeInventory,
      bookTitle: book.title,
    }));

    await Promise.all(
      reservationBooks.map(book => BookReservationsRepository.create(book, transaction))
    );

    await transaction.commit();

    return {
      msg: "Reserva creada correctamente",
      reservationId: newReservation.reservationId,
    };
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {
  console.log(id);
  console.log(updates);
  await Reservations.update(updates, {
    where: { id: id }
  });

  return await Reservations.findByPk(id);
};

export const remove = async (id) => {
  const reservations = await Reservations.findByPk(id);

  if (!reservations) {
    return null;
  }
  await reservations.destroy();

  return {
    msg: "Reservations deleted successfully",
    data: reservations
  }
}

