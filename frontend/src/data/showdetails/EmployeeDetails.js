export const employeeDetails = [
  {
    id: 1,
    title: 'Identificación',
    active: false,
    rows: [
      [
        { label: 'ID de empleado', value: 'información', attribute: 'id' },
        { label: 'Código', value: 'información', attribute: 'employeeCode' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Información personal',
    active: false,
    rows: [
      [
        { label: 'Nombre completo', value: 'información', attribute: 'fullname' }
      ],
      [
        { label: 'Email', value: 'información', attribute: 'email' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Credenciales de acceso',
    active: false,
    rows: [
      [
        { label: 'Nombre de usuario', value: 'información', attribute: 'username' },
        { label: 'Contraseña', value: '••••••••', attribute: 'password' }
      ],
      [
        { label: 'Rol', value: 'información', attribute: 'rol' }
      ]
    ]
  }
];
