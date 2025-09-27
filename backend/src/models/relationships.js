//archivo centralizado de relaciones entre modelos 
//authors
import Author from '../models/author/Authors.js';
import BookAuthor from '../models/author/BookAuthor.js';
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
import RemoveReason from '../models/options/RemoveReason.js';


//authors
Author.hasMany(BookAuthor, { foreignKey: 'authorCode' });
BookAuthor.belongsTo(Author, { foreignKey: 'authorCode' });

//loans
Loan.hasMany(LoanType, { foreignKey: 'id' });
LoanType.belongsTo(Loan, { foreignKey: 'id' });

Loan.hasMany(Employees, { foreignKey: 'id' });
Employees.belongsTo(Loan, { foreignKey: 'id' });

//BookReservations se relaciona con Libro

