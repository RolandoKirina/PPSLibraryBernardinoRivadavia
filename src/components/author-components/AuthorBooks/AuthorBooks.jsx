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
import PlusIcon from '../../../assets/img/plus-icon.svg';
 import BackviewBtn from '../../backviewbtn/BackviewBtn';
import FormEditBook from '../../formeditbook/FormEditBook';
import SaveIcon from '../../../assets/img/save-icon.svg';

export default function AuthorBooks({menu}) {
    const [seeAllButton, setSeeAllButton] = useState('Prestados');
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [popupView, setPopupView] = useState('default');

    function redirect(action){
         switch(action){
            case 'edit':{
                window.open(`${window.location.origin}/books/editbook`, '_blank','editbook');
            }
         }
    }

    function handleSetAllbutton() {
        let seeAllValue = 'Prestados';
        if(seeAllButton === seeAllValue) {
            setSeeAllButton('Todos');
        }
        else {
            setSeeAllButton(seeAllValue);
        }

        //segun el valor, actualizar tabla con filtro

    }

    const mainAuthorBooks = [
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil', position: 1, codclass: '51', codrcdu: '', codling: 'M 22' },
    ];

    const authorBooks = [
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil', position: 1 },
    ];
    
    const mainAuthorBooksColumns = [
            { header: 'Código del libro', accessor: 'book_code' },
            { header: 'Título', accessor: 'title' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codclass' },
            { header: 'Codrcdu', accessor: 'codrcdu' },
            { header: 'CodLing', accessor: 'codling' },
            {
                header: 'Editar',
                accessor: 'edit',
                render: (_, row) => (
                 <button type='button' className="button-table" onClick={() => setPopupView('editBookForm')}>
                    <img src={EditIcon} alt="Editar" />
                </button>
                )
            }
    ];

    const bookshelfBooks = [
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil'},
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil'},
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil'},
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil'},
        { id: 1, book_code: '000320023', title: '100 Años del eco tandil'},
    ];

    const authorBooksColumns = [
            { header: 'Código del libro', accessor: 'book_code' },
            { header: 'Título', accessor: 'title' },
            { header: 'Posición', accessor: 'position' },
            {
                header: 'Borrar',
                accessor: 'delete',
                render: (_, row) => (
                 <button type='button' className="button-table" onClick={() => setDeletePopup(true)}>
                    <img src={DeleteIcon} alt="Borrar" />
                </button>
                )
            }
    ];

    const bookshelfBooksColumns = [
            { header: 'Codigo', accessor: 'book_code' },
            { header: 'Título', accessor: 'title' },
            {
                header: 'Agregar',
                accessor: 'edit',
                render: (_, row) => (
                <button type='button' className="button-table" onClick={() => menu('editForm')}>
                    <img src={AddBookIcon} alt="Editar" />
                </button>
                )
            }
    ]

    let authorBooksPopups = [
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
                 {popupView === 'default' && (
                    <>
                    <div className='main-author-books'>
                        <div className='author-books-title'>
                            <h3>Datos del autor</h3>
                        </div>
                        <div className='add-loan-form-inputs'>
                            <div className='add-loan-retire-date'>
                                <label>Nombre</label>
                                <input type='text'/>
                            </div>
                            <div className='add-loan-retire-date'>
                                <label>Nacionalidad</label>
                                <input type='text'/>
                            </div>
                        </div>
                        <div className='author-books-title'>
                            <h3>Libros de este autor</h3>
                        </div>
                        <Table columns={mainAuthorBooksColumns} data={mainAuthorBooks}>
                            <div className='main-author-btns'>
                                <Btn className="primary-btn" onClick={() => setPopupView('addBook')} text={'Administrar libros'}/>
                                <Btn className="primary-btn" text={seeAllButton} onClick={() => handleSetAllbutton()}/>
                            </div>
                        </Table>
                        <div className='save-changes-lend-books'>
                         <Btn text={'Guardar'} onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
                        </div>
                    {authorBooksPopups.map(({ condition, title, className, content, close, variant }, idx) => (
                                        condition && (
                                            <PopUp
                                            key={idx}
                                            title={title}
                                            className={className || ''}
                                            onClick={close}
                                            {...(variant === 'delete' && { variant: 'delete' })}
                                            >
                                            {content}
                                            </PopUp>
                                        )
                         ))}
                    </div>
                    </>
                )}
                {popupView === 'addBook' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView}/>
                    <div className='library-books'>
                        <div className='author-books-title'>
                            <h3>Libros cargados en la biblioteca</h3>
                        </div>
                        <Table columns={bookshelfBooksColumns} data={bookshelfBooks}/>
                        </div>
                    <div className='author-books'>
                        <div className='author-books-title'>
                            <h3>Libros de este autor</h3>
                        </div>
                        <Table columns={authorBooksColumns} data={authorBooks}/>
                    </div>
                    </>
                )}
                {popupView === 'editBookForm' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView}/>
                    <div>
                        <div className='editBookAuthor'>
                        <h2>Editar libro</h2>
                        </div>
                        <FormEditBook />
                    </div>
                    </>
                )}



            </div>
        </>
    )
}