
import { Table } from '../../common/table/Table';
import MoneyIcon from '../../../assets/img/money-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI';
import { useState } from 'react';
import { useEffect } from 'react';

export default function PendingBooks({ changeView, partnerNumber }) {
    const { items, getItems, getItem, createItem, updateItem, deleteItem } = useEntityManagerAPI("books/pendingBooks/" + partnerNumber);

    const [filters, setFilters] = useState({});

    useEffect(() => {
        const delay = setTimeout(() => {
            getItems();
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    const columns = [
        { header: 'Título', accessor: 'title' },
        { header: 'Código de inventario', accessor: 'codeInventory' },
        { header: 'Codigo de CDU', accessor: 'codeCDU' }
    ];

    return (
        <>
            <div className='unpaid-quotes-container'>
                <h3>Libros pendientes</h3>
                <Table columns={columns} data={items} />
            </div>
        </>
    )
}