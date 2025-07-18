export const loanDetailsMenus = [
  {
    id: 1,
    title: 'Datos del Libro',
    active: false,
    rows: [
      [
        { label: 'Código de Libro', value: 'información' }
      ],
      [
        { label: 'Título', value: 'información' }
      ],
      [
        { label: 'Descripción', value: 'información' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Lector',
    active: false,
    rows: [
      [
        { label: 'Nombre', value: 'información' },
        { label: 'DNI', value: 'información' }
      ],
      [
        { label: 'Número de Socio', value: 'información' },
        { label: 'Teléfono', value: 'información' }
      ],
      [
        { label: 'Dirección', value: 'información' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Datos del socio',
    active: false,
    rows: [
        [
            { label: 'Número de socio', value: 'información' }
        ],
        [
            { label: 'Nombre', value: 'información' },
            { label: 'Apellido', value: 'información' }
        ]
    ]
  },
  {
    id: 4,
    title: 'Fechas del préstamo',
    active: false,
    rows: [
        [
            { label: 'Fecha de retiro', value: 'información' },
            { label: 'Hora de Retiro', value: 'información' }
        ],
        [
            { label: 'Fecha prevista', value: 'información' },
            { label: 'Fecha Devolución', value: 'información' }
        ]
    ]
  },
  {
    id: 5,
    title: 'Empleado responsable',
    active: false,
    rows: [
        [
            { label: 'Empleado', value: 'información' }
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
        { label: 'Código de libro', value: 'información' }
      ],
      [
        { label: 'Título', value: 'información' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Fechas del libro préstado',
    active: false,
    rows: [
      [
        { label: 'Fecha prevista', value: 'información' }
      ],
      [
        { label: 'Fecha devolución', value: 'información' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Estado del libro préstado',
    active: false,
    rows: [
      [
        { label: 'Renovación', value: 'Si/No' },
        { label: 'Devuelto', value: 'Si/No' }
      ]
    ]
  }
]