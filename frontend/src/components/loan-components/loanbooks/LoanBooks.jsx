import './LoanBooks.css';
import { useState, useEffect } from 'react';
import { Table } from '../../common/table/Table';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';

export default function LoanBooks({ loanSelected }) {
  const BASE_URL = "http://localhost:4000/api/v1";
  const [loanBooks, setLoanBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    bookTitle: '',
    bookCode: '',
    typeName: '', // solo esto, sin materialType
  });

  // Hook para obtener tipos de material
  const { items: bookTypes, getItems: getBookTypes } = useEntityManagerAPI("book-types");

  useEffect(() => {
    getBookTypes();
    console.log(loanSelected.books);
  }, []);

  // Cargar libros del préstamo seleccionado
  useEffect(() => {
    const fetchAllBooksFromLoan = async () => {
      const loanSelectedId = loanSelected.loanId;
      const booksFromLoan = await getBooks(loanSelectedId);
      console.log(booksFromLoan);
      setLoanBooks(booksFromLoan);
      setFilteredBooks(booksFromLoan);
    };
    fetchAllBooksFromLoan();
  }, [loanSelected]);

  // Obtener libros desde el backend
  const getBooks = async (loanSelectedId) => {
    try {
      const url = loanSelectedId
        ? `${BASE_URL}/books/withFields/loan/${loanSelectedId}`
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
    let filtered = loanBooks;

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
  }, [filters, loanBooks]);

  const columns = [
    { header: 'Código del libro', accessor: 'codeInventory' },
    { header: 'Título', accessor: 'title' },
    { header: 'Tipo', accessor: 'typeName' },
  ];

  return (
    <div className='loan-books-container'>
      <div className='lend-books-filters'>
        <h3>Filtros de libros</h3>

        <div className='lend-books-filters-inputs'>
          <div className="loan-form-checkbox-group">
            <h4>Tipo de material retirado</h4>
            <select
              name="typeName"
              value={filters.typeName}
              onChange={handleChange}
              className="loan-filter-select"
            >
              <option value="">Todos</option>
              {bookTypes && bookTypes.length > 0 ? (
                bookTypes.map((type) => (
                  <option key={type.bookTypeId} value={type.typeName}>
                    {type.typeName}
                  </option>
                ))
              ) : (
                <option disabled>Cargando tipos...</option>
              )}
            </select>
          </div>

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
