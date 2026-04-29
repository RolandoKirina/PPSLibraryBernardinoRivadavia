import './UnpaidFees.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import MoneyIcon from '../../../assets/img/money-icon.svg';

export default function UnpaidFees({ item = {}, section = "" }) {
  const chunkSize = 100;
  const rowsPerPage = 5;
  const { auth } = useAuth();

  /**
   * Lógica de ID según sección:
   * - Si viene de 'Fee', buscamos 'idPartner' (la FK en la tabla de cuotas).
   * - Si viene de 'Partner' (o cualquier otra), buscamos 'id' (la PK de la tabla socios).
   */
  const effectiveId = section === 'Fee' ? item?.idPartner : item?.id;

  const [unpaidFees, setUnpaidFees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);
  const [popUpPay, setPopUpPay] = useState(false);

  const [filters, setFilters] = useState({
    year: '',
    paymentDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const fetchUnpaidFees = async ({ limit, offset }, append = false) => {
    // Si no hay ID efectivo, no ejecutamos la consulta
    if (!effectiveId) return;

    setLoading(true);
    setError(null);

    try {
      /**
       * Agregamos explícitamente searchType=id para que el backend 
       * no intente buscar por partnerNumber.
       */
      let url = `http://localhost:4000/api/v1/fees/partners/${effectiveId}/unpaid-fees?limit=${limit}&offset=${offset}&searchType=id`;
      
      if (filters.year) url += `&year=${filters.year}`;

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

  // Re-ejecutar cuando cambie el ID o el filtro de año
  useEffect(() => {
    setUnpaidFees([]);
    setTotalItems(0);
    setResetPageTrigger(prev => prev + 1);

    if (effectiveId) {
      const delayDebounceFn = setTimeout(() => {
        fetchUnpaidFees({ limit: chunkSize, offset: 0 });
      }, 400);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [effectiveId, filters.year]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;
    if (lastItemIndex > unpaidFees.length) {
      const newOffset = unpaidFees.length;
      await fetchUnpaidFees({ limit: chunkSize, offset: newOffset }, true);
    }
  }

  const columns = [
    { header: 'N° Cuota', accessor: 'feeNumber' },
    { header: 'Importe', accessor: 'amount', render: (v) => `$${v}` },
    { header: 'Mes', accessor: 'month' },
    { header: 'Año', accessor: 'year' },
    {
      header: 'Pagar',
      accessor: 'payment',
      className: "action-buttons",
      render: (_, row) => (
        <button 
          className="button-table" 
          onClick={(e) => {
            e.stopPropagation();
            setSelectedItem(row);
            setPopUpPay(true);
          }}
        >
          <img src={MoneyIcon} alt="Pagar" />
        </button>
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
            <label>Fecha de pago (Información)</label>
            <input 
              name="paymentDate" 
              type='date' 
              value={filters.paymentDate} 
              onChange={handleInputChange} 
            />
          </div>
        </div>
      </div>

      <hr />

      {error && <div className="error-msg">{error}</div>}

      {unpaidFees.length > 0 ? (
        <Table 
          columns={columns} 
          data={unpaidFees} 
          totalItems={totalItems} 
          handleChangePage={handleChangePage} 
          loading={loading} 
          resetPageTrigger={resetPageTrigger} 
          showCount={true} 
          rowsPerPage={12}
        />
      ) : (
        !loading && effectiveId && (
          <div className="msg-unpaidfees">
            <p>No hay cuotas impagas registradas para este socio.</p>
          </div>
        )
      )}
    </div>
  );
}