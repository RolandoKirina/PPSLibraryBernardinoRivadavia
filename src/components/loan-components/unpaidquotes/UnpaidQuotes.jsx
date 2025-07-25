import './UnpaidQuotes.css';
import { Table } from '../../table/Table';

export default function UnpaidQuotes() {
    const unpaidQuotes = [
        { id: 1, info: 'Cuota 1 - 02/07/25' },
        { id: 1, info: 'Cuota 1 - 02/07/25' },
        { id: 1, info: 'Cuota 1 - 02/07/25' },
        { id: 1, info: 'Cuota 1 - 02/07/25' },
        { id: 1, info: 'Cuota 1 - 02/07/25' }
    ];

    const columns = [
        { header: 'Cuotas impagas', accessor: 'info' }
    ];

    return (
        <>
            <div className='unpaid-quotes-container'>
                <Table columns={columns} data={unpaidQuotes} />
            </div>
        </>
    )
}