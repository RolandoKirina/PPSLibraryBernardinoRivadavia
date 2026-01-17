import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';

export default function PendingBooks({ partnerNumber }) {
  const chunkSize = 100;
  const rowsPerPage = 5;

  const [pendingBooks, setPendingBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const fetchPendingBooks = async ({ limit, offset }, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/books/pendingBooks/${partnerNumber}?limit=${limit}&offset=${offset}`
      );

      if (!res.ok) {
        throw new Error('Error al obtener libros pendientes');
      }

      const { rows, count } = await res.json();

      setTotalItems(count);
      setPendingBooks(prev => (append ? [...prev, ...rows] : rows));

    } catch (err) {
      setError(err.message);
      setPendingBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!partnerNumber) return;

    setPendingBooks([]);
    setTotalItems(0);
    setResetPageTrigger(prev => prev + 1);

    fetchPendingBooks({ limit: chunkSize, offset: 0 });
  }, [partnerNumber]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (lastItemIndex > pendingBooks.length) {
      const newOffset = pendingBooks.length;

      await fetchPendingBooks(
        { limit: chunkSize, offset: newOffset },
        true
      );
    }
  }

  const columns = [
    { header: 'Título', accessor: 'title' },
    { header: 'Código de inventario', accessor: 'codeInventory' },
    { header: 'Código CDU', accessor: 'codeCDU' }
  ];

  return (
    <div className="unpaid-quotes-container">
      <h3>Libros pendientes</h3>

      {loading && pendingBooks.length === 0 ? (
        <p>Cargando libros...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : pendingBooks.length > 0 ? (
        <Table
          columns={columns}
          data={pendingBooks}
          totalItems={totalItems}
          handleChangePage={handleChangePage}
          loading={loading}
          resetPageTrigger={resetPageTrigger}
        />
      ) : (
        <div className="msg-unpaidfees">
          <p>No hay libros pendientes</p>
        </div>
      )}
    </div>
  );
}
