export default function applyRelationships(models) {
  const {
    Author, BookAuthor, Book, Key, BookKey, BookType, Signs,
    Loan, LoanBook, LoanType, Reservations, BookReservations,
    BookTypeGroup, BookTypeGroupList, Employees,
    Partner, PartnerCategory, Reader, ReaderBook, reasonForWithDrawal,
    statePartner, Locality, MaritalStatus,
    Fees, typeDocument
  } = models;

  Author.hasMany(BookAuthor, { as: "BookAuthors", foreignKey: "authorCode", sourceKey: "id" });
  BookAuthor.belongsTo(Author, { as: "Author", foreignKey: "authorCode", targetKey: "id" });

  Book.hasMany(BookAuthor, { as: "BookAuthors", foreignKey: "BookId", sourceKey: "BookId" });
  BookAuthor.belongsTo(Book, { as: "Book", foreignKey: "BookId", targetKey: "BookId" });

  LoanType.hasMany(Loan, { as: "Loans", foreignKey: "loanType", sourceKey: "id" });
  Loan.belongsTo(LoanType, { as: "LoanType", foreignKey: "loanType", targetKey: "id" });

  Employees.hasMany(Loan, { as: "Loans", foreignKey: "employeeId", sourceKey: "id" });
  Loan.belongsTo(Employees, { as: "Employee", foreignKey: "employeeId", targetKey: "id" });

  Loan.hasMany(LoanBook, { as: "LoanBooks", foreignKey: "loanId", sourceKey: "id" });
  LoanBook.belongsTo(Loan, { as: "Loan", foreignKey: "loanId", targetKey: "id" });

  Reader.hasMany(ReaderBook, { as: "ReaderBooks", foreignKey: "readerDNI", sourceKey: "dni" });
  ReaderBook.belongsTo(Reader, { as: "Reader", foreignKey: "readerDNI", targetKey: "dni" });

  Employees.hasMany(ReaderBook, { as: "ReaderBooks", foreignKey: "employeeId", sourceKey: "id" });
  ReaderBook.belongsTo(Employees, { as: "Employee", foreignKey: "employeeId", targetKey: "id" });
  
  Book.hasMany(ReaderBook, { as: "BookReaders", foreignKey: "BookId", sourceKey: "BookId" });
  ReaderBook.belongsTo(Book, { as: "Book", foreignKey: "BookId", targetKey: "BookId" });

  Book.hasMany(LoanBook, { as: "BookLoans", foreignKey: "BookId", sourceKey: "BookId" });
  LoanBook.belongsTo(Book, { as: "Book", foreignKey: "BookId", targetKey: "BookId" });

  Partner.hasMany(Loan, { as: "Loans", foreignKey: "partnerId", sourceKey: "id" });
  Loan.belongsTo(Partner, { as: "Partner", foreignKey: "partnerId", targetKey: "id" });

  Reservations.hasMany(BookReservations, { as: "BookReservations", foreignKey: "reservationId", sourceKey: "id" });
  BookReservations.belongsTo(Reservations, { as: "Reservation", foreignKey: "reservationId", targetKey: "id" });

  Book.hasMany(BookReservations, { as: "BookReservations", foreignKey: "BookId", sourceKey: "BookId" });
  BookReservations.belongsTo(Book, { as: "Book", foreignKey: "BookId", targetKey: "BookId" });

  Partner.hasMany(Reservations, { as: "Reservations", foreignKey: "partnerId", sourceKey: "id" });
  Reservations.belongsTo(Partner, { as: "Partner", foreignKey: "partnerId", targetKey: "id" });

  Key.hasMany(BookKey, { as: "BookKeys", foreignKey: "keyId", sourceKey: "id" });
  BookKey.belongsTo(Key, { as: "Key", foreignKey: "keyId", targetKey: "id" });

  Book.hasMany(BookKey, { as: "BookKeys", foreignKey: "BookId", sourceKey: "BookId" });
  BookKey.belongsTo(Book, { as: "Book", foreignKey: "BookId", targetKey: "BookId" });

  PartnerCategory.hasMany(Partner, { as: "Partners", foreignKey: "idCategory", sourceKey: "idCategory" });
  Partner.belongsTo(PartnerCategory, { as: "PartnerCategory", foreignKey: "idCategory", targetKey: "idCategory" });

  reasonForWithDrawal.hasMany(Partner, { as: "Partners", foreignKey: "idReason", sourceKey: "idReason" });
  Partner.belongsTo(reasonForWithDrawal, { as: "ReasonForWithdrawal", foreignKey: "idReason", targetKey: "idReason" });

  statePartner.hasMany(Partner, { as: "Partners", foreignKey: "idState", sourceKey: "idState" });
  Partner.belongsTo(statePartner, { as: "StatePartner", foreignKey: "idState", targetKey: "idState" });

  BookTypeGroupList.hasMany(BookTypeGroup, { as: "BookTypeGroups", foreignKey: "BookTypeGroupListId", sourceKey: "bookTypeGroupListId" });
  BookTypeGroup.belongsTo(BookTypeGroupList, { as: "BookTypeGroupList", foreignKey: "BookTypeGroupListId", targetKey: "bookTypeGroupListId" });

  BookType.hasMany(BookTypeGroup, { as: "BookTypeGroups", foreignKey: "bookTypeId", sourceKey: "bookTypeId" });
  BookTypeGroup.belongsTo(BookType, { as: "BookType", foreignKey: "bookTypeId", targetKey: "bookTypeId" });

  BookType.hasMany(Book, { as: "Books", foreignKey: "type", sourceKey: "bookTypeId" });
  Book.belongsTo(BookType, { as: "BookType", foreignKey: "type", targetKey: "bookTypeId" });

  Partner.hasMany(Fees, { as: "Fees", foreignKey: "idPartner", sourceKey: "id" });
  Fees.belongsTo(Partner, { as: "Partner", foreignKey: "idPartner", targetKey: "id" });

  Partner.belongsTo(Locality, { as: "Locality", foreignKey: "LocalityId", targetKey: "id" });
  Partner.belongsTo(MaritalStatus, { as: "MaritalStatus", foreignKey: "MaritalStatusId", targetKey: "id" });

  typeDocument.hasMany(Partner, { as: "Partners", foreignKey: "documentType", sourceKey: "Id" });
  Partner.belongsTo(typeDocument, { as: "TypeDocument", foreignKey: "documentType", targetKey: "Id" });
}
