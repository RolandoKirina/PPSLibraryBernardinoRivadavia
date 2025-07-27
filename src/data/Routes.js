import { authorBooksDetails } from './author/AuthorDetails.js';
import { editAuthorBookFormFields } from './author/AuthorForms.js';
import { lendBooksDetails, lendBooksReturnDetails, reneweDetails } from './loan/LoanDetails.js';
import { updateLendBookFields, addLendBookFields, reneweLoanFields } from './loan/LoanForms.js';

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
  },
  //authors
  {
    path: '/authors/author-books-edit',
    title: 'Editar Libro en autor',
    fields: editAuthorBookFormFields
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
  },
  //authors
   {
    path: '/authors/author-books-details',
    titleText: 'Detalles de libro de autor',
    data: authorBooksDetails
  },
];

export const listingRoutes = [
  'return-date',
  'phone',
  'loans-per-partner'
];