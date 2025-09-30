//archivo centralizado de relaciones entre modelos 
//authors
import Author from '../models/author/Authors.js';
import BookAuthor from '../models/author/BookAuthor.js';
import Book from './book/Book.js';
import Key from './book/Key.js';
//loans
import Loan from '../models/loan/Loan.js';
import LoanBook from '../models/loan/LoanBook.js';
import LoanType from '../models/loan/LoanType.js';
import Reservations from '../models/loan/Reservations.js';
import BookReservations from '../models/loan/BookReservations.js';
//options
import BookTypeGroup from '../models/options/BookTypeGroup.js';
import BookTypeGroupList from '../models/options/BookTypeGroupList.js';
import Employees from '../models/options/Employees.js';
import BookKey from './book/BookKey.js';

//authors
Author.hasMany(BookAuthor, { foreignKey: 'authorCode' });
BookAuthor.belongsTo(Author, { foreignKey: 'authorCode' });

//loans
Loan.hasMany(LoanType, { foreignKey: 'id' });
LoanType.belongsTo(Loan, { foreignKey: 'id' });

Loan.hasMany(Employees, { foreignKey: 'id' });
Employees.belongsTo(Loan, { foreignKey: 'id' });

Reservations.hasMany(BookReservations, { foreignKey: 'reservationId'});

Loan.hasMany(LoanBook, { foreignKey: 'loanId' });
LoanBook.belongsTo(Loan, { foreignKey: 'loanId' });

//BookTypeGroup se relaciona con BookType 
BookTypeGroupList.hasMany(BookTypeGroup, { foreignKey: 'groupId' });
BookTypeGroup.belongsTo(BookTypeGroupList, { foreignKey: 'groupId' });


// ReservaLibro pertenece a Libro y Reserva
BookReservations.belongsTo(Book, { foreignKey: 'idBook' });
BookReservations.belongsTo(Reservations, { foreignKey: 'reservationId' });

//libro tiene muchas reservas
Book.hasMany(BookReservations, { foreignKey: 'idBook' }); //se pone la FK en bookreservations

// Reserva tiene muchas ReservaLibro
Reservations.hasMany(BookReservations, { foreignKey: 'reservationId' });


BookKey.belongsTo(Key, { foreignKey: 'id' });
BookKey.belongsTo(Book, { foreignKey: 'idBook' });

// Claves tiene muchas ClaveLibro
Key.hasMany(BookKey, { foreignKey: 'id' });

// Libro tiene muchas ClaveLibro
Book.hasMany(BookKey, { foreignKey: 'idBook' });