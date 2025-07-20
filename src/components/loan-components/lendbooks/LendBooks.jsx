import './LendBooks.css';
import { Table } from '../../table/Table';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import SaveIcon from '../../../assets/img/save-icon.svg';

export default function LendBooks({method}) {

        // const loans = [
        // { id: 1, book_code: 'BK-202', title: 'Orgullo y prejuicio', return: 'si' },
        // { id: 2, book_code: 'BK-203', title: 'Don Quijote de la Mancha', return: 'no' },
        // { id: 3, book_code: 'BK-204', title: 'La tregua', return: 'si' },
        // { id: 4, book_code: 'BK-205', title: 'Sobre héroes y tumbas', return: 'si' },
        // { id: 5, book_code: 'BK-206', title: 'Pedro Páramo', return: 'no' }
        // ];

       const loans = [
        { id: 1, book_code: '23123', title: 'SADASDSADSADSADsdasdsadsadsadsadasddsadsad', returned: 'si' },
        ];

       const columns = [
        { header: 'Código del libro', accessor: 'book_code' },
        { header: 'Título', accessor: 'title' },
        { header: 'Renovado', accessor: 'returned' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
             <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/loans/book-on-loan-delete`, '_blank')}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/loans/book-on-loan-edit`, '_blank')}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/loans/book-on-loan-details`, '_blank')}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        },
        {
            header: 'Devolver',
            accessor: 'return',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/---`, '_blank')}>
                <img src={ReturnIcon} alt="Devolver" />
            </button>
            )
        },
        {
            header: 'Renovar',
            accessor: 'renewe',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/---`, '_blank')}>
                <img src={ReneweIcon} alt="Renovar" />
            </button>
            )
        }
        ];

        const columnsReturnForm = [
        { header: 'Código del libro', accessor: 'book_code' },
        { header: 'Título', accessor: 'title' },
        { header: 'Renovado', accessor: 'returned' },
        {
            header: 'Detalles',
            accessor: 'details',
            render: (_, row) => (
             <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/loans/book-on-loan-returns-details`, '_blank')}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        },
        {
            header: 'Devolver',
            accessor: 'return',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/---`, '_blank')}>
                <img src={ReturnIcon} alt="Devolver" />
            </button>
            )
        },
        {
            header: 'Renovar',
            accessor: 'renewe',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/---`, '_blank')}>
                <img src={ReneweIcon} alt="Renovar" />
            </button>
            )
        }
        ];



    return (
        <>
            <div className='lend-books-container'>
                <h2>Libros a Prestar</h2>
                
                {method==='add' && <Table columns={columns} data={loans} popupLength='popup-length'/>}
                {method==='return' && <Table columns={columnsReturnForm} data={loans} popupLength='popup-length'/>}

                <div className='add-book-to-lend'>
                    {method==='add' && <button type='button'><img src={AddBookIcon}/><a href='/loans/add-book-lend' target='_blank'>Agregar libro</a></button>}
                    {method==='return' && <button type='button'><a href='#' target='_blank'>Devolver todos</a></button>}
                </div>
                <div className='save-changes-lend-books'>
                    <button><img src={SaveIcon}/><a href='/save' target='_blank'>Guardar</a></button>
                </div>
            </div>  
        </>
    )
}