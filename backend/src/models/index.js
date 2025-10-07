import sequelize from '../configs/database.js';
import applyRelationships from './relationships.js';


// Author
import Author from './author/Authors.js';
import BookAuthor from './author/BookAuthor.js';

// Book
import Book from './book/Book.js';
import Key from './book/Key.js';
import BookKey from './book/BookKey.js';
import Signs from './book/Signs.js';

// Fee
import Fees from './fee/fee.js';
import LastGeneration from './fee/LastGeneration.js';

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
import BookType from './options/BookType.js';

// Partner
import Locality from './partner/locality.js';
import MaritalStatus from './partner/MaritalStatus.js';
import Partner from './partner/Partner.js';
import PartnerCategory from './partner/partnerCategory.js';
// import PartnerFeeWithDrawal from './partner/PartnerFeeWithDrawal.js';
// import PartnerPass from './partner/PartnerPass.js';
// import TypeDocument from './partner/typeDocument.js';

import statePartner from './partner/statePartner.js';
import Reader from './partner/reader.js';
import reasonForWithDrawal from './partner/reasonForWithdrawal.js';
import typeDocument from './partner/TypeDocument.js';

// Construir objeto de modelos con nombres tal cual están definidos
const models = {

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
  statePartner,
  Reader,
  reasonForWithDrawal,
  typeDocument
};

// Aplicar todas las relaciones
applyRelationships(models);

// Exportar todo con nombres intactos
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
  statePartner,
  Reader,
  reasonForWithDrawal,
  typeDocument
};
