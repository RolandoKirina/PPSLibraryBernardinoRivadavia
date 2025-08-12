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
import { booksAuthor } from '../../../data/mocks/authors';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { books } from '../../../data/mocks/authors';

export default function AuthorBooks({authorSelected, deleteAuthorSelected, updateAuthorSelectedBooks, menu, method, createAuthorItem, updateAuthorItem}) {
    const [seeAllButton, setSeeAllButton] = useState('Prestados');
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [selected, setSelected] = useState(null);
    const [popupView, setPopupView] = useState('default');
    const [authorData, setAuthorData] = useState({
        authorName: '',
        nationality: '',
        books: []
    });

    const {
    items: authorBooksItems,
    getItem: getAuthorBooksItem,
    createItem: createAuthorBooksItem,
    updateItem: updateAuthorBooksItem,
    deleteItem
    } = useEntityManager(booksAuthor, 'authorBooks');


    function redirect(action){
         switch(action){
            case 'edit':{
                window.open(`${window.location.origin}/books/editbook`, '_blank','editbook');
            }
         }
    }

    function handleAuthorChange(e) {
        const { name, value } = e.target;

        setAuthorData(prev => ({
            ...prev,
            [name]: value
        }))

        console.log("Datos del autor:", { ...authorData, [name]: value });
    }

    function handleAddAuthorBook(book) {
        if(method === 'add') {
            setAuthorData(prev => {
            const alreadyExists = prev.books.some(b => b.id === book.id);

            if(alreadyExists) {
                return prev;
            }

            return {
                ...prev,
                books: [...prev.books, book]
            };
            });
        }
        else {
            console.log("updateed add");
            updateAuthorSelectedBooks(book);
        }
       
    }

    function handleDeleteAuthorBook(id) {
        if(method === 'add') {
            setAuthorData(prev => {
            const alreadyExists = prev.books.some(b => b.id === id);

            if(!alreadyExists) {
                return prev;
            }

            let updatedBooks = prev.books.filter((book) => book.id !== id);

            return {
                ...prev,
                books: updatedBooks
            };
        });
        }
        else {
            console.log("update");
            deleteAuthorSelected(id);
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

    
    const mainAuthorBooksColumns = [
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codClass' },
            { header: 'Codrcdu', accessor: 'codRcdu' },
            { header: 'CodLing', accessor: 'codLing' },
            {
                header: 'Editar',
                accessor: 'edit',
                render: (_, row) => (
                 <button type='button' className="button-table" onClick={() => setPopupView('editBookForm')}>
                    <img src={EditIcon} alt="Editar" />
                </button>
                )
            },
            {
                header: 'Borrar',
                accessor: 'delete',
                render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => {
                setDeletePopup(true)
                setSelected(row)
                console.log(row)  
                }}>
                    <img src={DeleteIcon} alt="Borrar" />
                </button>
                )
            },
    ];

    const authorBooksColumns = [ //igual que mainAuthorBooksColumns pero solo se muestran 3 columnas
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Posición', accessor: 'position' },
            {
                header: 'Borrar',
                accessor: 'delete',
                render: (_, row) => (
                 <button type='button' className="button-table" onClick={() => {
                    handleDeleteAuthorBook(row.id);
                }}>
                    <img src={DeleteIcon} alt="Borrar" />
                </button>
                )
            }
    ];

    const bookshelfBooksColumns = [
            { header: 'Codigo', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            {
                header: 'Agregar',
                accessor: 'add',
                render: (_, row) => (
                <button type='button' className="button-table" onClick={() => handleAddAuthorBook(row)}>
                    <img src={AddBookIcon} alt="Agregar" />
                </button>
                )
            }
    ]

    let authorBooksPopups = [
        {
            key: 'confirmPopup',
            title: 'Confirmar cambios',
            className: '',
            content: <ConfirmMessage text={"¿Está seguro de confirmar los cambios?"} closePopup={() => setConfirmPopup(false)} onConfirm={() => {
                setConfirmPopup(false);
                if(method === 'add') {
                    let newAuthor = { 
                        authorName: authorData.authorName,
                        nationality: authorData.nationality,
                        books: authorData.books
                    }
                    createAuthorItem(newAuthor);

                    console.log(newAuthor);
                }
                else if(method === 'update') {
                    let updateAuthor = { 
                        authorName: authorData.authorName,
                        nationality: authorData.nationality,
                        books: authorSelected.books
                    }
                    
                    updateAuthorItem(authorSelected.id, updateAuthor);
                }
            }}/>,
            close: () => setConfirmPopup(false),
            condition: confirmPopup,
        },
        {
            key: 'deletePopup',
            title: 'Borrar libro de autor',
            className: 'delete-size-popup',
            content: <PopUpDelete  title={"Libro"} closePopup={() => setDeletePopup(false)} onConfirm={
            () => {
                handleDeleteAuthorBook(selected.id);
                setDeletePopup(false)
            }
        } />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
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
                                <input type='text' name='authorName' value={authorData.authorName} onChange={handleAuthorChange}/>
                            </div>
                            <div className='add-loan-retire-date'>
                                <label>Nacionalidad</label>
                                <input type='text' name='nationality' value={authorData.nationality} onChange={handleAuthorChange}/>
                            </div>
                        </div>
                        <div className='author-books-title'>
                            <h3>Libros de este autor</h3>
                        </div>
                        <Table columns={mainAuthorBooksColumns} data={method==='update' ? authorSelected.books : authorData.books}>
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
                        <Table columns={bookshelfBooksColumns} data={books}/>
                        </div>
                    <div className='author-books'>
                        <div className='author-books-title'>
                            <h3>Libros de este autor</h3>
                        </div>
                        {method === 'update' ? (
                            <Table columns={authorBooksColumns} data={authorSelected.books}/>
                        ): (
                            <Table columns={authorBooksColumns} data={authorData.books}/>
                        )}
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