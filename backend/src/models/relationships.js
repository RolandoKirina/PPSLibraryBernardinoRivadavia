export default function applyRelationships(models) {
  const {
    Author, BookAuthor, Book, Key, BookKey, BookType, Signs,
    Loan, LoanBook, LoanType, Reservations, BookReservations,
    BookTypeGroup, BookTypeGroupList, Employees,
    Partner, PartnerCategory, Reader, reasonForWithDrawal,
    statePartner, Locality, MaritalStatus,
    Fees, typeDocument
  } = models;

  Author.hasMany(BookAuthor, { foreignKey: 'authorCode' ,sourceKey:"id"});

  BookAuthor.belongsTo(Author, { foreignKey: 'authorCode', targetKey:"id"});

  BookAuthor.belongsTo(Book, { foreignKey: 'BookId', targetKey: "BookId"});

  Book.hasMany(BookAuthor, { foreignKey: 'BookId' ,sourceKey:"BookId"});

  LoanType.hasMany(Loan, { foreignKey: 'loanType', sourceKey:"id"});

  Loan.belongsTo(LoanType, { foreignKey: 'loanType' , targetKey:"id"});

  Employees.hasMany(Loan, { foreignKey: 'employeeId', sourceKey:"id" }); 

  Loan.belongsTo(Employees, {foreignKey: 'employeeId',targetKey:"id" });

  Reservations.hasMany(BookReservations, { foreignKey: 'reservationId', sourceKey:"id" });

  Loan.hasMany(LoanBook, { foreignKey: 'loanId', sourceKey:"id" });

  LoanBook.belongsTo(Loan, { foreignKey: 'loanId' , targetKey:"id"});
  LoanBook.belongsTo(Book, { foreignKey: 'BookId', targetKey:"BookId" });

  Book.hasMany(LoanBook, { foreignKey: 'BookId' , sourceKey:"BookId" });

  Partner.hasMany(Loan, { foreignKey: 'partnerId', sourceKey:"id" });
  Loan.belongsTo(Partner, { foreignKey: 'partnerId',targetKey:"id"});

  BookReservations.belongsTo(Book, { foreignKey: 'BookId' , targetKey: "BookId"});

  Book.hasMany(BookReservations, { foreignKey: 'BookId', sourceKey: "BookId"});

  Reservations.hasMany(BookReservations, { foreignKey: 'reservationId', sourceKey:"id"});

  BookReservations.belongsTo(Reservations, { foreignKey: 'reservationId',targetKey:"id"});

  BookKey.belongsTo(Key, { foreignKey: 'keyId',targetKey:"id"});
  BookKey.belongsTo(Book, { foreignKey: 'BookId',targetKey:"BookId" });

  Key.hasMany(BookKey, { foreignKey: 'keyId', sourceKey: "id"});
  Book.hasMany(BookKey, { foreignKey: 'BookId', sourceKey: "BookId"});

  PartnerCategory.hasMany(Partner, { foreignKey: 'idCategory', sourceKey: "idCategory" });
  Partner.belongsTo(PartnerCategory, { foreignKey: 'idCategory', targetKey:"idCategory" });

  reasonForWithDrawal.hasMany(Partner, { foreignKey: 'idReason', sourceKey:"idReason" });

  Partner.belongsTo(reasonForWithDrawal, { foreignKey: 'idReason' ,targetKey:"idReason"});

  Partner.belongsTo(statePartner, { foreignKey: 'idState', targetKey:"idState" });
  statePartner.hasMany(Partner, { foreignKey: 'idState', sourceKey: "idState"});


  BookTypeGroupList.hasMany(BookTypeGroup, { foreignKey: 'BookTypeGroupListId', sourceKey:"bookTypeGroupListId"});
  
  BookTypeGroup.belongsTo(BookTypeGroupList, { foreignKey: 'BookTypeGroupListId' ,targetKey:"bookTypeGroupListId"});

  BookTypeGroup.belongsTo(BookType, { foreignKey: 'bookTypeId', targetKey: "bookTypeId"}); 

  BookType.hasMany(BookTypeGroup, { foreignKey: 'bookTypeId', sourceKey:"bookTypeId" });

  BookType.hasMany(Book, { foreignKey: "type", sourceKey: "bookTypeId"});
  Book.belongsTo(BookType, { foreignKey: "type", targetKey: "bookTypeId"});


  Partner.hasMany(Fees,{foreignKey:"idPartner", sourceKey:"id"});
  Fees.belongsTo(Partner,{foreignKey:"idPartner", sourceKey:"id"});

  Partner.belongsTo(Locality,{foreignKey:"LocalityId", sourceKey:"id"});
  Partner.belongsTo(MaritalStatus,{foreignKey:"MaritalStatusId", sourceKey:"id"});

  typeDocument.hasMany(Partner, { foreignKey: "documentType", sourceKey: "Id"});
  Partner.belongsTo(typeDocument, { foreignKey: "documentType", targetKey: "Id"});
}
