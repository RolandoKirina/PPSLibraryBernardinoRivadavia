export const loanDetailsInfo = [
  {
    id: 1,
    title: 'Datos del Libro',
    active: false,
    rows: [
      [
        { label: 'Código de Libro', value: 'información', attribute: 'codeInventory' },
        { label: 'Título', value: 'información', attribute: 'title' }
      ],
    ]
  },
  {
    id: 2,
    title: 'Lector',
    active: false,
    rows: [
      [
        { label: 'Nombre', value: 'información', attribute: 'partnerName' },
        { label: 'DNI', value: 'información', attribute: 'partnerDni' } // Este campo no está en mockLoans actualmente
      ],
      [
        { label: 'Número de Socio', value: 'información', attribute: 'partnerNumber' },
        { label: 'Teléfono', value: 'información', attribute: 'homePhone' }
      ],
      [
        { label: 'Dirección', value: 'información', attribute: 'homeAddress' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Datos del socio',
    active: false,
    rows: [
      [
        { label: 'Nombre', value: 'información', attribute: 'name' },
        { label: 'Apellido', value: 'información', attribute: 'surname' }
      ],
      [
        { label: 'Número de socio', value: 'información', attribute: 'partnerNumber' }
      ],
    ]
  },
  {
    id: 4,
    title: 'Fechas del préstamo',
    active: false,
    rows: [
      [
        { label: 'Fecha de retiro', value: 'información', attribute: 'retiredDate' },
        { label: 'Hora de Retiro', value: 'información', attribute: 'retiredHour' }
      ],
      [
        { label: 'Fecha prevista', value: 'información', attribute: 'expectedDate' },
        { label: 'Fecha Devolución', value: 'información', attribute: 'returnDate' }
      ]
    ]
  },
  {
    id: 5,
    title: 'Empleado responsable',
    active: false,
    rows: [
      [
        { label: 'Empleado', value: 'información', attribute: 'employee' }
      ]
    ]
  }
];




export const lendBooksDetails = [
  {
    id: 1,
    title: 'Datos del libro',
    active: false,
    rows: [
      [
        { label: 'Código de libro', value: '000006828' }
      ],
      [
        { label: 'Título', value: '100 gramos de ejecutivos' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Fechas del libro préstado',
    active: false,
    rows: [
      [
        { label: 'Fecha prevista', value: '14/08/25' }
      ],
      [
        { label: 'Fecha devolución', value: '12/08/25' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Estado del libro préstado',
    active: false,
    rows: [
      [
        { label: 'Renovación', value: '4' },
        { label: 'Devuelto', value: 'No' }
      ]
    ]
  }
]

export const lendBooksReturnDetails = [
  {
    id: 1,
    title: 'Datos del libro',
    active: false,
    rows: [
      [
        { label: 'Código de libro', value: 'información', attribute: 'bookCode' }
      ],
      [
        { label: 'Título', value: 'información', attribute: 'bookTitle' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Fechas del libro prestado',
    active: false,
    rows: [
      [
        { label: 'Fecha retiro', value: 'información', attribute: 'retiredDate' }
      ],
      [
        { label: 'Fecha prevista', value: 'información', attribute: 'plannedDate' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Estado del libro prestado',
    active: false,
    rows: [
      [
        { label: 'Renovación', value: 'Si/No', attribute: 'renewes' }
      ]
    ]
  }
];


export const reneweDetails = [
  {
    id: 1,
    title: 'Datos del libro',
    active: false,
    rows: [
      [
        { label: 'Título', value: 'El principito', attribute: 'bookTitle' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Datos del socio',
    active: false,
    rows: [
      [
        { label: 'Número de socio', value: 'P-002', attribute: 'partnerNumber' }
      ],
      [
        { label: 'Nombre', value: 'Lucas', attribute: 'name' },
        { label: 'Apellido', value: 'Fernández', attribute: 'lastname' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Fechas de reserva',
    active: false,
    rows: [
      [
        { label: 'Fecha de reserva', value: '2025-08-08', attribute: 'reneweDate' },
        { label: 'Fecha de promesa', value: '2025-08-18', attribute: 'expectedDate' }
      ]
    ]
  }
];




