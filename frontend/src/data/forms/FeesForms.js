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
      label: 'Mes',
      name: 'month',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Seleccione un mes...' },
        { value: 1, label: 'Enero' },
        { value: 2, label: 'Febrero' },
        { value: 3, label: 'Marzo' },
        { value: 4, label: 'Abril' },
        { value: 5, label: 'Mayo' },
        { value: 6, label: 'Junio' },
        { value: 7, label: 'Julio' },
        { value: 8, label: 'Agosto' },
        { value: 9, label: 'Septiembre' },
        { value: 10, label: 'Octubre' },
        { value: 11, label: 'Noviembre' },
        { value: 12, label: 'Diciembre' }
      ]
    },
    {
      label: 'Año',
      name: 'year',
      type: 'number',
      required: true,
      min: 2000,
      max: 2100
    }
  ],
  [
    {
      label: 'Observación',
      name: 'observation',
      type: 'text',
    }
  ]
];

export default addnewFeesForm;
