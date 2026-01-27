import './UnpaidFees.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';

export default function UnpaidFees({ partnerNumber }) {
  const chunkSize = 100;
  const rowsPerPage = 5;

  const [unpaidFees, setUnpaidFees] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const fetchUnpaidFees = async ({ limit, offset }, append = false) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/fees/partners/${partnerNumber}/unpaid-fees?limit=${limit}&offset=${offset}`
      );

      if (!res.ok) {
        throw new Error('Error al obtener cuotas impagas');
      }

      const { rows, total } = await res.json();

      setTotalItems(total);
      setUnpaidFees(prev => (append ? [...prev, ...rows] : rows));
    } catch (err) {
      setError(err.message);
      setUnpaidFees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!partnerNumber) return;

    setUnpaidFees([]);
    setTotalItems(0);
    setResetPageTrigger(prev => prev + 1);

    fetchUnpaidFees({ limit: chunkSize, offset: 0 });
  }, [partnerNumber]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (lastItemIndex > unpaidFees.length) {
      const newOffset = unpaidFees.length;

      await fetchUnpaidFees(
        { limit: chunkSize, offset: newOffset },
        true
      );
    }
  }

  const formatDate = (value) => {
    if (!value || value === 'null' || value === '') return '—';

    const fecha = new Date(`${value}T00:00:00`);
    if (isNaN(fecha)) return '—';

    return fecha.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const columns = [
    { header: 'Número de cuota', accessor: 'id' },
    { header: 'Nombre de socio', accessor: 'name' },
    { header: 'Mes', accessor: 'month' },
    { header: 'Año', accessor: 'year' },
    { header: 'Valor', accessor: 'amount' },
    { header: 'Número de socio', accessor: 'partnerNumber' },
    {
      header: 'Fecha de pago',
      accessor: 'date_of_paid',
      render: (value) => formatDate(value)
    }
  ];

  return (
    <div className="unpaid-quotes-container">
      <h3>Cuotas impagas</h3>

      {loading && unpaidFees.length === 0 ? (
        <p>Cargando cuotas...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : unpaidFees.length > 0 ? (
        <Table
          columns={columns}
          data={unpaidFees}
          totalItems={totalItems}
          handleChangePage={handleChangePage}
          loading={loading}
          resetPageTrigger={resetPageTrigger}
        />
      ) : (
        <div className="msg-unpaidfees">
          <p>No hay cuotas impagas</p>
        </div>
      )}
    </div>
  );
}
