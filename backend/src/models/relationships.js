//archivo centralizado de relaciones entre modelos 
//authors
import Author from '../models/author/Authors.js';
import BookAuthor from '../models/author/BookAuthor.js';

//books

import Book from './book/Book.js';
import Key from './book/Key.js';
import BookKey from './book/BookKey.js';
import BookType from './book/BookType.js';
import Signs from './book/Signs.js';

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

//partner
import Partner from './partner/partner.js';
import PartnerCategory from './partner/partnerCategory.js';
import Reader from './partner/reader.js';
import ReasonForWithdrawal from './partner/reasonForWithdrawal.js';
import StatePartner from './partner/statePartner.js';
import Locality from './partner/locality.js';
import MaritalStatus from './partner/maritalStatus.js';


//fee

import Fee from './fee/fee.js';
import LastGeneration from './fee/LastGeneration.js';
import statePartner from './partner/statePartner.js';

//partner has a lot of loans


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


Employees.hasMany(Loan, { foreignKey: 'employeeId' }); // Un empleado tiene muchos préstamos
Loan.belongsTo(Employees, {
  foreignKey: {
    name: 'employeeId',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
});


//Reservas tiene muchos ReservaLibro
Reservations.hasMany(BookReservations, { foreignKey: 'reservationId'});

//Prestamo tiene muchos PrestamoLibro
Loan.hasMany(LoanBook, { foreignKey: 'loanId' });

//PrestamoLibro pertenece a Prestamo y Libro
LoanBook.belongsTo(Loan, { foreignKey: 'loanId' });
LoanBook.belongsTo(Book, { foreignKey: 'idBook' });

//Prestamo pertenece a socio
Loan.belongsTo(Partner, { foreignKey: 'id' });


Partner.hasMany(Loan,{foreignKey: 'partnerId'})
Loan.belongsTo(Partner,{foreignKey:'partnerId'})

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
Book.hasMany(BookKey, { foreignKey: 'idBook' });


PartnerCategory.hasMany(Partner, {foreignKey: 'idCategory'})
Partner.belongsTo(PartnerCategory,{foreignKey:'idCategory'})


Partner.belongsTo(ReasonForWithdrawal,{foreignKey: 'idReason'})
ReasonForWithdrawal.hasMany(Partner, { foreignKey: 'idReason' });

Partner.belongsTo(StatePartner,{foreignKey: 'idState'})
statePartner.hasMany(Partner,{foreignKey:'idState'})