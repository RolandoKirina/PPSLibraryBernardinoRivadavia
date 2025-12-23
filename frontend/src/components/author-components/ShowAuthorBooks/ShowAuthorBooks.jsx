import "./ShowAuthorBooks.css";
import { useState, useEffect } from 'react';
import { Table } from '../../common/table/Table';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';

export default function ShowAuthorBooks({ authorSelected }) {
  const BASE_URL = "http://localhost:4000/api/v1";
  const [authorBooks, setAuthorBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    bookTitle: '',
    bookCode: '',
    typeName: '', // solo esto, sin materialType
  });



  // Cargar libros del autor seleccionado
  useEffect(() => {
    const fetchAllBooksFromAuthor = async () => {
        console.log(authorSelected);
      const authorSelectedId = authorSelected.id;
      const booksFromAuthor = await getBooks(authorSelectedId);
      console.log(booksFromAuthor);
      setAuthorBooks(booksFromAuthor);
      setFilteredBooks(booksFromAuthor);
    };
    fetchAllBooksFromAuthor();
  }, [authorSelected]);

  // Obtener libros desde el backend
  const getBooks = async (authorSelectedId) => {
    try {
      const url = authorSelectedId
        ? `${BASE_URL}/books/withFields/author/${authorSelectedId}`
        : `${BASE_URL}/books/withFields`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener libros");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Manejar cambios en los filtros
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // 🔎 Filtrar tabla localmente
  useEffect(() => {
    let filtered = authorBooks;

    if (filters.bookTitle.trim()) {
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(filters.bookTitle.toLowerCase())
      );
    }

    if (filters.bookCode.trim()) {
      filtered = filtered.filter(b =>
        b.codeInventory.toLowerCase().includes(filters.bookCode.toLowerCase())
      );
    }

    // si typeName está vacío → mostrar todos
    if (filters.typeName.trim()) {
      filtered = filtered.filter(b =>
        b.typeName === filters.typeName
      );
    }

    setFilteredBooks(filtered);
  }, [filters, authorBooks]);

  const columns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
  ];

  return (
    <div className='loan-books-container'>
      <div className='lend-books-filters'>
        <h3>Filtros de libros</h3>

        <div className='lend-books-filters-inputs'>

          <div className="loan-form-input-group">
            <h4>Libro</h4>
            <div>
              <div>
                <label>Título</label>
                <input
                  name="bookTitle"
                  value={filters.bookTitle}
                  onChange={handleChange}
                  placeholder="Buscar por título..."
                />
              </div>
              <div>
                <label>Código</label>
                <input
                  name="bookCode"
                  value={filters.bookCode}
                  onChange={handleChange}
                  placeholder="Buscar por código..."
                />
              </div>


            </div>
          </div>
        </div>

      </div>

      <div className='lend-books-container'>
        <h2 className='lend-books-title'>Libros a Prestar</h2>
        <Table columns={columns} data={filteredBooks} />
      </div>
    </div>
  );
}
