import './GlobalUnpaidFees.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PopUp from '../../common/popup-table/PopUp.jsx';
import MoneyIcon from '../../../assets/img/money-icon.svg';
import PayPopup from '../../fees-components/paypopup/PayPopup.jsx';

export default function GlobalUnpaidFees() {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const { auth } = useAuth();

  const [unpaidFees, setUnpaidFees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);
  const [popUpPay, setPopUpPay] = useState(false);

  // Filtros extendidos
  const [filters, setFilters] = useState({
    partnerNumber: '',
    name: '',
    surname: '',
    year: '',
    status: 'unpaid'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fetchUnpaidFees = async ({ limit, offset }, currentFilters = filters, append = false) => {
    setLoading(true);
    setError(null);

    try {
      // Endpoint global de cuotas (ajustar si tu API tiene una ruta distinta para búsqueda global)
      let url = `http://localhost:4000/api/v1/fees/search?limit=${limit}&offset=${offset}`;

      if (currentFilters.partnerNumber) url += `&partnerNumber=${currentFilters.partnerNumber}`;
      if (currentFilters.name) url += `&name=${currentFilters.name}`;
      if (currentFilters.surname) url += `&surname=${currentFilters.surname}`;
      if (currentFilters.year) url += `&year=${currentFilters.year}`;
      if (currentFilters.status) url += `&status=${currentFilters.status}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });

      if (!res.ok) throw new Error('Error al obtener cuotas');

      const { rows, count } = await res.json();

      setTotalItems(count);
      setUnpaidFees(prev => (append ? [...prev, ...rows] : rows));
    } catch (err) {
      setError(err.message);
      setUnpaidFees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUnpaidFees([]);
    setTotalItems(0);
    setResetPageTrigger(prev => prev + 1);

    const delayDebounceFn = setTimeout(() => {
      fetchUnpaidFees({ limit: chunkSize, offset: 0 }, filters);
    }, 500); // Un poco más de delay por ser búsqueda global
    
    return () => clearTimeout(delayDebounceFn);
  }, [filters.partnerNumber, filters.name, filters.surname, filters.year, filters.status]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (lastItemIndex > unpaidFees.length && unpaidFees.length < totalItems) {
      const newOffset = unpaidFees.length;
      await fetchUnpaidFees({ limit: chunkSize, offset: newOffset }, filters, true);
    }
  }

  // Función para refrescar después del pago exitoso
  const handleRefresh = () => {
    setPopUpPay(false);
    setUnpaidFees([]);
    setResetPageTrigger(prev => prev + 1);
    fetchUnpaidFees({ limit: chunkSize, offset: 0 }, filters);
  };

  const columns = [
    { header: 'Socio', accessor: 'partnerNumber', render: (_, row) => `${row.Partner?.name} ${row.Partner?.surname} (${row.Partner?.partnerNumber})` },
    { header: 'N° Cuota', accessor: 'feeNumber' },
    { header: 'Importe', accessor: 'amount', render: (v) => `$${v}` },
    { header: 'Mes', accessor: 'month' },
    { header: 'Año', accessor: 'year' },
    {
      header: 'Estado',
      accessor: 'paid',
      render: (paid) => paid ? <span className="status-paid">Paga</span> : <span className="status-unpaid">Impaga</span>
    },
    {
      header: 'Pagar',
      accessor: 'payment',
      className: "action-buttons",
      render: (_, row) => (
        !row.paid && (
          <button
            className="button-table"
            onClick={(e) => {
              e.stopPropagation();
              // Mapeamos los datos necesarios para el PayPopup
              console.log(row);

              setSelectedItem({
                ...row,
                partnerNumber: row.Partner?.partnerNumber,
                name: row.Partner?.name,
                surname: row.Partner?.surname
              });
              setPopUpPay(true);
            }}
          >
            <img src={MoneyIcon} alt="Pagar" />
          </button>
        )
      )
    },
  ];

  return (
    <div className="unpaid-quotes-container">
      <div className='unpaid-fees-info-inputs'>
        <h2>Gestión Global de Cuotas</h2>

        <div className="unpaid-fees-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          <div className='unpaid-fee-input'>
            <label>N° Socio</label>
            <input
              name="partnerNumber"
              type='text'
              placeholder="Buscar por N°..."
              value={filters.partnerNumber}
              onChange={handleInputChange}
            />
          </div>

          <div className='unpaid-fee-input'>
            <label>Nombre</label>
            <input
              name="name"
              type='text'
              placeholder="Nombre..."
              value={filters.name}
              onChange={handleInputChange}
            />
          </div>

          <div className='unpaid-fee-input'>
            <label>Apellido</label>
            <input
              name="surname"
              type='text'
              placeholder="Apellido..."
              value={filters.surname}
              onChange={handleInputChange}
            />
          </div>

          <div className='unpaid-fee-input'>
            <label>Año</label>
            <input
              name="year"
              type='text'
              placeholder="Ej: 2026"
              value={filters.year}
              onChange={handleInputChange}
            />
          </div>

          <div className='unpaid-fee-input'>
            <label>Estado</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleInputChange}
              className="unpaid-fee-select"
            >
              <option value="all">Todas</option>
              <option value="paid">Pagas</option>
              <option value="unpaid">Impagas</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <Table
        columns={columns}
        data={unpaidFees}
        totalItems={totalItems}
        handleChangePage={handleChangePage}
        loading={loading}
        resetPageTrigger={resetPageTrigger}
        showCount={true}
        rowsPerPage={rowsPerPage}
      />

      {popUpPay && (
        <PopUp title={'Pagar Cuota'} className={'pay-popup'} onClick={() => setPopUpPay(false)}>
          <PayPopup 
            item={selectedItem} 
            onSuccess={handleRefresh}
          />
        </PopUp>
      )}
    </div>
  );
}