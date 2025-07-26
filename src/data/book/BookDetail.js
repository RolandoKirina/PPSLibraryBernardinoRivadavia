export const BookDetail = [
  {
    id: 1,
    title: 'Datos generales',
    active: false,
    rows: [
      [
        { label: 'Código', value: 'información' },
        { label: 'Título', value: 'información' },
         { label: 'Año de edicion', value: 'información' }
      ],
    ]
  },
  {
    id: 2,
    title: 'Autores y publicación',
    active: false,
    rows: [
      [
        { label: 'Autores', value: 'información' },
        { label: 'Editorial', value: 'información' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Clasificación bibliográfica',
    active: false,
    rows: [
        [
            { label: 'Tipo', value: 'información' },
             { label: 'CDU', value: 'información' },
            { label: 'COD_RCDU', value: 'información' }
        ]
    ]
  }
];

export default BookDetail;