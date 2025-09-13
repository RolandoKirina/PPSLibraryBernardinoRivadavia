export const editnewFeesForm = [
  [
    {
      label: 'Mes y año',
      name: 'month_and_year',
      type: 'date'
    },
    {
      label: 'Monto',
      name: 'amount',
      type: 'number'
    }
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
  ],
    [
    
    {
      label: 'Pagada',
      name: 'paid',
      type: 'checkbox'
    }
  ],
];

export default editnewFeesForm;