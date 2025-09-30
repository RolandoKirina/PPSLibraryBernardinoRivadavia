// models/index.js
import sequelize from '../configs/database.js';

// Author
import Author from './author/Authors.js';
import BookAuthor from './author/BookAuthor.js';

// Book
import Book from './book/Book.js';
import BookType from './book/BookType.js';
import Key from './book/Key.js';
import BookKey from './book/BookKey.js';
import Signs from './book/Signs.js';

// Fee
import Fees from './fee/Fees.js';
import LastGeneration from './fee/LastGeneration.js';
import PartnerCategory from './fee/PartnerCategory.js';

// Loan
import BookReservations from './loan/BookReservations.js';
import Loan from './loan/Loan.js';
import LoanBook from './loan/LoanBook.js';
import LoanType from './loan/LoanType.js';
import Reservations from './loan/Reservations.js';

// Options
import BookTypeGroup from './options/BookTypeGroup.js';
import BookTypeGroupList from './options/BookTypeGroupList.js';
import Employees from './options/Employees.js';
import RemoveReason from './options/RemoveReason.js'; // si existe

// Partner
import Locality from './partner/locality.js';
import MaritalStatus from './partner/maritalStatus.js';
import Partner from './partner/Partner.js';
// import PartnerFeeWithDrawal from './partner/PartnerFeeWithDrawal.js';
// import PartnerPass from './partner/PartnerPass.js';
// import TypeDocument from './partner/typeDocument.js';

export {
  sequelize,
  Author,
  BookAuthor,
  Book,
  BookType,
  Key,
  BookKey,
  Signs,
  Fees,
  LastGeneration,
  PartnerCategory,
  BookReservations,
  Loan,
  LoanBook,
  LoanType,
  Reservations,
  BookTypeGroup,
  BookTypeGroupList,
  Employees,
  RemoveReason,
  Locality,
  MaritalStatus,
  Partner,
//   PartnerFeeWithDrawal,
//   PartnerPass,
//   TypeDocument
};
