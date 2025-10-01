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
import BookType from './book/BookType.js';
import Partner from './partner/partner.js';

//authors
//Autor tiene muchos LibroAutor
Author.hasMany(BookAuthor, { foreignKey: 'authorCode' });

//LibroAutor pertenece a Autor y a Libro
BookAuthor.belongsTo(Author, { foreignKey: 'authorCode' });
BookAuthor.belongsTo(Book, { foreignKey: 'idBook' });

//loans
//Prestamo tiene muchos TipoPrestamo
Loan.hasMany(LoanType, { foreignKey: 'id' });

//TipoPrestamo pertenece a Prestamo
LoanType.belongsTo(Loan, { foreignKey: 'id' });

//Prestamo tiene muchos empleados
Loan.hasMany(Employees, { foreignKey: 'id' });

//Empleado pertenece a Prestamo
Employees.belongsTo(Loan, { foreignKey: 'id' });

//Reservas tiene muchos ReservaLibro
Reservations.hasMany(BookReservations, { foreignKey: 'reservationId'});

//Prestamo tiene muchos PrestamoLibro
Loan.hasMany(LoanBook, { foreignKey: 'loanId' });

//PrestamoLibro pertenece a Prestamo y Libro
LoanBook.belongsTo(Loan, { foreignKey: 'loanId' });
LoanBook.belongsTo(Book, { foreignKey: 'idBook' });

//Prestamo pertenece a socio
Loan.belongsTo(Partner, { foreignKey: 'id' });

//socio tiene muchos Prestamo



//BookTypeGroup se relaciona con BookType 
BookTypeGroupList.hasMany(BookTypeGroup, { foreignKey: 'groupId' });

//TipoGrupoLibro pertenece a GrupoTipoLibro y TipoLibro
BookTypeGroup.belongsTo(BookTypeGroupList, { foreignKey: 'groupId' });
BookTypeGroup.belongsTo(BookType, { foreignKey: 'id' });

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