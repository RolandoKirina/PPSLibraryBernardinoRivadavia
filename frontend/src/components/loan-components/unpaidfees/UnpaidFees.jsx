import './UnpaidFees.css';
import { Table } from '../../common/table/Table';
import MoneyIcon from '../../../assets/img/money-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useState } from 'react';
import { useEffect } from 'react';

export default function UnpaidFees({ data, loading }) {
    const { items, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("fees");

    const [filters, setFilters] = useState({});
    
    if (loading) return <p>Cargando cuotas impagas...</p>;


    const formatDate = (value) => {

      if (!value || value === "No pagada" || value === "null" || value === "") {
        return "—";
      }

      const fecha = new Date(`${value}T00:00:00`);

      if (isNaN(fecha)) return "—";

      return fecha.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
    };

    
      const columns = [
        { header: 'Numero de cuota', accessor: 'id' },
        { header: 'Nombre de socio',  accessor: 'name'},
        {header: 'Mes',accessor:"month"},
        {header:'Año',accessor:"year"},
        { header: 'valor', accessor: 'amount' },
        {header: 'Numero de socio', accessor: 'partnerNumber'},
        {header: "Fecha de pago", 
          accessor: 'date_of_paid',   
           render: (value) => formatDate(value)
        }
      ];
    


    return (
        <>
            <div className='unpaid-quotes-container'>
                <h3>Cuotas impagas</h3>
                <Table columns={columns} data={data} />
            </div>
        </>
    )
}