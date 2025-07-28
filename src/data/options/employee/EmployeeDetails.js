export const employeeDetails = [
  {
    id: 1,
    title: 'Identificación',
    active: false,
    rows: [
      [
        { label: 'ID de empleado', value: 'información' },
        { label: 'Código', value: 'información' }
      ]
    ]
  },
  {
    id: 2,
    title: 'Información personal',
    active: false,
    rows: [
      [
        { label: 'Nombre completo', value: 'información' }
      ],
      [
        { label: 'Email', value: 'información' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Credenciales de acceso',
    active: false,
    rows: [
      [
        { label: 'Nombre de usuario', value: 'información' },
        { label: 'Contraseña', value: '••••••••' } // opcional: mostrar oculto
      ],
      [
        { label: 'Rol', value: 'información' }
      ]
    ]
  }
];
