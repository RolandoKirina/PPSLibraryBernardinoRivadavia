/*export const DetailPartner = [
  {
    id: 1,
    title: 'Datos personales',
    active: false,
    rows: [
      [
        { label: 'Número de socio', value: 'información', attribute: "id" },
        { label: 'Nombre', value: 'información', attribute: "name" },
      ],
      [
        { label: 'Apellido', value: 'información', attribute: "surname" },
        { label: 'DNI', value: 'información', attribute: "documentNumber" },
      ],
      [
        { label: 'Estado', value: 'información', attribute: "isActive" }
      ]
    ]
  },
  {
    id: 2,
    title: 'Contacto',
    active: false,
    rows: [
      [
        { label: 'Numero de teléfono', value: 'información', attribute: 'homePhone' },
        { label: 'Dirección de cobro', value: 'información', attribute: 'collectionAddress' }
      ],
    ]
  },
  {
    id: 3,
    title: 'Estado de la cuenta',
    active: false,
    rows: [
      [
        { label: 'Libros pendientes', value: 'información', attribute: 'pendingBooks' },
        { label: 'Cuentas impagas', value: 'información', attribute: 'unpaidFees' }
      ], [
        { label: 'Motivo baja', value: 'información', attribute: 'idReason' },
        { label: 'Categoria', value: 'información', attribute: 'idCategory' }
      ]
    ]
  }
];
*/


export const DetailPartner = [
  {
    id: 1,
    title: "Datos personales",
    active: false,
    rows: [
      [
        { label: "Número de socio", value: "información", attribute: "partnerNumber" },
        { label: "Nombre", value: "información", attribute: "name" },
      ],
      [
        { label: "Apellido", value: "información", attribute: "surname" },
        { label: "Fecha de nacimiento", value: "información", attribute: "birthDate" },
      ],
      [
        { label: "Tipo de documento", value: "información", attribute: "documentType" },
        { label: "Número de documento", value: "información", attribute: "documentNumber" },
      ],
      [
        { label: "Estado civil", value: "información", attribute: "MaritalStatusId" },
        { label: "Nacionalidad", value: "información", attribute: "nationality" },
      ],
      [
        { label: "Profesión", value: "información", attribute: "profession" },
        { label: "Presentado por", value: "información", attribute: "presentedBy" },
      ],
      [
        { label: "Fecha de registro", value: "información", attribute: "registrationDate" },
        { label: "Observaciones", value: "información", attribute: "observations" },
      ],
    ]
  },
  {
    id: 2,
    title: "Contacto",
    active: false,
    rows: [
      [
        { label: "Teléfono", value: "información", attribute: "homePhone" },
        { label: "Dirección", value: "información", attribute: "homeAddress" },
      ],
      [
        { label: "Código postal", value: "información", attribute: "homePostalCode" },
        { label: "Teléfono laboral", value: "información", attribute: "workPhone" },
      ],
      [
        { label: "Lugar de trabajo", value: "información", attribute: "workplace" },
        { label: "Dirección laboral", value: "información", attribute: "workAddress" },
      ],
      [
        { label: "Código postal laboral", value: "información", attribute: "workPostalCode" },
        { label: "Dirección de cobro", value: "información", attribute: "collectionAddress" },
      ],
      [
        { label: "Horario preferido", value: "información", attribute: "preferredTime" },
        { label: "Cobrador asignado", value: "información", attribute: "collector" },
      ]
    ]
  },
  {
    id: 3,
    title: "Estado de la cuenta",
    active: false,
    rows: [
       [ { label: "Estado", value: "información", attribute: "isActive" },
        { label: "Categoría", value: "información", attribute: "idCategory" },
      ],
      [
        { label: "Libros pendientes", value: "información", attribute: "pendingBooks" },
        { label: "Cuotas adeudadas", value: "información", attribute: "unpaidFees" },
      ],

      [ 
        { label: "Motivo de baja", value: "información", attribute: "idReason" },
        { label: "Fecha de baja", value: "información", attribute: "resignationDate" },
      
      ],
      [  
        { label: "Observaciones", value: "información", attribute: "observations" },
      ],
  
    ]
  }
];
