import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import { useState, useEffect } from 'react';
import BookFilter from '../../components/filter/bookfilter/BookFilter.jsx';
import './BookSection.css';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete.jsx';
import FormAddBook from '../../components/book-components/FormAddBook/FormAddBook.jsx';
import { duplicateBook } from '../../data/forms/BookForms.js';
import GenericForm from '../../components/generic/GenericForm/GenericForm.jsx';
import { BookDetail } from '../../data/showdetails/BookDetail.js';
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails.jsx';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI.js';
import Btn from '../../components/common/btn/Btn.jsx';
import PlusIcon from '../../assets/img/plus-icon.svg';
import BookIcon from '../../assets/img/book-icon.svg';
import LostBookIcon from '../../assets/img/lost-book.svg';
import ReaderIcon from '../../assets/img/reader.svg';
import FormEditBook from '../../components/book-components/formeditbook/FormEditBook.jsx';
import PartnersBooks from '../../components/partner-components/partnersbooks/PartnersBooks.jsx';
import LostBooks from '../../components/book-components/lostbooks/LostBooks.jsx';
import BookRanking from '../../components/book-components/bookranking/BookRanking.jsx';
import { useAuth } from '../../auth/AuthContext';
import roles from '../../auth/roles';
import GlobalPendingBooks from '../../components/book-components/globalpendingbooks/GlobalPendingBooks.jsx';

const BookSection = () => {
    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    
    // Estados de Popups
    const [PopUpEdit, setPopupEdit] = useState(false);
    const [PopUpAdd, setPopupAdd] = useState(false);
    const [PopUpDeleteBook, setPopUpDelete] = useState(false);
    const [PopUpDuplicate, setPopUpDuplicate] = useState(false);
    const [PopUpDetail, setPopUpDetail] = useState(false);
    const [PopUpRanking, setPopUpRanking] = useState(false);
    const [PopUpBooksPartners, setPopUpBooksPartners] = useState(false);
    const [PopUpLostBooks, setPopUpLostBooks] = useState(false);
    const [popupGlobalPendingBooks, setPopupGlobalPendingBooks] = useState(false);

    const { auth } = useAuth();
    const BASE_URL = "http://localhost:4000/api/v1/books";

    const { items, loading, totalItems, getItems, createItem, updateItem, deleteItem } =
        useEntityManagerAPI("books");

    // Estado del formulario incluyendo ordenamiento
    const [formData, setFormData] = useState({
        author: "",
        codeInventory: "",
        codeCDU: "",
        codeSignature: "",
        bookTitle: "",
        yearEdition: "",
        numberEdition: "",
        notes: "",
        sortBy: "title", // Valor por defecto
        direction: "asc"  // Valor por defecto
    });

    const [filters, setFilters] = useState({});

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        // Manejo especial para el select de ordenamiento combinado
        if (name === "sortGroup") {
            const [sortBy, direction] = value.split('-');
            setFormData(prev => ({ ...prev, sortBy, direction }));
            return;
        }

        const updated = { ...formData, [name]: value };
        setFormData(updated);
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            // Limpiamos los filtros para la búsqueda (excluyendo parámetros de orden)
            const activeFilters = Object.fromEntries(
                Object.entries(formData).filter(([key, v]) => 
                    v !== "" && key !== 'sortBy' && key !== 'direction'
                )
            );

            setFilters(activeFilters);
            setOffsetActual(0);
            setResetPageTrigger(prev => prev + 1);

            // Petición al backend con filtros y orden dinámico
            getItems({
                ...activeFilters,
                sortBy: formData.sortBy,
                direction: formData.direction,
                limit: chunkSize,
                offset: 0
            });
        }, 500);

        return () => clearTimeout(delay);
    }, [formData]);

    async function handleChangePage(page) {
        const numberPage = Number(page);
        const lastItemIndex = numberPage * rowsPerPage;

        if (items.length < totalItems && lastItemIndex > items.length) {
            const newOffset = items.length;
            // Mantenemos el orden actual al paginar
            await getItems({ 
                ...formData, 
                limit: chunkSize, 
                offset: newOffset 
            }, true);
            setOffsetActual(newOffset);
        }
    }

    // Definición de columnas según rol
    let columns = [];
    if (auth.role === roles.admin) {
        columns = [
            { header: 'Título', accessor: 'title' },
            { header: 'Código de inventario', accessor: 'codeInventory' },
            { header: 'Codigo de CDU', accessor: 'codeCDU' },
            { header: 'Índice/Notas', accessor: 'notesText' },
            {
                header: 'Borrar',
                accessor: 'delete',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table"
                        onClick={() => {
                            setSelectedId(row.BookId);
                            setPopUpDelete(true);
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
                    <button className="button-table"
                        onClick={() => {
                            setPopupEdit(true);
                            setSelectedItem(row);
                        }}>
                        <img src={EditIcon} alt="Editar" />
                    </button>
                )
            },
            {
                header: 'Ver detalle',
                accessor: 'details',
                className: "action-buttons",
                render: (_, row) => (
                    <button className="button-table" onClick={() => {
                        setPopUpDetail(true);
                        setSelectedItem(row);
                    }}>
                        <img src={DetailsIcon} alt="Detalles" />
                    </button>
                )
            }
        ];
    } else {
        columns = [{ header: 'Título', accessor: 'title' }];
    }

    const booksPopUp = [
        {
            key: 'deletePopup',
            title: 'Borrar Libro',
            className: 'delete-size-popup',
            content: (
                <PopUpDelete
                    title="Libro"
                    onConfirm={() => deleteItem(selectedId)}
                    closePopup={() => setPopUpDelete(false)}
                    refresh={() => getItems({ ...formData, limit: chunkSize, offset: 0 })}
                />
            ),
            close: () => setPopUpDelete(false),
            condition: PopUpDeleteBook
        },
        {
            key: 'editPopup',
            title: 'Editar Libro',
            className: 'popup-container-book-form editsize',
            content: <FormEditBook 
                closeOnExit={() => setPopupEdit(false)} 
                selectedBook={selectedItem} 
                getItems={() => getItems({ ...formData, limit: chunkSize, offset: 0 })} 
            />,
            close: () => setPopupEdit(false),
            condition: PopUpEdit
        },
        {
            key: 'AddPopup',
            title: 'Agregar Libro',
            className: 'popup-container-book-form editsize',
            content: <FormAddBook 
                closeOnExit={() => setPopupAdd(false)} 
                getItems={() => getItems({ ...formData, limit: chunkSize, offset: 0 })} 
            />,
            close: () => setPopupAdd(false),
            condition: PopUpAdd
        },
        {
            key: 'DuplicatePopUp',
            title: 'Duplicar Libro',
            className: 'fade-popup',
            content: (
                <GenericForm
                    fields={duplicateBook}
                    onSubmit={(data) => {
                        duplicateBooks(data);
                        setPopUpDuplicate(false);
                    }}
                />
            ),
            close: () => setPopUpDuplicate(false),
            condition: PopUpDuplicate
        },
        {
            key: 'SeeDetail',
            title: 'Ver detalle',
            content: <ShowDetails data={selectedItem} detailsData={BookDetail} isPopup={true} />,
            close: () => setPopUpDetail(false),
            condition: PopUpDetail
        },
        {
            key: 'BooksRanking',
            title: 'Ranking de libros',
            className: 'ranking-books-size',
            content: <BookRanking />,
            close: () => setPopUpRanking(false),
            condition: PopUpRanking
        },
        {
            key: 'BooksPartnersQuantity',
            title: 'Cantidad de libros y socios',
            className: 'books-partners-amount-size',
            content: <PartnersBooks />,
            close: () => setPopUpBooksPartners(false),
            condition: PopUpBooksPartners
        },
        {
            key: 'LostBooks',
            title: 'Libros perdidos',
            className: 'lost-books-size',
            content: <LostBooks />,
            close: () => setPopUpLostBooks(false),
            condition: PopUpLostBooks
        },
        {
            key: 'globalPendingBooks',
            title: 'Libros Pendientes Global',
            className: 'books-partners-amount-size',
            content: <GlobalPendingBooks />,
            close: () => setPopupGlobalPendingBooks(false),
            condition: popupGlobalPendingBooks
        },
    ];

    async function duplicateBooks(data) {
        try {
            const response = await fetch(BASE_URL + "/duplicateBook", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + auth.token,
                },
                body: JSON.stringify({
                    codeInventory: data.codeInventory,
                    newCodeInventory: data.newCodeInventory,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al duplicar el libro');
            }

            await getItems({ ...formData, limit: chunkSize, offset: 0 }, true);
        } catch (error) {
            console.error('Error duplicando el libro:', error.message);
        }
    }

    return (
        <GenericSection
            title="Listado de libros"
            filters={
                <BookFilter formData={formData} onChange={handleFilterChange} />
            }
            columns={columns}
            data={items}
            popups={booksPopUp}
            totalItems={totalItems}
            handleChangePage={handleChangePage}
            loading={loading}
            resetPageTrigger={resetPageTrigger}
            showCount={true}
            actions={
                auth.role === roles.admin ? (
                    <div className="listbtns">
                        <Btn icon={<img src={PlusIcon} alt="" />} onClick={() => setPopupAdd(true)} text="Agregar libro" variant="primary" />
                        <Btn icon={<img src={PlusIcon} alt="" />} onClick={() => setPopUpDuplicate(true)} text="Duplicar libro" variant="primary" />
                        <Btn icon={<img src={BookIcon} alt="" />} onClick={() => setPopUpRanking(true)} text="Ranking de libros" variant="primary" />
                        <Btn icon={<img src={ReaderIcon} alt="" />} onClick={() => setPopUpBooksPartners(true)} text="Libros y socios" variant="primary" />
                        <Btn icon={<img src={LostBookIcon} alt="" />} onClick={() => setPopUpLostBooks(true)} text="Libros perdidos" variant="primary" />
                        <Btn text="Libros Pendientes" variant="primary" onClick={() => setPopupGlobalPendingBooks(true)} />
                    </div>
                ) : null
            }
        />
    );
}

export default BookSection;