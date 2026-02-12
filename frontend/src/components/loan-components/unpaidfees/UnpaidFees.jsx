import './UnpaidFees.css';
import { Table } from '../../common/table/Table';
import { useState, useEffect } from 'react';

export default function UnpaidFees({ unpaidFees }) {

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
    { header: 'Número de socio', accessor: 'partnerNumber' },
    { header: 'Nombre de socio', accessor: 'name' },
    { header: 'Mes', accessor: 'month' },
    { header: 'Año', accessor: 'year' },
    { header: 'Valor', accessor: 'amount' },
    {
      header: 'Fecha de pago',
      accessor: 'date_of_paid',
      render: (value) => formatDate(value)
    }
  ];

  return (
    <div className="unpaid-quotes-container">
      <h3>Cuotas impagas</h3>

      {unpaidFees?.length > 0 ? (
        <Table columns={columns} data={unpaidFees} />
      ) : (
        <div className="msg-unpaidfees">
          <p>No hay cuotas impagas</p>
        </div>
      )}
    </div>
  );
}
