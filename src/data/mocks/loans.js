export const mockLoans = [
  {
    id: '1',
    bookCode: 'BK-1023',
    bookTitle: 'Cien años de soledad',
    partnerNumber: 'P-001',
    partnerName: 'Marcela',
    partnerLastname: 'Gutiérrez',
    retiredDate: '2025-08-01',
    retiredHour: '10:30',
    plannedDate: '2025-09-05',
    returnedDate: '2025-09-06',
    employee: 'Fortunato, Jorge',
    address: 'Av. Colón 1432, Tandil',
    phone: '2494-556677'
  },
  {
    id: '2',
    bookCode: 'BK-2081',
    bookTitle: 'El principito',
    partnerNumber: 'P-002',
    partnerName: 'Lucas',
    partnerLastname: 'Fernández',
    retiredDate: '2025-07-25',
    retiredHour: '14:15',
    plannedDate: '2025-08-08',
    returnedDate: '',
    employee: 'Fortunato, Jorge',
    address: 'Calle Mitre 780, Tandil',
    phone: '2494-338899'
  },
  {
    id: '3',
    bookCode: 'BK-3329',
    bookTitle: 'Rayuela',
    partnerNumber: 'P-003',
    partnerName: 'Julia',
    partnerLastname: 'González',
    retiredDate: '2025-07-30',
    retiredHour: '09:45',
    plannedDate: '2025-08-14',
    returnedDate: '',
    employee: 'Fortunato, Jorge',
    address: 'Paso de los Andes 1020, Tandil',
    phone: '2494-223344'
  },
  {
    id: '4',
    bookCode: 'BK-1197',
    bookTitle: 'Martín Fierro',
    partnerNumber: 'P-004',
    partnerName: 'Tomás',
    partnerLastname: 'Rivas',
    retiredDate: '2025-08-01',
    retiredHour: '16:00',
    plannedDate: '2025-08-16',
    returnedDate: '',
    employee: 'Fortunato, Jorge',
    address: 'Sarmiento 655, Tandil',
    phone: '2494-667788'
  },
  {
    id: '5',
    bookCode: 'BK-4015',
    bookTitle: 'Don Quijote de la Mancha',
    partnerNumber: 'P-005',
    partnerName: 'Agustina',
    partnerLastname: 'Pérez',
    retiredDate: '2025-08-02',
    retiredHour: '11:20',
    plannedDate: '2025-08-17',
    returnedDate: '',
    employee: 'Fortunato, Jorge',
    address: 'Estrada 988, Tandil',
    phone: '2494-445566'
  },
  {
    id: '6',
    bookCode: 'BK-4015',
    bookTitle: 'Don Quijote de la Mancha',
    partnerNumber: 'P-005',
    partnerName: 'Agustina',
    partnerLastname: 'Pérez',
    retiredDate: '2025-08-02',
    retiredHour: '11:20',
    plannedDate: '2025-08-17',
    returnedDate: '',
    employee: 'Fortunato, Jorge',
    address: 'Estrada 988, Tandil',
    phone: '2494-445566'
  }
];

export const mockBooksLoans = [
  {
    id: '1',
    bookCode: 'BK-1023',
    bookTitle: 'Cien años de soledad',
    returnedDate: '2025-08-14',
    retiredDate: '2025-08-01',
    plannedDate: '2025-08-15',
    renewes: '1'
  },
  {
    id: '2',
    bookCode: 'BK-2081',
    bookTitle: 'El principito',
    returnedDate: '2025-08-08',
    retiredDate: '2025-07-25',
    plannedDate: '2025-08-08',
    renewes: '0'
  },
  {
    id: '3',
    bookCode: 'BK-3329',
    bookTitle: 'Rayuela',
    returnedDate: '2025-08-13',
    retiredDate: '2025-07-30',
    plannedDate: '2025-08-14',
    renewes: '2'
  },
  {
    id: '4',
    bookCode: 'BK-1197',
    bookTitle: 'Martín Fierro',
    returnedDate: '2025-08-15',
    retiredDate: '2025-08-01',
    plannedDate: '2025-08-16',
    renewes: '1'
  },
  {
    id: '5',
    bookCode: 'BK-4015',
    bookTitle: 'Don Quijote de la Mancha',
    returnedDate: '2025-08-18',
    retiredDate: '2025-08-02',
    plannedDate: '2025-08-17',
    renewes: '3'
  }
];


export const mockRenewes = [
  {
    id: 1,
    partnerNumber: 'P-001',
    partnerFullName: 'Marcela Gutiérrez',
    name: 'Marcela',
    lastname: 'Gutiérrez',
    bookTitle: 'Cien años de soledad',
    reneweDate: '2025-08-10',
    expectedDate: '2025-08-20',
    books: [
      { id: '1', bookCode: 'B1001', bookTitle: 'Ficciones', position: 1, codClass: '51', codLing: 'M 22', codRcdu: '' },
      { id: '6', bookCode: 'B1006', bookTitle: 'El informe de Brodie', position: 6, codClass: '51', codLing: 'M 22', codRcdu: '' }
    ]
  },
  {
    id: 2,
    partnerNumber: 'P-003',
    partnerFullName: 'Julia González',
    name: 'Julia',
    lastname: 'González',
    bookTitle: 'Rayuela',
    reneweDate: '2025-08-11',
    expectedDate: '2025-08-21',
    books: [
      { id: '3', bookCode: 'B1003', bookTitle: 'Eva Luna', position: 3, codClass: '53', codLing: 'M 24', codRcdu: '' },
      { id: '8', bookCode: 'B1008', bookTitle: 'Paula', position: 8, codClass: '53', codLing: 'M 24', codRcdu: '' },
      { id: '18', bookCode: 'B1018', bookTitle: 'Retrato en sepia', position: 18, codClass: '53', codLing: 'M 24', codRcdu: '' }
    ]
  },
  {
    id: 3,
    partnerNumber: 'P-004',
    partnerFullName: 'Tomás Rivas',
    name: 'Tomás',
    lastname: 'Rivas',
    bookTitle: 'Martín Fierro',
    reneweDate: '2025-08-12',
    expectedDate: '2025-08-22',
    books: [
      { id: '4', bookCode: 'B1004', bookTitle: 'Conversación en La Catedral', position: 4, codClass: '54', codLing: 'M 25', codRcdu: '' },
      { id: '14', bookCode: 'B1014', bookTitle: 'La tía Julia y el escribidor', position: 14, codClass: '54', codLing: 'M 25', codRcdu: '' }
    ]
  },
  {
    id: 4,
    partnerNumber: 'P-005',
    partnerFullName: 'Agustina Pérez',
    name: 'Agustina',
    lastname: 'Pérez',
    bookTitle: 'Don Quijote de la Mancha',
    reneweDate: '2025-08-13',
    expectedDate: '2025-08-23',
    books: [
      { id: '5', bookCode: 'B1005', bookTitle: 'Libertad bajo palabra', position: 5, codClass: '55', codLing: 'M 26', codRcdu: '' },
      { id: '10', bookCode: 'B1010', bookTitle: 'El arco y la lira', position: 10, codClass: '55', codLing: 'M 26', codRcdu: '' },
      { id: '20', bookCode: 'B1020', bookTitle: 'Piedra de sol', position: 20, codClass: '55', codLing: 'M 26', codRcdu: '' }
    ]
  },
  {
    id: 5,
    partnerNumber: 'P-002',
    partnerFullName: 'Lucas Fernández',
    name: 'Lucas',
    lastname: 'Fernández',
    bookTitle: 'El principito',
    reneweDate: '2025-08-08',
    expectedDate: '2025-08-18',
    books: [
      { id: '2', bookCode: 'B1002', bookTitle: 'El coronel no tiene quien le escriba', position: 2, codClass: '52', codLing: 'M 23', codRcdu: '' },
      { id: '7', bookCode: 'B1007', bookTitle: 'Crónica de una muerte anunciada', position: 7, codClass: '52', codLing: 'M 23', codRcdu: '' },
      { id: '17', bookCode: 'B1017', bookTitle: 'Ojos de perro azul', position: 17, codClass: '52', codLing: 'M 23', codRcdu: '' }
    ]
  }
  ,
  {
    id: 6,
    partnerNumber: 'P-002',
    partnerFullName: 'Lucas Fernández',
    name: 'Lucas',
    lastname: 'Fernández',
    bookTitle: 'El principito',
    reneweDate: '2025-08-08',
    expectedDate: '2025-08-18',
    books: [
      { id: '2', bookCode: 'B1002', bookTitle: 'El coronel no tiene quien le escriba', position: 2, codClass: '52', codLing: 'M 23', codRcdu: '' },
      { id: '7', bookCode: 'B1007', bookTitle: 'Crónica de una muerte anunciada', position: 7, codClass: '52', codLing: 'M 23', codRcdu: '' },
      { id: '17', bookCode: 'B1017', bookTitle: 'Ojos de perro azul', position: 17, codClass: '52', codLing: 'M 23', codRcdu: '' }
    ]
  }
];

