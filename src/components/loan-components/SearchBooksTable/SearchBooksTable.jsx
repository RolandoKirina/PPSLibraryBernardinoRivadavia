import { Table } from '../../table/Table';
import './SearchBooksTable.css';
import ChooseIcon from '../../../assets/img/choose-icon.svg';

export default function SearchBooksTable() {
   const books = [
    { id: 1, book_code: '0000011572', title: '10 cuentistas judios', returned: 'A 58' },
    { id: 2, book_code: '0000073713', title: '10 K la decada robada -SALA-', returned: 'L 3' },
    { id: 3, book_code: '0000054767', title: '10 relatos de amor', returned: 'A 58' },
    { id: 4, book_code: '0000055639', title: '10 Relatos de terror', returned: 'A 58' },
    { id: 5, book_code: '0000051102', title: '10 Relatos fantasticos', returned: 'A 58' },
    ];

    const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Código del libro', accessor: 'book_code' },
    { header: 'Título', accessor: 'title' },
    { header: 'Renovado', accessor: 'returned' },
    {
        header: 'Elegir',
        accessor: 'choose',
        render: (_, row) => (
            <button type='button' className="button-table" onClick={() => console.log('libro elegido')}>
            <img src={ChooseIcon} alt="Eelgir" />
        </button>
        )
    },
    ];


    return (
        <>
            <div className='SearchBooksTable'>
                <Table columns={columns} data={books} />
            </div>
        </>
    )
}