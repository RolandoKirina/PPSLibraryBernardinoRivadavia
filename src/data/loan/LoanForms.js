export const updateLendBookFields = [
  {
    label: 'Renovación',
    name: 'renewalSelect',
    type: 'select',
    options: [
      { label: 'Si/no', value: '' },
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    label: 'Devuelto',
    name: 'returnedSelect',
    type: 'select',
    options: [
      { label: 'Si/no', value: '' },
      { label: 'Sí', value: 'si' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    label: 'Fecha Prevista',
    name: 'expectedDate',
    type: 'date'
  },
  {
    label: 'Fecha de Devolución',
    name: 'returnDate',
    type: 'date'
  },
  {
    label: 'Devuelto',
    name: 'returnedCheckbox',
    type: 'checkbox'
  },
  {
    label: 'Renovación',
    name: 'renewalCheckbox',
    type: 'checkbox'
  }
];

export const addLendBookFields = [
  {
    label: 'Código de Libro',
    name: 'bookCode',
    type: 'text'
  },
  {
    label: 'Título',
    name: 'title',
    type: 'text'
  },
  {
    label: 'Fecha Prevista',
    name: 'expectedDate',
    type: 'date'
  },
  {
    label: 'Fecha de Devolución',
    name: 'returnDate',
    type: 'date'
  },
  {
    label: 'Devuelto',
    name: 'returned',
    type: 'checkbox'
  },
  {
    label: 'Renovación',
    name: 'renewal',
    type: 'checkbox'
  },
  {
    label: 'Cantidad Renovaciones',
    name: 'renewalCount',
    type: 'counter'
  }
];



export const editLoanformFields = [
    {
        label: 'Fecha de Retiro',
        name: 'date_out',
        type: 'date'
    },
    {
        label: 'Fecha Prevista',
        name: 'expected_return',
        type: 'date'
    },
    {
        label: 'Fecha de Devolución',
        name: 'actual_return',
        type: 'date'
    },
    {
        label: 'Empleado Responsable',
        name: 'employee',
        type: 'text'
    }
    ];

export const reneweLoanFields = [
   {
    label: 'Numero',
    name: 'partner_number',
    type: 'number'
  },
  {
    label: 'Apellido, Nombre',
    name: 'fullname',
    type: 'text'
  },
  {
    label: 'Fecha de Reserva',
    name: 'date_out',
    type: 'date'
  },
  {
    label: 'Fecha Promesa',
    name: 'expected_return',
    type: 'date'
  },
  {
    label: 'Titulo libro',
    name: 'title',
    type: 'text'
  },


];


export const editPendingQuoteFields = [
  {
    label: 'Mes',
    name: 'month',
    type: 'text'
  },
  {
    label: 'Año',
    name: 'year',
    type: 'number'
  },
  {
    label: 'Monto',
    name: 'amount',
    type: 'number'
  },
  {
    label: 'Paga',
    name: 'paid',
    type: 'select',
    options: [
      { label: 'Sí/No', value: '' },
      { label: 'Sí', value: 'yes' },
      { label: 'No', value: 'no' }
    ]
  },
  {
    label: 'Fecha Pago',
    name: 'payment_date',
    type: 'date'
  }
];

