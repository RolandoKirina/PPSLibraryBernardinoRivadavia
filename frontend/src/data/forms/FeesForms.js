export const editnewFeesForm = [
  [
    {
      label: 'Estado',
      name: 'paid',
      type: 'select',
      options: [
        { value: true, label: 'Pagada' },
        { value: false, label: 'Impaga' }
      ]
    },
    {
      label: 'Monto',
      name: 'amount',
      type: 'number'
    },
    
 
  ],

  [
   
    {
      label: 'Fecha de Pago',
      name: 'date_of_paid',
      type: 'date'
    },
    {
      label: 'Observación',
      name: 'observation',
      type: 'text'
    }
  ]
];

export const addnewFeesForm = [
  [
    {
      label: 'Mes y año',
      name: 'month_and_year',
      type: 'date',
      required: true
    },
    {
      label: 'Monto',
      name: 'amount',
      type: 'number',
      required: true
    },
    {
      label: 'Observación',
      name: 'observation',
      type: 'text',
      required: true

    }
  ]
];

export default addnewFeesForm;
