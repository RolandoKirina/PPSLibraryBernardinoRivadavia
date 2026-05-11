import './AuthorSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import { useState, useEffect } from 'react';
import Btn from '../../components/common/btn/Btn';
import PlusIcon from '../../assets/img/plus-icon.svg';
import BookIcon from '../../assets/img/add-book-icon.svg';
import AuthorBooks from '../../components/author-components/AuthorBooks/AuthorBooks';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI';
import ShowAuthorBooks from '../../components/author-components/ShowAuthorBooks/ShowAuthorBooks';
import { useAuth } from '../../auth/AuthContext';
import roles from '../../auth/roles';

export default function AuthorSection() {
    const { auth } = useAuth();
    const BASE_URL = "http://localhost:4000/api/v1";

    // Estado de filtros incluyendo sortBy y direction
    const [filters, setFilters] = useState({
        authorName: "",
        nationality: "",
        sortBy: "name",
        direction: "asc"
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
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

    useEffect(() => {
        setErrorMessage("");

        const delay = setTimeout(() => {
            setOffsetActual(0);
            setResetPageTrigger(prev => prev + 1);

            // Filtramos solo los campos de búsqueda de texto para el objeto activeFilters
            const activeFilters = Object.fromEntries(
                Object.entries(filters).filter(([key, v]) =>
                    v !== "" && v !== null && v !== undefined && key !== 'sortBy' && key !== 'direction'
                )
            );

            getItems({
                ...activeFilters,
                sortBy: filters.sortBy,
                direction: filters.direction,
                limit: chunkSize,
                offset: 0
            });
        }, 300);

        return () => clearTimeout(delay);
    }, [filters]);

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            await getItems({
                ...filters,
                limit: chunkSize,
                offset: newOffset
            }, true);
            setOffsetActual(newOffset);
        }
    }

    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [selected, setSelected] = useState(false);
    const [booksPopup, setBooksPopup] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        // Lógica especial para el selector de orden combinado
        if (name === "sortGroup") {
            const [sortBy, direction] = value.split('-');
            setFilters(prev => ({ ...prev, sortBy, direction }));
            return;
        }

        setFilters(prev => ({ ...prev, [name]: value }));
    };

    async function addNewAuthor(data) {
        try {
            const author = {
                name: data.name,
                nationality: data.nationality,
                books: data.books
            }
            await createItem(author);
            setSuccessMessage("Autor creado exitosamente");
            setTimeout(() => {
                setAddPopup(false);
                setSuccessMessage('');
                setErrorMessage(null);
            }, 3000);
            await getItems({ ...filters, limit: chunkSize, offset: 0 });
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    async function updateExistingAuthor(authorCode, data) {
        try {
            const res = await updateItem(authorCode, {
                name: data.name,
                nationality: data.nationality,
                books: data.books
            });

            if (res) {
                setSuccessMessage("Autor actualizado exitosamente");
                setTimeout(() => {
                    setEditPopup(false);
                    setSuccessMessage('');
                    setErrorMessage(null);
                }, 3000);
            }
            await getItems({ ...filters, limit: chunkSize, offset: 0 });
        } catch (error) {
            setErrorMessage(error.message);
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
                    refresh={() => getItems({ ...filters, limit: chunkSize, offset: 0 })}
                />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar autor',
            className: 'author-books-background',
            content: <AuthorBooks successMessage={successMessage} authorSelected={selected} method={'update'} createAuthorItem={updateExistingAuthor} errorMessage={errorMessage} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar autor',
            className: 'author-books-background',
            content: <AuthorBooks successMessage={successMessage} method={'add'} createAuthorItem={addNewAuthor} errorMessage={errorMessage} />,
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

    let columns = [
        { header: 'Nombre', accessor: 'name' },
        { header: 'Nacionalidad', accessor: 'nationality' },
    ];

    if (auth.role === roles.admin) {
        columns.push(
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
            }
        );
    }

    columns.push({
        header: 'Ver libros',
        accessor: 'books',
        className: "action-buttons",
        render: (_, row) => (
            <button className="button-table" onClick={() => {
                setSelected(row)
                setBooksPopup(true)
            }}>
                <img src={BookIcon} alt="Detalles" />
            </button>
        )
    });

    return (
        <GenericSection
            title={'Listado de autores'}
            columns={columns}
            data={items}
            popups={authorsPopups}
            totalItems={totalItems}
            handleChangePage={handleChangePage}
            loading={loading}
            resetPageTrigger={resetPageTrigger}
            showCount={true}
            actions={
                <div className='author-actions'>
                    {auth.role === roles.admin && (
                        <div className='btn-new'>
                            <Btn text={'Nuevo'} onClick={() => setAddPopup(true)} icon={<img src={PlusIcon} alt='plusIconBtn' />} variant="primary" />
                        </div>
                    )}

                    <div className='author-filter'>
                        <label>Ordenar por: </label>
                        <select
                            name="sortGroup"
                            className="author-sort-select"
                            value={`${filters.sortBy}-${filters.direction}`}
                            onChange={handleFilterChange}
                        >
                            <option value="id-desc">Mas Recientes</option>
                            <option value="name-asc">Nombre (A-Z)</option>
                            <option value="name-desc">Nombre (Z-A)</option>
                            <option value="nationality-asc">Nacionalidad (A-Z)</option>
                            <option value="nationality-desc">Nacionalidad (Z-A)</option>
                        </select>
                    </div>

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

                    <div className='author-filter'>
                        <label>Filtro por Nacionalidad: </label>
                        <input
                            type='text'
                            name='nationality'
                            value={filters.nationality}
                            onChange={handleFilterChange}
                            placeholder='Escribe una nacionalidad...'
                        />
                    </div>
                </div>
            }
        />
    );
}