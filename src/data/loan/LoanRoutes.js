import { lendBooksDetails, lendBooksReturnDetails, reneweDetails } from './LoanDetails.js';
import { updateLendBookFields, addLendBookFields } from './LoanForms.js';

export const loanFormRoutes = [
  {
    path: '/loans/add-book-lend',
    title: 'Agregar Libro a Prestamo',
    fields: addLendBookFields
  },
  {
    path: '/loans/book-on-loan-edit',
    title: 'Editar Libro en Prestamo',
    fields: updateLendBookFields
  }
];

export const detailsRoutes = [
  {
    path: '/loans/book-on-loan-details',
    titleText: 'Detalles de libro en préstamo',
    data: lendBooksDetails
  },
  {
    path: '/loans/book-on-loan-returns-details',
    titleText: 'Detalles de libro prestado',
    data: lendBooksReturnDetails
  },
  {
    path: '/loans/renewe-details',
    titleText: 'Detalles de reserva',
    data: reneweDetails
  }
];

export const listingRoutes = [
  'return-date',
  'phone',
  'loans-per-partner'
];