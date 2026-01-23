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
import { useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles.js';
import { useEntityManagerAPI } from '../../../hooks/useEntityManagerAPI.js';
import { addBookPositionFields } from '../../../data/forms/AuthorForms.js';
import GenericForm from '../../generic/GenericForm/GenericForm.jsx';

export default function AuthorBooks({ authorSelected, method, createAuthorItem, errorMessage }) {
    const { auth } = useAuth();
    const [seeAllButton, setSeeAllButton] = useState('Todos');
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [positionPopup, setPositionPopup] = useState(false);
    const [selected, setSelected] = useState(null);
    const BASE_URL = "http://localhost:4000/api/v1";
    const [popupView, setPopupView] = useState('default');

    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);

    const [authorData, setAuthorData] = useState({
        name: '',
        nationality: '',
        books: []
    });
    const [books, setBooks] = useState([]);

    const [libraryBooks, setLibraryBooks] = useState([]);
    const [authorBooksFetched, setAuthorBooksFetched] = useState([]);
    const [totalLibraryBooks, setTotalLibraryBooks] = useState(0);

    const [loadingBooks, setLoadingBooks] = useState(false);


    const [book, setBook] = useState({});
    const [allAuthorBooks, setAllAuthorBooks] = useState([]);

    //const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {
    //     getBooks();

    //     if (method === 'update' && authorSelected?.id) {
    //         const fetchAllBooksFromAuthor = async () => {

    //             const authorSelectedId = authorSelected.id;

    //             const booksFromAuthor = await getBooks(authorSelectedId);

    //             setAuthorData({
    //                 name: authorSelected.name,
    //                 nationality: authorSelected.nationality,
    //                 books: booksFromAuthor
    //             });


    //         }

    //         fetchAllBooksFromAuthor();

    //     }

    // }, []);

    useEffect(() => {
        getLibraryBooks({ limit: chunkSize, offset: 0 });

        if (method === 'update' && authorSelected?.id) {
            getAuthorBooks(authorSelected.id, { limit: chunkSize, offset: 0 })
                .then(rows => {
                    setAuthorData({
                        name: authorSelected.name,
                        nationality: authorSelected.nationality,
                        books: rows
                    });

                    console.log(rows);
                    setAllAuthorBooks(rows);
                });
        }
    }, []);

    const getLibraryBooks = async (filters = {}, append = false) => {
        setLoadingBooks(true);

        const queryParams = new URLSearchParams(filters).toString();

        const res = await fetch(`${BASE_URL}/books/withFields?${queryParams}`);
        const { rows, total } = await res.json();

        setTotalLibraryBooks(total);
        setLibraryBooks(prev => append ? [...prev, ...rows] : rows);

        setLoadingBooks(false);
        return rows;
    };

    const getAuthorBooks = async (authorId, filters = {}) => {
        setLoadingBooks(true);

        const queryParams = new URLSearchParams(filters).toString();

        const res = await fetch(`${BASE_URL}/books/withFields/author/${authorId}?${queryParams}`);
        const { rows } = await res.json();

        setAuthorBooksFetched(rows);

        setLoadingBooks(false);
        return rows;
    };

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (books.length < totalLibraryBooks && lastItemIndex > books.length) {
            const newOffset = books.length;

            await getLibraryBooks(
                {
                    limit: chunkSize,
                    offset: newOffset
                },
                true
            );
        }
    }


    function handleAuthorChange(e) {
        const { name, value } = e.target;

        setAuthorData(prev => ({
            ...prev,
            [name]: value
        }))

        //console.log("Datos del autor:", { ...authorData, [name]: value });
    }

    function handleAddAuthorBook(positionData) {
        // Validar que se ingresó algo
        if (!positionData.position) return;

        const position = parseInt(positionData.position, 10);

        // Validar que sea un número válido
        if (isNaN(position) || position < 1) {
            alert('La posición debe ser un número válido mayor a 0');
            return;
        }

        setPositionPopup(false);

        setAuthorData(prev => {
            const exists = prev.books.some(b => b.BookId === book.BookId);
            if (exists) return prev;

            const bookWithPosition = { ...book, position };

            const newBooks = [...prev.books, bookWithPosition];

            setAllAuthorBooks(newBooks);

            return {
                ...prev,
                books: newBooks
            };
        });
    }



    function handleDeleteAuthorBook(id) {
        setAuthorData(prev => {
            const filtered = prev.books.filter(b => b.BookId !== id);

            setAllAuthorBooks(filtered);

            return {
                ...prev,
                books: filtered
            };
        });
    }


    function handleSetAllbutton() {
        const nextValue = seeAllButton === 'Prestados' ? 'Todos' : 'Prestados';
        setSeeAllButton(nextValue);

        if (nextValue === 'Prestados') {
            const filtered = allAuthorBooks.filter(b => b.isBorrowed === true);

            setAuthorData(prev => ({
                ...prev,
                books: filtered
            }));
        } else {
            setAuthorData(prev => ({
                ...prev,
                books: allAuthorBooks
            }));
        }
    }


    let mainAuthorBooksColumns = [];

    if (auth.role === roles.admin) {
        mainAuthorBooksColumns = [
            { header: 'Título', accessor: 'title' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codeClasification' },
            { header: 'Codrcdu', accessor: 'codeCDU' },
            { header: 'CodLing', accessor: 'codeLing' }
        ];
    }
    else if ((auth.role === roles.user) || (auth.role === roles.reader)) {
        mainAuthorBooksColumns = [
            { header: 'Código del libro', accessor: 'codeInventory' },
            { header: 'Título', accessor: 'title' },
            { header: 'Posición', accessor: 'position' },
            { header: 'Codclass', accessor: 'codeClasification' },
            { header: 'Codrcdu', accessor: 'codeCDU' },
            { header: 'CodLing', accessor: 'codeLing' }
        ];
    }

    const authorBooksColumns = [ //igual que mainAuthorBooksColumns pero solo se muestran 3 columnas
        { header: 'Código del libro', accessor: 'codeInventory' },
        { header: 'Título', accessor: 'title' },
        { header: 'Posición', accessor: 'position' },
        {
            header: 'Borrar',
            accessor: 'delete',
            render: (_, row) => (
                <button type='button' className="button-table" onClick={() => {
                    handleDeleteAuthorBook(row.BookId);
                }}>
                    <img src={DeleteIcon} alt="Borrar" />
                </button>
            )
        }
    ];

    const bookshelfBooksColumns = [
        { header: 'Codigo', accessor: 'codeInventory' },
        { header: 'Título', accessor: 'title' },
        {
            header: 'Agregar',
            accessor: 'add',
            render: (_, row) => (
                <button type='button' className="button-table" onClick={
                    () => {
                        setPositionPopup(true);
                        setBook(row);
                    }}>
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
                if (method === 'add') {
                    let newAuthor = {
                        name: authorData.name,
                        nationality: authorData.nationality,
                        books: authorData.books
                    }
                    createAuthorItem(newAuthor);
                }
                else if (method === 'update') {
                    let updatedAuthor = {
                        name: authorData.name,
                        nationality: authorData.nationality,
                        books: authorData.books
                    };

                    createAuthorItem(authorSelected.id, updatedAuthor);
                }

            }} />,
            close: () => setConfirmPopup(false),
            condition: confirmPopup,
        },
        {
            key: 'deletePopup',
            title: 'Borrar libro de autor',
            className: 'delete-size-popup',
            content: <PopUpDelete title={"Libro"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    handleDeleteAuthorBook(selected.id);
                    setDeletePopup(false)
                }
            } />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'positionPopup',
            title: 'Elegir posición del libro',
            className: '',
            content: <GenericForm fields={addBookPositionFields} onSubmit={(positionData) => handleAddAuthorBook(positionData)} title={'Añadir posición de libro'} />,
            close: () => setPositionPopup(false),
            condition: positionPopup
        }
    ]

    return (
        <>
            <div className='author-books-container'>

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

                {popupView === 'default' && (
                    <>
                        <div className='main-author-books'>
                            <div className='author-books-title'>
                                <h3>Datos del autor</h3>
                            </div>
                            <div className='add-loan-form-inputs'>
                                <div className='add-loan-retire-date input'>
                                    <label>Nombre <span className='required'>*</span></label>
                                    {auth.role === roles.admin ? (
                                        <input type='text' name='name' value={authorData.name} onChange={handleAuthorChange} />
                                    ) : (
                                        <p className='readonly-field'>{authorSelected.name}</p>
                                    )}

                                </div>
                                <div className='add-loan-retire-date input'>
                                    <label>Nacionalidad <span className='required'>*</span></label>
                                    {auth.role === roles.admin ? (
                                        <input type='text' name='nationality' value={authorData.nationality} onChange={handleAuthorChange} />
                                    ) : (
                                        <p className='readonly-field'>{authorSelected.nationality}</p>
                                    )}
                                </div>

                            </div>

                            {errorMessage && (
                                <p className="error-message">{errorMessage}</p>
                            )}
                            <div className='author-books-title'>
                                <h3>Libros de este autor</h3>
                            </div>
                            <Table columns={mainAuthorBooksColumns} data={authorData.books} totalItems={authorData.books.length}>
                                <div className='main-author-btns'>
                                    {auth.role === roles.admin && (
                                        <>
                                            <Btn variant={'primary'} onClick={() => setPopupView('addBook')} text={'Administrar libros'} />

                                            <Btn variant={'primary'} text={seeAllButton} onClick={() => handleSetAllbutton()} />
                                        </>

                                    )}


                                </div>
                            </Table>

                            <div className='save-changes-lend-books'>
                                {auth.role === roles.admin && (
                                    <Btn text={'Guardar'} onClick={() => setConfirmPopup(true)} icon={<img src={SaveIcon} alt='saveIconButton' />} />
                                )}
                            </div>


                        </div>
                    </>
                )}
                {popupView === 'addBook' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <div className='library-books'>
                            <div className='author-books-title'>
                                <h3>Libros cargados en la biblioteca</h3>
                            </div>
                            <Table columns={bookshelfBooksColumns} data={libraryBooks} totalItems={totalLibraryBooks} handleChangePage={handleChangePage} loading={loadingBooks} resetPageTrigger={resetPageTrigger} />
                        </div>
                        <div className='author-books'>
                            <div className='author-books-title'>
                                <h3>Libros de este autor</h3>
                            </div>
                            <Table columns={authorBooksColumns} data={authorData.books} totalItems={authorData.books.length} />
                        </div>

                    </>
                )}

            </div>
        </>
    )
}