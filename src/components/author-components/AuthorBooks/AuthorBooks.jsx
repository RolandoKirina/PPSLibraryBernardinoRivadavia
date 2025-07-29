import { Table } from '../../table/Table';
import './AuthorBooks.css';
import { useState } from 'react';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import Btn from '../../btn/Btn';
import PopUpDelete from '../../deletebtnComponent/PopUpDelete';
import PopUp from '../../popup-table/PopUp2';
import ConfirmMessage from '../../../components/confirmMessage/ConfirmMessage';

export default function AuthorBooks() {
    const [seeAllButton, setSeeAllButton] = useState('Ver todos');
    const [deletePopup, setDeletePopup] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);

    function handleSetAllbutton() {
        let seeAllValue = 'Ver todos';
        if(seeAllButton === seeAllValue) {
            setSeeAllButton('Todos');
        }
        else {
            setSeeAllButton(seeAllValue);
        }

        //segun el valor, actualizar tabla con filtro

    }

    const authorBooks = [
        { id: 1, book_code: '23123', title: 'SADASDSADSADSADsdasdsadsadsadsadasddsadsad' },
    ];

    const columns = [
            { header: 'Código del libro', accessor: 'book_code' },
            { header: 'Título', accessor: 'title' },
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
                <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/authors/author-books-edit`, '_blank')}>
                    <img src={EditIcon} alt="Editar" />
                </button>
                )
            },
            {
                header: 'Ver detalle',
                accessor: 'details',
                render: (_, row) => (
                <button type='button' className="button-table" onClick={() => window.open(`${window.location.origin}/authors/author-books-details`, '_blank')}>
                    <img src={DetailsIcon} alt="Detalles" />
                </button>
                )
            }
    ];

    let authorBooksPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar autor',
            className: 'delete-size-popup',
            content: <PopUpDelete  title={"Autor"} closePopup={() => setDeletePopup(false)} />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'confirmPopup',
            title: 'Confirmar cambios',
            className: '',
            content: <ConfirmMessage text={"¿Está seguro de confirmar los cambios?"} closePopup={() => setConfirmPopup(false)} />,
            close: () => setConfirmPopup(false),
            condition: confirmPopup,
        }
    ]

    return (
        <>
            <div className='author-books-container'>
                <h2 className='author-books-title'>Libros de este Autor</h2>

                <Table columns={columns} data={authorBooks}>
                    <div className='author-books-add-btn'>
                        <Btn onClick={() => window.open(`${window.location.origin}/books/add-book`, '_blank')} text={'Agregar libro'} icon={<img src={AddBookIcon} alt='addBookIcon'/>} />
                        <Btn className='seeAllBtn' onClick={() => handleSetAllbutton()} text={seeAllButton} />
                    </div>
                    <div className='author-books-save-btn'>
                        <Btn text={'Guardar'} onClick={() => setConfirmPopup(true)} icon={<img src={AddBookIcon} alt='addBookIcon'/>} />
                    </div>
                </Table>

                {authorBooksPopups.map(({ condition, title, className, content, close, variant }, idx) => (
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