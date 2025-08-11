export const books = [
  { id: '1', bookCode: 'B1001', bookTitle: 'Ficciones', position: 1, codClass: '51', codLing: 'M 22', codRcdu: '' },
  { id: '2', bookCode: 'B1002', bookTitle: 'El coronel no tiene quien le escriba', position: 2, codClass: '52', codLing: 'M 23', codRcdu: '' },
  { id: '3', bookCode: 'B1003', bookTitle: 'Eva Luna', position: 3, codClass: '53', codLing: 'M 24', codRcdu: '' },
  { id: '4', bookCode: 'B1004', bookTitle: 'Conversación en La Catedral', position: 4, codClass: '54', codLing: 'M 25', codRcdu: '' },
  { id: '5', bookCode: 'B1005', bookTitle: 'Libertad bajo palabra', position: 5, codClass: '55', codLing: 'M 26', codRcdu: '' },
  { id: '6', bookCode: 'B1006', bookTitle: 'El informe de Brodie', position: 6, codClass: '51', codLing: 'M 22', codRcdu: '' },
  { id: '7', bookCode: 'B1007', bookTitle: 'Crónica de una muerte anunciada', position: 7, codClass: '52', codLing: 'M 23', codRcdu: '' },
  { id: '8', bookCode: 'B1008', bookTitle: 'Paula', position: 8, codClass: '53', codLing: 'M 24', codRcdu: '' },
  { id: '9', bookCode: 'B1009', bookTitle: 'Pantaleón y las visitadoras', position: 9, codClass: '54', codLing: 'M 25', codRcdu: '' },
  { id: '10', bookCode: 'B1010', bookTitle: 'El arco y la lira', position: 10, codClass: '55', codLing: 'M 26', codRcdu: '' },
  { id: '11', bookCode: 'B1011', bookTitle: 'El hacedor', position: 11, codClass: '51', codLing: 'M 22', codRcdu: '' },
  { id: '12', bookCode: 'B1012', bookTitle: 'El amor en los tiempos del cólera', position: 12, codClass: '52', codLing: 'M 23', codRcdu: '' },
  { id: '13', bookCode: 'B1013', bookTitle: 'De amor y de sombra', position: 13, codClass: '53', codLing: 'M 24', codRcdu: '' },
  { id: '14', bookCode: 'B1014', bookTitle: 'La tía Julia y el escribidor', position: 14, codClass: '54', codLing: 'M 25', codRcdu: '' },
  { id: '15', bookCode: 'B1015', bookTitle: 'El laberinto de la soledad', position: 15, codClass: '55', codLing: 'M 26', codRcdu: '' },
  { id: '16', bookCode: 'B1016', bookTitle: 'El otro', position: 16, codClass: '51', codLing: 'M 22', codRcdu: '' },
  { id: '17', bookCode: 'B1017', bookTitle: 'Ojos de perro azul', position: 17, codClass: '52', codLing: 'M 23', codRcdu: '' },
  { id: '18', bookCode: 'B1018', bookTitle: 'Retrato en sepia', position: 18, codClass: '53', codLing: 'M 24', codRcdu: '' },
  { id: '19', bookCode: 'B1019', bookTitle: 'Travesuras de la niña mala', position: 19, codClass: '54', codLing: 'M 25', codRcdu: '' },
  { id: '20', bookCode: 'B1020', bookTitle: 'Piedra de sol', position: 20, codClass: '55', codLing: 'M 26', codRcdu: '' }
];



export const mockAuthors = [
  {
    id: '1',
    authorName: 'Jorge Luis Borges',
    nationality: 'Argentina',
    books: [books[0], books[5], books[10], books[15]]
  },
  {
    id: '2',
    authorName: 'Gabriel García Márquez',
    nationality: 'Colombia',
    books: [books[1], books[6], books[11], books[16]]
  },
  {
    id: '3',
    authorName: 'Isabel Allende',
    nationality: 'Chile',
    books: [books[2], books[7], books[12], books[17]]
  },
  {
    id: '4',
    authorName: 'Mario Vargas Llosa',
    nationality: 'Perú',
    books: [books[3], books[8], books[13], books[18]]
  },
  {
    id: '5',
    authorName: 'Octavio Paz',
    nationality: 'México',
    books: [books[4], books[9], books[14], books[19]]
  }
];


export const booksAuthor = [
  {
    id: '1',
    bookCode: 'A1234',
    bookTitle: 'El Aleph',
    position: 1,
    codClass: '51',
    codLing: 'M 22',
    codRcdu: ''
  },
  {
    id: '2',
    bookCode: 'A1235',
    bookTitle: 'Cien años de soledad',
    position: 2,
    codClass: '52',
    codLing: 'M 23',
    codRcdu: ''
  },
  {
    id: '3',
    bookCode: 'A1236',
    bookTitle: 'La casa de los espíritus',
    position: 3,
    codClass: '53',
    codLing: 'M 24',
    codRcdu: ''
  },
  {
    id: '4',
    bookCode: 'A1237',
    bookTitle: 'La ciudad y los perros',
    position: 4,
    codClass: '54',
    codLing: 'M 25',
    codRcdu: ''
  },
  {
    id: '5',
    bookCode: 'A1238',
    bookTitle: 'El laberinto de la soledad',
    position: 5,
    codClass: '55',
    codLing: 'M 26',
    codRcdu: ''
  }
];
