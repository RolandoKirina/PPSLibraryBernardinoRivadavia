// Archivo centralizado de relaciones entre modelos, usando models como parámetro
export default function applyRelationships(models) {
  const {
    Author, BookAuthor, Book, Key, BookKey, BookType, Signs,
    Loan, LoanBook, LoanType, Reservations, BookReservations,
    BookTypeGroup, BookTypeGroupList, Employees,
    Partner, PartnerCategory, Reader, reasonForWithDrawal,
    statePartner, Locality, MaritalStatus,
    Fees, LastGeneration
  } = models;

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
  Reservations.hasMany(BookReservations, { foreignKey: 'reservationId' });

  //Prestamo tiene muchos PrestamoLibro
  Loan.hasMany(LoanBook, { foreignKey: 'loanId' });

  //PrestamoLibro pertenece a Prestamo y Libro
  LoanBook.belongsTo(Loan, { foreignKey: 'id' });
  LoanBook.belongsTo(Book, { foreignKey: 'idBook' });

  //socio tiene muchos Prestamo
  Partner.hasMany(Loan, { foreignKey: 'partnerId' });
  //Prestamo pertenece a socio
  Loan.belongsTo(Partner, { foreignKey: 'partnerId' });

  //BookTypeGroupList tiene muchos con BookTypeGroup 
  BookTypeGroupList.hasMany(BookTypeGroup, { foreignKey: 'groupId' });
  //BookType tiene muchos BookTypeGroup
  BookType.hasMany(BookTypeGroup, { foreignKey: 'bookTypeId'})
  //TipoGrupoLibro pertenece a GrupoTipoLibro y TipoLibro
  BookTypeGroup.belongsTo(BookTypeGroupList, { foreignKey: 'groupId' });
  BookTypeGroup.belongsTo(BookType, { foreignKey: 'bookTypeId' });

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

  PartnerCategory.hasMany(Partner, { foreignKey: 'idCategory' });
  Partner.belongsTo(PartnerCategory, { foreignKey: 'idCategory' });

  Partner.belongsTo(reasonForWithDrawal, { foreignKey: 'idReason' });
  reasonForWithDrawal.hasMany(Partner, { foreignKey: 'idReason' });

  Partner.belongsTo(statePartner, { foreignKey: 'idState' });
  statePartner.hasMany(Partner, { foreignKey: 'idState' });
}
