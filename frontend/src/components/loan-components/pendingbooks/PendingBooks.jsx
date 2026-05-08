import './PendingBooks.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PopUp from '../../common/popup-table/PopUp.jsx';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import RenewIcon from '../../../assets/img/renewe-icon.svg';
import Btn from '../../../components/common/btn/Btn.jsx';

export default function PendingBooks({ item = {} }) {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const { auth } = useAuth();
  const partnerNumber = item?.partnerNumber;

  const [pendingBooks, setPendingBooks] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);
  const [popUpReturn, setPopUpReturn] = useState(false);
  const [popUpRenew, setPopUpRenew] = useState(false);

  const [filters, setFilters] = useState({
    title: '',
    code: '',
    status: 'pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fetchPendingBooks = async ({ limit, offset }, currentFilters = filters, append = false) => {
    if (!partnerNumber) return;
    setLoading(true);
    try {
      let url = `http://localhost:4000/api/v1/books/pendingBooks/${partnerNumber}?limit=${limit}&offset=${offset}`;
      if (currentFilters.title) url += `&title=${encodeURIComponent(currentFilters.title)}`;
      if (currentFilters.code) url += `&code=${encodeURIComponent(currentFilters.code)}`;
      if (currentFilters.status) url += `&status=${currentFilters.status}`;

      const res = await fetch(url, {
        headers: { "Authorization": `Bearer ${auth.token}` }
      });
      if (!res.ok) throw new Error('Error al obtener libros');
      const { rows, count } = await res.json();
      setTotalItems(count);
      setPendingBooks(prev => (append ? [...prev, ...rows] : rows));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleReturn = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(`http://localhost:4000/api/v1/loan-books/${selectedItem.loanBookId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          returnedDate: new Date().toISOString(),
          returned: true
        })
      });

      if (!res.ok) throw new Error('Error al procesar la devolución');

      setPopUpReturn(false);

      fetchPendingBooks({ limit: chunkSize, offset: 0 }, filters);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRenew = async () => {
    if (!selectedItem) return;
    try {
      const res = await fetch(`http://localhost:4000/api/v1/loan-books/${selectedItem.loanBookId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          // Incrementamos el valor actual en 1
          reneweAmount: (selectedItem.renewalCount || 0) + 1
        })
      });

      if (!res.ok) throw new Error('Error al procesar la renovación');

      setPopUpRenew(false);
      // Refrescar datos
      fetchPendingBooks({ limit: chunkSize, offset: 0 }, filters);
    } catch (err) {
      alert(err.message);
    }
  };

  // ----------------------------------

  useEffect(() => {
    setPendingBooks([]);
    setResetPageTrigger(prev => prev + 1);
    const delayDebounceFn = setTimeout(() => {
      fetchPendingBooks({ limit: chunkSize, offset: 0 }, filters);
    }, 400);
    return () => clearTimeout(delayDebounceFn);
  }, [partnerNumber, filters.title, filters.code, filters.status]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;
    if (lastItemIndex > pendingBooks.length && pendingBooks.length < totalItems) {
      const newOffset = pendingBooks.length;
      await fetchPendingBooks({ limit: chunkSize, offset: newOffset }, filters, true);
    }
  }

  const columns = [
    { header: 'Cód. Libro', accessor: 'bookCode' },
    { header: 'Título', accessor: 'title' },
    { header: 'F. Retiro', accessor: 'retiredDate' },
    { header: 'F. Prevista', accessor: 'dueDate' },
    { header: 'F. Devolución', accessor: 'returnedDate', render: (v) => v || '-' },
    { header: 'Renovación', accessor: 'renewalCount', render: (v) => `Cant: ${v || 0}` },
    {
      header: 'Devuelto',
      accessor: 'isReturned',
      render: (returned) => returned
        ? <span className="status-paid">Sí</span>
        : <span className="status-unpaid">No</span>
    },
    {
      header: 'Devolver',
      accessor: 'returnAction',
      className: "action-buttons",
      render: (_, row) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!row.isReturned && (
            <button
              className="button-table return-btn"
              title="Devolver Libro"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(row);
                setPopUpReturn(true);
              }}
            >
              <img src={ReturnIcon} alt="Devolver" />
            </button>
          )}
        </div>
      )
    },
    {
      header: 'Renovar',
      accessor: 'renewAction',
      className: "action-buttons",
      render: (_, row) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {!row.isReturned && (
            <button
              className="button-table renew-btn"
              title="Renovar Préstamo"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(row);
                setPopUpRenew(true);
              }}
            >
              <img src={RenewIcon} alt="Renovar" />
            </button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="unpaid-quotes-container">
      <div className='unpaid-fees-info-inputs'>
        <h2>Libros de: {item?.name} {item?.surname} (Socio N° {partnerNumber})</h2>
        <div className="unpaid-fees-grid">
          <div className='unpaid-fee-input'>
            <label>Buscar por Título</label>
            <input name="title" type='text' value={filters.title} onChange={handleInputChange} />
          </div>
          <div className='unpaid-fee-input'>
            <label>Buscar por Código</label>
            <input name="code" type='text' value={filters.code} onChange={handleInputChange} />
          </div>
          <div className='unpaid-fee-input'>
            <label>Estado de Préstamo</label>
            <select name="status" value={filters.status} onChange={handleInputChange} className="unpaid-fee-select">
              <option value="all">Todos</option>
              <option value="pending">Pendientes</option>
              <option value="returned">Devueltos</option>
            </select>
          </div>
        </div>
      </div>

      <Table columns={columns} data={pendingBooks} totalItems={totalItems}
        handleChangePage={handleChangePage} loading={loading}
        resetPageTrigger={resetPageTrigger} showCount={true} rowsPerPage={rowsPerPage} />

      {/* PopUp para Devolución */}
      {popUpReturn && (
        <PopUp title={'Confirmar Devolución'} onClick={() => setPopUpReturn(false)}>
          <div className="p-4 popup-action-content">
            <p>¿Confirma la devolución del libro: <strong>{selectedItem?.title}</strong>?</p>
            <div className="buttons-actions">
              <Btn variant={'primary'} onClick={handleReturn} text={'Confirmar Devolución'} />
              <Btn variant={'primary'} onClick={() => setPopUpReturn(false)} text={'Cancelar'} />
            </div>
          </div>
        </PopUp>
      )}

      {/* PopUp para Renovación */}
      {popUpRenew && (
        <PopUp title={'Renovar Préstamo'} onClick={() => setPopUpRenew(false)}>
          <div className="p-4 popup-action-content">
            <p>¿Desea renovar el préstamo de: <strong>{selectedItem?.title}</strong>?</p>
            <p>La cantidad de renovaciones actual es: {selectedItem?.renewalCount || 0}</p>
            <div className="buttons-actions">
              <Btn variant={'primary'} onClick={handleRenew} text={'Confirmar Renovación'} />
              <Btn variant={'primary'} onClick={() => setPopUpRenew(false)} text={'Cancelar'} />
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
}