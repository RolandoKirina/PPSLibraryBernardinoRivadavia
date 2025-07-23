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