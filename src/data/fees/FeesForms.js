export const editnewFeesForm = [
  [
 {
    label: 'Mes',
    name: 'month',
    type: 'number'
  },
  {
    label: 'Año',
    name: 'year',
    type: 'number'
  }
  ]
 ,
 [
  {
    label: 'Monto',
    name: 'amount',
    type: 'number'
  },
  {
    label: 'Pagada',
    name: 'paid',
    type: 'checkbox'
  }
 ]
,[
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


export default editnewFeesForm;