// Archivo centralizado de relaciones entre modelos, usando models como parámetro
export default function applyRelationships(models) {
  const {
    Author, BookAuthor, Book, Key, BookKey, BookType, Signs,
    Loan, LoanBook, LoanType, Reservations, BookReservations,
    BookTypeGroup, BookTypeGroupList, Employees,
    Partner, PartnerCategory, Reader, reasonForWithDrawal,
    statePartner, Locality, MaritalStatus,
    Fees, LastGeneration, Student, Task, Project
  } = models;


//Sequelize no maneja bien las relaciones automáticas (como hasMany, belongsTo, include, etc.) cuando el modelo no tiene una clave primaria única.

//no hace falta usar references en los modelos.

//es mejor que las tablas intermedias tengan atributo id propio, por si en un futuro se escala añadiendo timestamps, etc. y facilita todas las consultas

// 🔁 Un Project tiene muchas Tasks
Project.hasMany(Task, {
  foreignKey: "projectId", // 🧠 nombre lógico del atributo en Task que actúa como clave foránea hacia Project
  sourceKey: "id",         // 🧠 nombre lógico del atributo en Project que actúa como clave primaria
  as: "tasks"              // 🔖 alias para acceder desde Project: project.tasks
});

// 🔁 Un Student tiene muchas Tasks
Student.hasMany(Task, {
  foreignKey: "studentId", // 🧠 nombre lógico del atributo en Task que actúa como clave foránea hacia Student
  sourceKey: "id",         // 🧠 nombre lógico del atributo en Student que actúa como clave primaria
  as: "tasks"              // 🔖 alias para acceder desde Student: student.tasks
});

// 🔁 Cada Task pertenece a un Project
Task.belongsTo(Project, {
  foreignKey: "projectId", // 🧠 nombre lógico en Task que apunta a Project
  targetKey: "id",         // 🧠 nombre lógico en Project que se referencia
  as: "project"            // 🔖 alias para acceder desde Task: task.project
});

// 🔁 Cada Task pertenece a un Student
Task.belongsTo(Student, {
  foreignKey: "studentId", // 🧠 nombre lógico en Task que apunta a Student
  targetKey: "id",         // 🧠 nombre lógico en Student que se referencia
  as: "student"            // 🔖 alias para acceder desde Task: task.student
});



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

  //Libro tiene muchos PrestamoLibro
  Book.hasMany(LoanBook, { foreignKey: 'bookId' });

  //socio tiene muchos Prestamo
  Partner.hasMany(Loan, { foreignKey: 'partnerId' });
  //Prestamo pertenece a socio
  Loan.belongsTo(Partner, { foreignKey: 'partnerId' });

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


  BookTypeGroupList.hasMany(BookTypeGroup, { foreignKey: 'groupIdFk' });
  
  BookTypeGroup.belongsTo(BookTypeGroupList, { foreignKey: 'bookTypeGroupId' });

  BookTypeGroup.belongsTo(BookType, { foreignKey: 'bookTypeId' }); 

  BookType.hasMany(BookTypeGroup, { foreignKey: 'bookTypeIdFk' })

}
