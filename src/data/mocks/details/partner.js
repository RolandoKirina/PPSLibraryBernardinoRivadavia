export const DetailPartner = [
  {
    id: 1,
    title: 'Datos personales',
    active: false,
    rows: [
      [
        { label: 'Número de socio', value: 'información',attribute:"id" },
        { label: 'Nombre', value: 'información',attribute:"partnerName" },
         { label: 'Apellido', value: 'información',attribute:"partnerSurname" },
         {label:'DNI',value: 'información',attribute:"DNI"},
         {label:'Estado',value:'información',attribute:"statePartner"}
      ],
    ]
  },
  {
    id: 2,
    title: 'Contacto',
    active: false,
    rows: [
      [
        { label: 'Numero de teléfono', value: 'información', attribute: 'telephone' },
        { label: 'Dirección de cobro', value: 'información', attribute: 'collectionadress' } 
      ],
    ]
  },
  {
    id: 3,
    title: 'Estado de la cuenta',
    active: false,
    rows: [
      [
        { label: 'Libros pendientes', value: 'información', attribute: 'pendingbooks' },
        { label: 'Cuentas impagas', value: 'información', attribute: 'unpaidfees' } 
      ],[
         { label: 'Motivo baja', value: 'información', attribute: 'reasonwithdrawal' },
        { label: 'Categoria', value: 'información', attribute: 'category' } 
      ]
    ]
  }
];
