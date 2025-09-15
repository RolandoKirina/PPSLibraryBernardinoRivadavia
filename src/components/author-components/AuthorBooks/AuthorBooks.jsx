import { Table } from '../../common/table/Table';
import './AuthorBooks.css';
import { useState } from 'react';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import AddBookIcon from '../../../assets/img/add-book-icon.svg';
import Btn from '../../common/btn/Btn';
import PopUpDelete from '../../common/deletebtnComponent/PopUpDelete';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../../components/common/confirmMessage/ConfirmMessage';
 import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import { books } from '../../../data/mocks/authors';
import { useEffect } from 'react';
import { authMock } from '../../../data/mocks/authMock';

export default function AuthorBooks({authorSelected, deleteAuthorSelected, updateAuthorSelectedBooks, method, createAuthorItem, updateAuthorItem}) {
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
    
    useEffect(() => {
        if (method === 'update' && authorSelected) {
            setAuthorData({
            authorName: authorSelected.authorName,
            nationality: authorSelected.nationality,
            books: [...authorSelected.books]
            });
        }
    }, [method, authorSelected]);

    function handleAuthorChange(e) {
        const { name, value } = e.target;

        setAuthorData(prev => ({
            ...prev,
            [name]: value
        }))

        console.log("Datos del autor:", { ...authorData, [name]: value });
    }

    function handleAddAuthorBook(book) {
        setAuthorData(prev => {
            const alreadyExists = prev.books.some(b => b.id === book.id);
            if (alreadyExists) return prev;
            return {
            ...prev,
            books: [...prev.books, book]
            };
        });
    }

    function handleDeleteAuthorBook(id) {
        setAuthorData(prev => ({
            ...prev,
            books: prev.books.filter(b => b.id !== id)
        }));
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

    let mainAuthorBooksColumns = [];

    if(authMock.role === 'admin') {
    mainAuthorBooksColumns = [
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codClass' },
            { header: 'Codrcdu', accessor: 'codRcdu' },
            { header: 'CodLing', accessor: 'codLing' }
    ];
    }
    else if(authMock.role === 'reader') {
     mainAuthorBooksColumns = [
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codClass' },
            { header: 'Codrcdu', accessor: 'codRcdu' },
            { header: 'CodLing', accessor: 'codLing' }
    ];       
    }


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
                }
                else if (method === 'update') {
                let updatedAuthor = { 
                    authorName: authorData.authorName,
                    nationality: authorData.nationality,
                    books: authorData.books
                };
                updateAuthorItem(authorSelected.id, updatedAuthor);
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
                            <div className='add-loan-retire-date input'>
                                <label>Nombre <span className='required'>*</span></label>
                                {authMock.role === 'admin' ? (
                                <input type='text' name='authorName' value={authorData.authorName} onChange={handleAuthorChange}/>
                                ): (
                                <p className='readonly-field'>{authorSelected.authorName}</p>
                                )}

                            </div>
                            <div className='add-loan-retire-date input'>
                                <label>Nacionalidad <span className='required'>*</span></label>
                                {authMock.role === 'admin' ? (
                                <input type='text' name='nationality' value={authorData.nationality} onChange={handleAuthorChange}/>
                                ): (
                                <p className='readonly-field'>{authorSelected.nationality}</p>
                                )}
                            </div>
                        </div>
                        <div className='author-books-title'>
                            <h3>Libros de este autor</h3>
                        </div>
                        <Table columns={mainAuthorBooksColumns} data={authorData.books}>
                            <div className='main-author-btns'>
                                {authMock.role === 'admin' && (
                                <Btn variant={'primary'} onClick={() => setPopupView('addBook')} text={'Administrar libros'}/>
                                )}

                                <Btn variant={'primary'} text={seeAllButton} onClick={() => handleSetAllbutton()}/>
                            </div>
                        </Table>

                        <div className='save-changes-lend-books'>
                            {authMock.role == 'admin' && (
                                <Btn text={'Guardar'} onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt='saveIconButton'/> }/>
                            )}
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
                            <Table columns={authorBooksColumns} data={authorData.books}/>
                        ): (
                            <Table columns={authorBooksColumns} data={authorData.books}/>
                        )}
                    </div>
                    </>
                )}

            </div>
        </>
    )
}