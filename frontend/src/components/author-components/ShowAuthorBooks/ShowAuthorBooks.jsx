import "./ShowAuthorBooks.css";
import { useState, useEffect } from 'react';
import { Table } from '../../common/table/Table';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import roles from "../../../auth/roles";
import { useAuth } from "../../../auth/AuthContext";

export default function ShowAuthorBooks({ authorSelected }) {
  const BASE_URL = "http://localhost:4000/api/v1";
  const [authorBooks, setAuthorBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    bookTitle: '',
    bookCode: '',
    typeName: '', // solo esto, sin materialType
  });

  const { auth } = useAuth();

  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  // Cargar libros del autor seleccionado
  useEffect(() => {
    const fetchAllBooksFromAuthor = async () => {
      const authorSelectedId = authorSelected.id;
      const booksFromAuthor = await getBooks(authorSelectedId);
      setAuthorBooks(booksFromAuthor.rows);
      setFilteredBooks(booksFromAuthor.rows);
    };
    fetchAllBooksFromAuthor();
  }, [authorSelected]);

  // Obtener libros desde el backend
  const getBooks = async (authorSelectedId) => {
    try {
      const url = authorSelectedId
        ? `${BASE_URL}/books/withFields/author/${authorSelectedId}`
        : `${BASE_URL}/books/withFields`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });
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

    setResetPageTrigger(prev => prev + 1);
  }, [filters, authorBooks]);

  let columns = [];

  if (auth.role === roles.admin) {
    columns = [
      { header: 'Código del libro', accessor: 'codeInventory' },
      { header: 'Título', accessor: 'title' },
    ];
  }
  else {
    columns = [
      { header: 'Código del libro', accessor: 'codeInventory' },
    ]
  }

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
              {auth.role === roles.admin && (
                <div>
                  <label>Código</label>
                  <input
                    name="bookCode"
                    value={filters.bookCode}
                    onChange={handleChange}
                    placeholder="Buscar por código..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <div className='lend-books-container show-book-authors-list-size'>
        <h2 className='lend-books-title'>Libros</h2>
        <Table columns={columns} data={filteredBooks} totalItems={filteredBooks.length} resetPageTrigger={resetPageTrigger} />
      </div>
    </div>
  );
}
