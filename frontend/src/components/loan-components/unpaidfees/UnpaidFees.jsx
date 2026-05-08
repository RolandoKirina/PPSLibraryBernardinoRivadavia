import './UnpaidFees.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PopUp from '../../common/popup-table/PopUp.jsx';
import MoneyIcon from '../../../assets/img/money-icon.svg';
import PayPopup from '../../fees-components/paypopup/PayPopup.jsx';

export default function UnpaidFees({ item = {}, section = "" }) {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const { auth } = useAuth();

  // Determinamos el ID del socio dependiendo de si venimos de la sección "Cuotas" o "Socios"
  const effectiveId = section === 'Fee' ? item?.idPartner : item?.id;

  const [unpaidFees, setUnpaidFees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);
  const [popUpPay, setPopUpPay] = useState(false);

  // Lista de meses para el selector
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [filters, setFilters] = useState({
    year: '',
    month: '',
    status: 'unpaid',
    date_of_paid: '' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fetchUnpaidFees = async ({ limit, offset }, currentFilters = filters, append = false) => {
    if (!effectiveId) return;

    setLoading(true);
    setError(null);

    try {
      let url = `http://localhost:4000/api/v1/fees/partners/${effectiveId}/unpaid-fees?limit=${limit}&offset=${offset}`;

      if (currentFilters.year) url += `&year=${currentFilters.year}`;
      if (currentFilters.month) url += `&month=${currentFilters.month}`;
      if (currentFilters.status) url += `&status=${currentFilters.status}`;
      if (currentFilters.date_of_paid) url += `&date_of_paid=${currentFilters.date_of_paid}`; // <-- Enviado al backend

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

    if (effectiveId) {
      const delayDebounceFn = setTimeout(() => {
        fetchUnpaidFees({ limit: chunkSize, offset: 0 }, filters);
      }, 400);
      return () => clearTimeout(delayDebounceFn);
    }
    // Añadida la dependencia de paymentDate
  }, [effectiveId, filters.year, filters.month, filters.status, filters.date_of_paid]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (lastItemIndex > unpaidFees.length && unpaidFees.length < totalItems) {
      const newOffset = unpaidFees.length;
      await fetchUnpaidFees({ limit: chunkSize, offset: newOffset }, filters, true);
    }
  }

  const refreshData = () => {
    setPopUpPay(false);
    fetchUnpaidFees({ limit: chunkSize, offset: 0 }, filters);
    setResetPageTrigger(prev => prev + 1);
  };

  const columns = [
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
      header: 'F. Pago',
      accessor: 'date_of_paid',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-'
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
              setSelectedItem({
                ...row,
                partnerNumber: item?.partnerNumber,
                name: item?.name,
                surname: item?.surname
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
        <h2>
          Socio: {item?.name} {item?.surname} (N° {item?.partnerNumber})
        </h2>

        <div className="unpaid-fees-grid">
          <div className='unpaid-fee-input'>
            <label>Filtrar por Año</label>
            <input
              name="year"
              type='text'
              placeholder="Ej: 2026"
              value={filters.year}
              onChange={handleInputChange}
            />
          </div>

          <div className='unpaid-fee-input'>
            <label>Filtrar por Mes</label>
            <select
              name="month"
              value={filters.month}
              onChange={handleInputChange}
              className="unpaid-fee-select"
            >
              <option value="">Todos los meses</option>
              {meses.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
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

          <div className='unpaid-fee-input'>
            <label>Fecha de pago</label>
            <input
              name="date_of_paid"
              type='date'
              value={filters.date_of_paid}
              onChange={handleInputChange}
            />
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
            onSuccess={refreshData}
          />
        </PopUp>
      )}
    </div>
  );
}