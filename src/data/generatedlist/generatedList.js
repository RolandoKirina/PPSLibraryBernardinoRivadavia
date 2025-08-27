 export const dataTypeOne = [
    {
        memberCodeSurname: '1297 VILLAGRESE',
        firstName: 'Alicia',
        address: 'Venezuela 44',
        phone: '2995526739',
        fees: 5,
        pendingBooks: 0,
        registrationDate: '10/03/2016'
    },
    {
        memberCodeSurname: '1302 PÉREZ',
        firstName: 'Carlos',
        address: 'San Martín 102',
        phone: '2994432187',
        fees: 2,
        pendingBooks: 1,
        registrationDate: '22/07/2018'
    },
    {
        memberCodeSurname: '1310 GÓMEZ',
        firstName: 'Laura',
        address: 'Belgrano 55',
        phone: '2995012345',
        fees: 0,
        pendingBooks: 3,
        registrationDate: '05/11/2019'
    },
    {
        memberCodeSurname: '1325 RODRÍGUEZ',
        firstName: 'Martín',
        address: 'Av. Roca 88',
        phone: '2994789654',
        fees: 4,
        pendingBooks: 0,
        registrationDate: '14/02/2020'
    },
    {
        memberCodeSurname: '1333 FERNÁNDEZ',
        firstName: 'Sofía',
        address: 'Mitre 120',
        phone: '2994123456',
        fees: 1,
        pendingBooks: 2,
        registrationDate: '30/09/2021'
    }
    ];


export const columnsByType = {
  TypeOne: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Cuotas', accessor: 'fees' },
    { header: 'Libros Pendientes', accessor: 'pendingBooks' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ],
  TypeTwo: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Estado', accessor: 'status' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ],
  TypeThree: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Fecha de Baja', accessor: 'deactivationDate' },
    { header: 'Motivo', accessor: 'reason' }
  ],
  TypeFour: [
    { header: 'Número - Apellido', accessor: 'memberCodeSurname' },
    { header: 'Nombre', accessor: 'firstName' },
    { header: 'Dirección', accessor: 'address' },
    { header: 'Teléfono', accessor: 'phone' },
    { header: 'Presentado por', accessor: 'presentedBy' },
    { header: 'Fecha de Inscripción', accessor: 'registrationDate' }
  ]
};