export const listOptions = [
  { label: 'Núm-Apey-Nomb-Direc-Tel-Cuotas-LPend-FInsc', value: 'TypeOne' },
  { label: 'Núm-Apey-Nomb-Direc-Tel-Estado-FInsc', value: 'TypeTwo' },
  { label: 'Núm-Apey-Nomb-Direc-Tel-FBaja-Motivo', value: 'TypeThree' },
  { label: 'Núm-Apey-Nomb-Direc-Tel-Present-X-FInsc', value: 'TypeFour' }
];

export const feesBetweenDatesListOptions = [
  { label: 'Listado de cuotas pagas por categoria', value: 'TypeOneFees' },
  { label: 'Cuotas por letra y categoria', value: 'TypeTwoFees' },
];

export const sortOptions = [
  { label: 'Apellido - Nombre', value: 'lastNameFirstName' },
  { label: 'Cantidad de cuotas impagas', value: 'unpaidFees' },
  { label: 'Cantidad de libros pendientes', value: 'pendingBooks' },
  { label: 'Fecha de Baja', value: 'deactivationDate' },
  { label: 'Fecha Inscripción', value: 'registrationDate' },
  { label: 'Fecha Nacimiento', value: 'birthDate' },
  { label: 'Motivo Baja', value: 'deactivationReason' },
  { label: 'Número de Socio', value: 'memberNumber' }
];

export const sortOptionsLostBooks = [
  { label: 'Apellido del Socio', value: 'memberLastName' },
  { label: 'Código del Libro', value: 'bookCode' },
  { label: 'Fecha de Pérdida', value: 'lossDate' },
  { label: 'Número de Socio', value: 'memberNumber' },
  { label: 'Título del Libro', value: 'bookTitle' }
];

export const titlesByType = {
  TypeOne: 'Listado de Socios - Cuotas - Libros pendientes',
  TypeTwo: 'Listado de Socios dados de alta',
  TypeThree: 'Socios a consideración de la Comisión Directiva',
  TypeFour: 'Listado de Socios - "incorporado por"',
  BookRanking: 'Ranking de libros prestados',
  LostBooks: 'Listado de libros perdidos',
  TypeOneFees: 'Listado de cuotas entre fechas',
  TypeTwoFees: 'Listado de cuotas por letra y categoria',
  phone: 'Préstamos con teléfono',
  return: 'Préstamos con fecha de devolución',
  partner: 'Cantidad de préstamos por socio'
};


export const columnsByType = {
  TypeOne: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Cuotas', accessor: 'fees' },
    { header: 'Libros Pendientes', accessor: 'pendingBooks' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ],
  TypeTwo: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Estado', accessor: 'status' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ],
  TypeThree: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Fecha de Baja', accessor: 'deactivationDate' },
    { header: 'Motivo', accessor: 'reason' }
  ],
  TypeFour: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Presentado por', accessor: 'presentedBy' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ],
  BookRanking: [
    { header: 'Código', accessor: 'bookCode' },
    { header: 'Título', accessor: 'bookTitle' },
    { header: 'Autores', accessor: 'authors' },
    { header: 'CDU', accessor: 'cdu' },
    { header: 'Cantidad', accessor: 'quantity' }
  ],
  LostBooks: [
    { header: 'Fecha', accessor: 'date' },
    { header: 'Código', accessor: 'code' },
    { header: 'Titulo', accessor: 'title' },
    { header: 'Número Socio', accessor: 'partnerNumber' },
    { header: 'Nombre', accessor: 'name' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' }
  ],

  TypeOneFees: [
    { header: 'Número de Socio', accessor: 'memberNumber' },
    { header: 'Apellido', accessor: 'lastName' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Cantidad de Cuotas', accessor: 'installments' }
  ],
  //*este*/
  TypeTwoFees: [
    { header: 'Letra', accessor: 'letter' },
    { header: 'Regular', accessor: 'regular' },
    { header: 'Honorario', accessor: 'honorary' },
    { header: 'Protector', accessor: 'protector' },
    { header: 'Débito', accessor: 'debit' }
  ],
  phone: [
    { header: 'Titulo', accessor: 'bookTitle' },
    { header: 'Codigo', accessor: 'bookCode' },
    { header: 'Numero Socio', accessor: 'partnerNumber' },
    { header: 'Nombre Socio', accessor: 'partnerName' },
    { header: 'Telefono', accessor: 'partnerPhone' },
    { header: 'Fecha retiro', accessor: 'retiredDate' },
    { header: 'Fecha prevista', accessor: 'expectedDate' },
  ],
  return: [
    { header: 'Titulo', accessor: 'bookTitle' },
    { header: 'Codigo', accessor: 'bookCode' },
    { header: 'Numero Socio', accessor: 'partnerNumber' },
    { header: 'Nombre Socio', accessor: 'partnerName' },
    { header: 'Direccion', accessor: 'partnerAddress' },
    { header: 'Fecha retiro', accessor: 'retiredDate' },
    { header: 'Fecha prevista', accessor: 'expectedDate' },
    { header: 'Fecha devolución', accessor: 'returnedDate' },
  ],
  partner: [
    { header: 'Numero Socio', accessor: 'partnerNumber' },
    { header: 'Nombre Socio', accessor: 'partnerName' },
    { header: 'Direccion particular', accessor: 'partnerAddress' },
    { header: 'Telefono particular', accessor: 'partnerPhone' },
    { header: 'Cantidad libros', accessor: 'bookAmount' },
  ]

};

export const dataByType = {
  TypeOne: [
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      fees: 5,
      pendingBooks: 0,
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      fees: 2,
      pendingBooks: 1,
      registrationDate: '22/07/2018'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },
    {
      memberCodeSurname: '1310 GÓMEZ',
      firstName: 'Laura',
      address: 'Belgrano 55',
      phone: '2995012345',
      fees: 0,
      pendingBooks: 3,
      registrationDate: '05/11/2019'
    },
    {
      memberCodeSurname: '1325 RODRÍGUEZ',
      firstName: 'Martín',
      address: 'Av. Roca 88',
      phone: '2994789654',
      fees: 4,
      pendingBooks: 0,
      registrationDate: '14/02/2020'
    },
    {
      memberCodeSurname: '1333 FERNÁNDEZ',
      firstName: 'Sofía',
      address: 'Mitre 120',
      phone: '2994123456',
      fees: 1,
      pendingBooks: 2,
      registrationDate: '30/09/2021'
    },

  ],

  TypeTwo: [
    {
      memberCodeSurname: '1297 VILLAGRESE',
      firstName: 'Alicia',
      address: 'Venezuela 44',
      phone: '2995526739',
      status: 'Activo',
      registrationDate: '10/03/2016'
    },
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      status: 'De baja',
      registrationDate: '22/07/2018'
    }
  ],

  TypeThree: [
    {
      memberCodeSurname: '1302 PÉREZ',
      firstName: 'Carlos',
      address: 'San Martín 102',
      phone: '2994432187',
      deactivationDate: '15/01/2023',
      reason: 'Cambio de domicilio'
    },
    {
      memberCodeSurname: '1340 LÓPEZ',
      firstName: 'María',
      address: 'Alsina 77',
      phone: '2994781234',
      deactivationDate: '03/06/2022',
      reason: 'Fallecimiento'
    }
  ],

  TypeFour: [
    {
      memberCodeSurname: '1350 GARCÍA',
      firstName: 'Julián',
      address: 'Urquiza 33',
      phone: '2994567890',
      presentedBy: 'Sofía Fernández',
      registrationDate: '12/12/2021'
    },
    {
      memberCodeSurname: '1360 RAMÍREZ',
      firstName: 'Lucía',
      address: 'Chacabuco 99',
      phone: '2994123987',
      presentedBy: 'Martín Rodríguez',
      registrationDate: '05/05/2022'
    }
  ],

  BookRanking: [
    {
      bookCode: 'BK-001',
      bookTitle: 'Cien años de soledad',
      authors: 'Gabriel García Márquez',
      cdu: '863.44',
      quantity: 27
    },
    {
      bookCode: 'BK-002',
      bookTitle: 'El Principito',
      authors: 'Antoine de Saint-Exupéry',
      cdu: '843.912',
      quantity: 34
    },
    {
      bookCode: 'BK-003',
      bookTitle: 'Rayuela',
      authors: 'Julio Cortázar',
      cdu: '863.44',
      quantity: 19
    },
    {
      bookCode: 'BK-004',
      bookTitle: 'Don Quijote de la Mancha',
      authors: 'Miguel de Cervantes',
      cdu: '860.3',
      quantity: 41
    },
    {
      bookCode: 'BK-005',
      bookTitle: 'La casa de los espíritus',
      authors: 'Isabel Allende',
      cdu: '863.44',
      quantity: 22
    }
  ],

  LostBooks: [
    {
      date: '2025-01-12',
      code: 'LB-001',
      title: 'Mesa 3',
      partnerNumber: 'REQ-14396',
      name: 'Lucrecia AERUANTE',
      address: 'Avellaneda 120',
      phone: '2995123456'
    },
    {
      date: '2025-02-08',
      code: 'LB-002',
      title: 'Mesa 1',
      partnerNumber: 'REQ-10393',
      name: 'Griselda ABRAHAM',
      address: 'Mitre 88',
      phone: '2994789654'
    },
    {
      date: '2025-03-15',
      code: 'LB-003',
      title: 'Mesa 2',
      partnerNumber: 'REQ-14393',
      name: 'Luciano MATFROLCH',
      address: 'Belgrano 55',
      phone: '2995012345'
    },
    {
      date: '2025-04-03',
      code: 'LB-004',
      title: 'Mesa 4',
      partnerNumber: 'REQ-10392',
      name: 'Facundo AGUILA',
      address: 'San Martín 102',
      phone: '2994432187'
    },
    {
      date: '2025-05-20',
      code: 'LB-005',
      title: 'Mesa 5',
      partnerNumber: 'REQ-10401',
      name: 'María José BAZÁN',
      address: 'Chacabuco 77',
      phone: '2994123987'
    },
    {
      date: '2025-06-11',
      code: 'LB-006',
      title: 'Mesa 2',
      partnerNumber: 'REQ-10402',
      name: 'Esteban CARRERA',
      address: 'Urquiza 33',
      phone: '2994567890'
    },
    {
      date: '2025-07-07',
      code: 'LB-007',
      title: 'Mesa 1',
      partnerNumber: 'REQ-10403',
      name: 'Lucía DÍAZ',
      address: 'Alsina 99',
      phone: '2994781234'
    },
    {
      date: '2025-08-14',
      code: 'LB-008',
      title: 'Mesa 3',
      partnerNumber: 'REQ-10404',
      name: 'Martín ECHAGÜE',
      address: 'Roca 88',
      phone: '2994123456'
    },
    {
      date: '2025-09-01',
      code: 'LB-009',
      title: 'Mesa 4',
      partnerNumber: 'REQ-10405',
      name: 'Sofía FERNÁNDEZ',
      address: 'Venezuela 44',
      phone: '2995526739'
    },
    {
      date: '2025-09-02',
      code: 'LB-010',
      title: 'Mesa 5',
      partnerNumber: 'REQ-10406',
      name: 'Julián GÓMEZ',
      address: 'Lavalle 12',
      phone: '2994789650'
    }
  ],

  TypeOneFees: [
    {
      memberNumber: '14396',
      lastName: 'AERUANTE',
      firstName: 'Lucrecia',
      amount: '6300.00 €',
      installments: 2
    },
    {
      memberNumber: '10393',
      lastName: 'ABRAHAM',
      firstName: 'Griselda Alejandra',
      amount: '7000.00 €',
      installments: 2
    },
    {
      memberNumber: '14393',
      lastName: 'AERDO MATFROLCH',
      firstName: 'Luciano',
      amount: '14000.00 €',
      installments: 4
    },
    {
      memberNumber: '10392',
      lastName: 'AGUILA',
      firstName: 'Facundo Manuel',
      amount: '6000.00 €',
      installments: 2
    },
    {
      memberNumber: '10401',
      lastName: 'BAZÁN',
      firstName: 'María José',
      amount: '8200.00 €',
      installments: 3
    },
    {
      memberNumber: '10402',
      lastName: 'CARRERA',
      firstName: 'Esteban',
      amount: '5600.00 €',
      installments: 1
    },
    {
      memberNumber: '10403',
      lastName: 'DÍAZ',
      firstName: 'Lucía',
      amount: '9100.00 €',
      installments: 2
    },
    {
      memberNumber: '10404',
      lastName: 'ECHAGÜE',
      firstName: 'Martín',
      amount: '7500.00 €',
      installments: 3
    },
    {
      memberNumber: '10405',
      lastName: 'FERNÁNDEZ',
      firstName: 'Sofía',
      amount: '6700.00 €',
      installments: 2
    },
    {
      memberNumber: '10406',
      lastName: 'GÓMEZ',
      firstName: 'Julián',
      amount: '8800.00 €',
      installments: 4
    }
  ],
  TypeTwoFees: [
    {
      letter: 'A',
      regular: 65,
      honorary: '226750.00 €',
      protector: 4,
      debit: '14000.00 €'
    },
    {
      letter: 'B',
      regular: 48,
      honorary: '198500.00 €',
      protector: 3,
      debit: '12500.00 €'
    },
    {
      letter: 'C',
      regular: 72,
      honorary: '245000.00 €',
      protector: 5,
      debit: '16000.00 €'
    },
    {
      letter: 'D',
      regular: 55,
      honorary: '210300.00 €',
      protector: 2,
      debit: '9800.00 €'
    },
    {
      letter: 'E',
      regular: 60,
      honorary: '230000.00 €',
      protector: 6,
      debit: '17500.00 €'
    },
    {
      letter: 'F',
      regular: 49,
      honorary: '190000.00 €',
      protector: 3,
      debit: '11000.00 €'
    },
    {
      letter: 'G',
      regular: 70,
      honorary: '250000.00 €',
      protector: 4,
      debit: '20000.00 €'
    },
    {
      letter: 'H',
      regular: 58,
      honorary: '215000.00 €',
      protector: 2,
      debit: '9500.00 €'
    },
    {
      letter: 'I',
      regular: 62,
      honorary: '240000.00 €',
      protector: 5,
      debit: '18500.00 €'
    },
    {
      letter: 'J',
      regular: 53,
      honorary: '205000.00 €',
      protector: 3,
      debit: '12000.00 €'
    }
  ],

  phone: [
    {
      bookTitle: 'El principito',
      bookCode: 'BK-00012',
      partnerNumber: '123',
      partnerName: 'García Ana',
      partnerPhone: '2995526739',
      retiredDate: '04/07/2025',
      expectedDate: '06/07/2025'
    },
    {
      bookTitle: 'Cien años de soledad',
      bookCode: 'BK-00045',
      partnerNumber: '456',
      partnerName: 'Pérez Carlos',
      partnerPhone: '2994432187',
      retiredDate: '01/07/2025',
      expectedDate: '08/07/2025'
    }
  ],

  return: [
    {
      bookTitle: 'El principito',
      bookCode: 'BK-00012',
      partnerNumber: '123',
      partnerName: 'García Ana',
      partnerAdress: 'Venezuela 44',
      retiredDate: '04/07/2025',
      expectedDate: '06/07/2025',
      returnedDate: '06/07/2025'
    },
    {
      bookTitle: 'Cien años de soledad',
      bookCode: 'BK-00045',
      partnerNumber: '456',
      partnerName: 'Pérez Carlos',
      partnerAdress: 'San Martín 102',
      retiredDate: '01/07/2025',
      expectedDate: '08/07/2025',
      returnedDate: '07/07/2025'
    }
  ],

  partner: [
    {
      bookTitle: 'El principito',
      bookCode: 'BK-00012',
      partnerNumber: '123',
      partnerName: 'García Ana',
      partnerPhone: '2995526739',
      retiredDate: '04/07/2025',
      bookAmount: 1
    },
    {
      bookTitle: 'Cien años de soledad',
      bookCode: 'BK-00045',
      partnerNumber: '456',
      partnerName: 'Pérez Carlos',
      partnerPhone: '2994432187',
      retiredDate: '01/07/2025',
      bookAmount: 2
    }
  ]

};
