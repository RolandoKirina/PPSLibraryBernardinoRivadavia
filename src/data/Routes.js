import { lendBooksDetails, lendBooksReturnDetails, reneweDetails } from './showdetails/LoanDetails.js';
import { updateLendBookFields, reneweLoanFields } from './forms/LoanForms.js';

export const loanFormRoutes = [
  {
    path: '/loans/book-on-loan-edit',
    title: 'Editar Libro en Prestamo',
    fields: updateLendBookFields
  },
  {
    path: '/loans/renewe-add',
    title: 'Agregar reserva',
    fields: reneweLoanFields
  },
  {
    path: '/loans/renewe-edit',
    title: 'Editar reserva',
    fields: reneweLoanFields
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
  'LoanListingPhone',
  'LoanListingReturnDate',
  'LoanListingPerPartner'
];