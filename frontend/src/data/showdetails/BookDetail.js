


export const BookDetail = [
  {
    id: 1,
    title: 'Datos generales',
    active: false,
    rows: [
      [
        { label: 'Título', value: 'información', attribute: 'title' },
        { label: 'Código', value: 'información', attribute: 'codeInventory' },
        { label: 'Año de edicion', value: 'información', attribute: 'numberEdition' }
      ],
    ]
  },
  {
    id: 2,
    title: 'Autores y publicación',
    active: false,
    rows: [
      [
        {
          label: 'Autores',
          value: 'información',
          attribute: 'authors',
          subfields: [
            { key: 'authorName', label: 'Nombre' },
            { key: 'nationality', label: 'Nacionalidad' }
          ]
        },
        { label: 'Editorial', value: 'información', attribute: 'editorial' }
      ]
    ]
  },
  {
    id: 3,
    title: 'Clasificación bibliográfica',
    active: false,
    rows: [
      [
        { label: 'Tipo', value: 'información', attribute: 'type' },
        { label: 'CDU', value: 'información', attribute: 'codeCDU' },
        { label: 'COD_RCDU', value: 'información', attribute: 'codCDU' }
      ]
    ]
  }
];

export default BookDetail;
