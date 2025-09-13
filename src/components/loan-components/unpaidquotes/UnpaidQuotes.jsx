import './UnpaidQuotes.css';
import { Table } from '../../common/table/Table';
import MoneyIcon from '../../../assets/img/money-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';

export default function UnpaidQuotes({changeView}) {
    const unpaidQuotes = [
    { id: 1, month: 'Julio', year: '2025', amount: '$1200', paid: 'No', paidDate: '-' },
    { id: 2, month: 'Junio', year: '2025', amount: '$1200', paid: 'No', paidDate: '-' },
    { id: 3, month: 'Mayo', year: '2025', amount: '$1200', paid: 'No', paidDate: '-' },
    { id: 4, month: 'Abril', year: '2025', amount: '$1200', paid: 'No', paidDate: '-' },
    { id: 5, month: 'Marzo', year: '2025', amount: '$1200', paid: 'No', paidDate: '-' }
    ];

    const columns = [
    { header: 'Mes', accessor: 'month' },
    { header: 'Año', accessor: 'year' },
    { header: 'Monto', accessor: 'amount' },
    { header: 'Paga', accessor: 'paid' },
    ];


    return (
        <>
            <div className='unpaid-quotes-container'>
                <h2>Cuotas impagas</h2>
                <Table columns={columns} data={unpaidQuotes} />
            </div>
        </>
    )
}