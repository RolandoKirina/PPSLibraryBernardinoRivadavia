import './LendBooks.css';
import { Table } from '../table/Table';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import AddBookIcon from '../../assets/img/add-book-icon.svg';
import SaveIcon from '../../assets/img/save-icon.svg';

export default function LendBooks() {
        // const loans = [
        // { id: 1, book_code: 'BK-202', title: 'Orgullo y prejuicio', return: 'si' },
        // { id: 2, book_code: 'BK-203', title: 'Don Quijote de la Mancha', return: 'no' },
        // { id: 3, book_code: 'BK-204', title: 'La tregua', return: 'si' },
        // { id: 4, book_code: 'BK-205', title: 'Sobre héroes y tumbas', return: 'si' },
        // { id: 5, book_code: 'BK-206', title: 'Pedro Páramo', return: 'no' }
        // ];

         const loans = [
        { id: 1, book_code: '', title: '', return: '' },
        ];


    
       const columns = [
        { header: 'Código del libro', accessor: 'book_code' },
        { header: 'Título', accessor: 'title' },
        { header: 'Renovado', accessor: 'return' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
            <button className="button-table" onClick={() => console.log('Eliminar', row)}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
            render: (_, row) => (
            <button className="button-table" onClick={() => console.log('Editar', row)}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => console.log('Ver detalle', row)}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        }
        ];



    return (
        <>
            <div className='lend-books-container'>
                <h2>Libros a Prestar</h2>
                <Table columns={columns} data={loans} popupLength='popup-length'/>
                <div className='add-book-to-lend'>
                    <button><img src={AddBookIcon}/><a href='/add-book-lend' target='_blank'>Agregar Libro</a></button>
                </div>
                <div className='save-changes-lend-books'>
                    <button><img src={SaveIcon}/><a href='/save' target='_blank'>Guardar</a></button>
                </div>
            </div>  
        </>
    )
}