import './AuthorSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import { useState } from 'react';
import Btn from '../../components/common/btn/Btn';
import PlusIcon from '../../assets/img/plus-icon.svg';
import BookIcon from '../../assets/img/add-book-icon.svg';
import AuthorBooks from '../../components/author-components/AuthorBooks/AuthorBooks';
import { useEntityManager } from '../../hooks/useEntityManager';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI';
import ShowAuthorBooks from '../../components/author-components/ShowAuthorBooks/ShowAuthorBooks';

import { useAuth } from '../../auth/AuthContext';
import roles from '../../auth/roles';

import { useEffect } from 'react';

export default function AuthorSection() {
    const { auth } = useAuth();
    const BASE_URL = "http://localhost:4000/api/v1";
    const [filterName, setFilterName] = useState("");
    const [filterBookTitle, setFilterBookTitle] = useState("");
    const [filterBookCode, setFilterBookCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [filters, setFilters] = useState({
        authorName: "",
    });

    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);


    const {
        items,
        loading,
        totalItems,
        getItems,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("authors");

    const {
        createItem: createBookAuthor
    } = useEntityManagerAPI("book-authors");


    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);
            setResetPageTrigger(prev => prev + 1);

            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
            );

            getItems({ ...activeFilters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 300);
        console.log(totalItems);
        return () => clearTimeout(delay);
    }, [filters]);


    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: newOffset }, true);
            setOffsetActual(newOffset);
        }

    }

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const [booksPopup, setBooksPopup] = useState(false);

    //const { items: authorItems, getItem: getAuthorItem, createItem: createAuthorItem, updateItem: updateAuthorItem, deleteItem: deleteAuthorItem } = useEntityManager(mockAuthors, 'authors');

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };


    function getAllBooksId(books) {
        let booksId = [];

        books.forEach(book => {
            booksId.push(book.BookId);
        });

        return booksId;
    }

    async function addNewAuthor(data) {
        try {
            const author = {
                name: data.name,
                nationality: data.nationality,
                books: data.books
            }

            await createItem(author);

            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });

            setAddPopup(false);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al crear un autor:", error);
        }

    }

    async function updateExistingAuthor(authorCode, data) {
        try {

            await updateItem(authorCode, {
                name: data.name,
                nationality: data.nationality,
                books: data.books
            });

            await getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });

            setEditPopup(false);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al actualizar un autor:", error);
        }

    }

    async function deleteAllAuthorBooks(id) {
        try {
            const response = await fetch(`${BASE_URL}/book-authors/deleteAllOfAuthor/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Error al eliminar los libros del autor');

            const result = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    const authorsPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar autor',
            className: 'delete-size-popup',
            content:
                <PopUpDelete
                    title="Autor"
                    onConfirm={() => deleteItem(selected.id)}
                    closePopup={() => setDeletePopup(false)}
                    refresh={() => getItems()}
                />,

            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar autor',
            className: 'author-books-background',
            content: <AuthorBooks authorSelected={selected} method={'update'} createAuthorItem={updateExistingAuthor} errorMessage={errorMessage} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar autor',
            className: 'author-books-background',
            content: <AuthorBooks method={'add'} createAuthorItem={addNewAuthor} errorMessage={errorMessage} />,
            close: () => setAddPopup(false),
            condition: addPopup
        },
        {
            key: 'booksPopup',
            title: 'Libros del autor',
            className: 'author-books-list-background',
            content: <ShowAuthorBooks authorSelected={selected} />,
            close: () => setBooksPopup(false),
            condition: booksPopup
        },
    ];

    let columns = [];

    if (auth.role === roles.admin) {
        columns = [
            { header: 'Nombre', accessor: 'name' },
            { header: 'Nacionalidad', accessor: 'nationality' },
            {
                header: 'Borrar',
                accessor: 'delete',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setDeletePopup(true)
                        setSelected(row)
                    }}>
                        <img src={DeleteIcon} alt="Borrar" />
                    </button>
                )
            },
            {
                header: 'Editar',
                accessor: 'edit',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setEditPopup(true)
                        setSelected(row);
                    }}>
                        <img src={EditIcon} alt="Editar" />
                    </button>
                )
            },
            {
                header: 'Ver libros',
                accessor: 'books',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setSelected(row)
                        setBooksPopup(true)
                        // getLoanDetails(row)
                    }}>
                        <img src={BookIcon} alt="Detalles" />
                    </button>
                )
            }
        ];
    }
    else if ((auth.role === roles.user || auth.role === roles.reader)) {
        columns = [
            { header: 'Nombre', accessor: 'name' },
            { header: 'Nacionalidad', accessor: 'nationality' },
            {
                header: 'Ver libros',
                accessor: 'edit',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setEditPopup(true)
                        setSelected(row);
                    }}>
                        <img src={BookIcon} alt="Libros" />
                    </button>
                )
            }
        ];
    }

    return (
        <>
            <GenericSection title={'Listado de autores'} columns={columns} data={items} popups={authorsPopups} totalItems={totalItems} handleChangePage={handleChangePage} loading={loading} resetPageTrigger={resetPageTrigger}
                actions={
                    <>
                        <div className='author-actions'>
                            {auth.role === roles.admin && (
                                <div className='btn-new'>
                                    <Btn text={'Nuevo'} onClick={() => setAddPopup(true)} icon={<img src={PlusIcon} alt='plusIconBtn' />} variant="primary" />

                                </div>
                            )}

                            <div className='author-filter'>
                                <label>Filtro por nombre: </label>
                                <input
                                    type='text'
                                    name='authorName'
                                    value={filters.authorName}
                                    onChange={handleFilterChange}
                                    placeholder='Escribe un nombre...'
                                />
                            </div>
                        </div>

                    </>
                }
            />
        </>
    )
}
