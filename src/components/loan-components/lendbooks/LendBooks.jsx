import './LendBooks.css';
import { Table } from '../../table/Table';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import SaveIcon from '../../../assets/img/save-icon.svg';
import PopUp from '../../popup-table/PopUp2';
import PopUpDelete from '../../deletebtnComponent/PopUpDelete';
import { useState } from 'react';
import Btn from '../../btn/Btn';
import ConfirmMessage from '../../confirmMessage/ConfirmMessage';

export default function LendBooks({method}) {
        const [deletePopup, setDeletePopup] = useState(false);
        const [confirmReturnPopup, setConfirmReturnPopup] = useState(false);
        const [confirmRenewePopup, setConfirmRenewePopup] = useState(false);
        const [confirmReturnAllPopup, setConfirmReturnAllPopup] = useState(false);
        const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);

        const lendBooksPopups = [
            {
                key: 'deletePopup',
                title: 'Borrar prestamo',
                className: 'delete-size-popup',
                content: <PopUpDelete  title={"Libro"} closePopup={() => setDeletePopup(false)} />,
                close: () => setDeletePopup(false),
                condition: deletePopup,
                variant: 'delete'
            },
            {
                key: 'confirmReturnPopup',
                title: 'Confirmar devolucion',
                className: '',
                content: <ConfirmMessage text={'¿Esta seguro de realizar la devolución?'} closePopup={() => setConfirmReturnPopup(false)}/>,
                close: () => setConfirmReturnPopup(false),
                condition: confirmReturnPopup
            },
            {
                key: 'confirmRenewePopup',
                title: 'Confirmar Renovación',
                className: '',
                content: <ConfirmMessage text={'¿Esta seguro de realizar la renovación?'} closePopup={() => setConfirmRenewePopup(false)}/>,
                close: () => setConfirmRenewePopup(false),
                condition: confirmRenewePopup
            },
            {
                key: 'confirmReturnAllPopup',
                title: 'Confirmar Devolución de todos los libros',
                className: '',
                content: <ConfirmMessage text={'¿Esta seguro de devolver todos los libros?'} closePopup={() => setConfirmReturnAllPopup(false)}/>,
                close: () => setConfirmReturnAllPopup(false),
                condition: confirmReturnAllPopup
            },
            {
                key: 'confirmSaveChangesPopup',
                title: 'Confirmar Cambios',
                className: '',
                content: <ConfirmMessage text={'¿Esta seguro de confirmar los cambios?'} closePopup={() => setConfirmSaveChangesPopup(false)}/>,
                close: () => setConfirmSaveChangesPopup(false),
                condition: confirmSaveChangesPopup
            }
    ];

        function redirect(routeName) {
            window.open(`${window.location.origin}/${routeName}`, '_blank');
        }

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
             <button type='button' className="button-table" onClick={() => setDeletePopup(true)}>
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
            <button type='button' className="button-table" onClick={() => setConfirmReturnPopup(true)}>
                <img src={ReturnIcon} alt="Devolver" />
            </button>
            )
        },
        {
            header: 'Renovar',
            accessor: 'renewe',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => setConfirmRenewePopup(true)}>
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
            <button type='button' className="button-table" onClick={() => setConfirmReturnPopup(true)}>
                <img src={ReturnIcon} alt="Devolver" />
            </button>
            )
        },
        {
            header: 'Renovar',
            accessor: 'renewe',
            render: (_, row) => (
            <button type='button' className="button-table" onClick={() => setConfirmRenewePopup(true)}>
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

                    {method === 'add' && (
                        <Btn text={'Agregar Libro'} onClick={() => redirect('loans/add-book-lend')} icon={<img src={AddBookIcon} alt='addBookIconButton'/> }/>
                    )}

                    {method === 'return' && ( 
                        <Btn text={'Devolver todos'} onClick={() => setConfirmReturnAllPopup(true)} /> 
                    )}

                </div>
                <div className='save-changes-lend-books'>
                    <Btn text={'Guardar'} onClick={() => setConfirmSaveChangesPopup(true)} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
                </div>

                {lendBooksPopups.map(({ condition, title, className, content, close, variant }, idx) => (
                                        condition && (
                                            <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                                            {content}
                                            </PopUp>
                                        )
                ))}
                


                
            </div>  
        </>
    )
}