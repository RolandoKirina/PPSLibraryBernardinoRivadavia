import './ReaderSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import BookIcon from '../../assets/img/add-book-icon.svg';
import ShowDetails from '../../components/generic/ShowDetails/ShowDetails';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete';
import Btn from '../../components/common/btn/Btn';
import ReaderForm from '../../components/reader-components/readerform/ReaderForm';
import { readerDetailsInfo } from '../../data/showdetails/LoanDetails';
import { loanDetailsInfo } from '../../data/showdetails/LoanDetails';
import GenericForm from '../../components/generic/GenericForm/GenericForm';
import { readerFields } from '../../data/forms/LoanForms';
import ReaderFilter from '../../components/filter/readerfilter/ReaderFilter';

export default function ReaderSection() {
    const [filters, setFilters] = useState({});
    const [selected, setSelected] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [booksPopup, setBooksPopup] = useState(false);

    const chunkSize = 100;
    const rowsPerPage = 5;
    const [offsetActual, setOffsetActual] = useState(0);
    const [resetPageTrigger, setResetPageTrigger] = useState(0);
    const [errorMessage, setErrorMessage] = useState(false);

    const {
        items,
        loading,
        totalItems,
        getItems,
        createItem,
    } = useEntityManagerAPI("readers");

    const {
        updateItem: updateReaderBook,
        deleteItem: deleteReaderBook,
    } = useEntityManagerAPI("reader-books");

    useEffect(() => {
        const delay = setTimeout(() => {
            setOffsetActual(0);

            setResetPageTrigger(prev => prev + 1);

            getItems({ ...filters, sortBy: 'name', direction: 'asc', limit: chunkSize, offset: 0 });
        }, 500);

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

    async function handleAddItem(data) {
        try {
            await createItem(data);

            await getItems();

            setAddPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al crear un Lector:", error);
        }
    }

    async function handleUpdateItem(data) {
        try {
            await updateItem(selected.id, data);

            await getItems();

            setEditPopup(false);

            setErrorMessage(null);
        }
        catch (error) {
            setErrorMessage(error.message);
            console.error("Error al actualizar un Lector:", error);
        }
    }

    const readerPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar lector',
            className: 'delete-size-popup',
            content:
                <PopUpDelete
                    title="Lector"
                    onConfirm={() => deleteReaderBook(selected.id)}
                    closePopup={() => setDeletePopup(false)}
                    refresh={() => getItems()}
                />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar lector',
            className: '',
            //content: <LoanForm method="update" createLoanItem={handleUpdateItem} loanSelected={selected} />,
            content: <GenericForm fields={readerFields} onSubmit={(data) => handleUpdateItem(data)} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar lector',
            className: 'loans-background',
            content: <ReaderForm createReaderItem={handleAddItem} errorMessage={errorMessage} />,
            close: () => {
                setAddPopup(false)
                setErrorMessage(null);
            },
            condition: addPopup
        },
        // {
        //     key: 'editPopup',
        //     title: 'Editar préstamo',
        //     className: '',
        //     content: <GenericForm fields={} onSubmit={(data) => updateItem(selected.dni, selected)}/>,
        //     close: () => setEditPopup(false),
        //     condition: editPopup
        // },
        {
            key: 'detailsPopup',
            title: 'Detalles del préstamo',
            className: '',
            content: <ShowDetails data={selected} detailsData={readerDetailsInfo} isPopup={true} />,
            close: () => setDetailsPopup(false),
            condition: detailsPopup
        },
        // {
        //     key: 'booksPopup',
        //     title: 'Libros del préstamo',
        //     className: '',
        //     content: <LoanBooks loanSelected={selected} />,
        //     close: () => setBooksPopup(false),
        //     condition: booksPopup
        // },
        // {
        //     key: 'returnsPopup',
        //     title: 'Devoluciones de libros',
        //     className: '',
        //     content: <Return />,
        //     close: () => setReturnsPopup(false),
        //     condition: returnsPopup
        // },
        // {
        //     key: 'listingsPopup',
        //     title: 'Imprimir listados',
        //     className: 'loan-listings-size',
        //     content: <LoanListings />,
        //     close: () => setListingsPopup(false),
        //     condition: listingsPopup
        // },
        // {
        //     key: 'renewePopup',
        //     title: 'Listado de reservas',
        //     className: 'loan-renews-size',
        //     content: <Renewe isPopup={true} />,
        //     close: () => setRenewePopup(false),
        //     condition: renewePopup
        // }
    ];


    const columns = [
        { header: 'Titulo', accessor: 'bookTitle' },
        { header: 'DNI', accessor: 'dni' },
        { header: 'Nombre', accessor: 'name' },
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
                    setSelected(row)
                    console.log(row)
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
                    setSelected(row)
                    setDetailsPopup(true)
                }}>
                    <img src={DetailsIcon} alt="Detalles" />
                </button>
            )
        },
    ];


    return (
        <>
            <GenericSection
                title={'Listado de Lectores en sala'}
                columns={columns}
                data={items}
                popups={readerPopups}
                rowsPerPage={rowsPerPage}
                totalItems={totalItems}
                handleChangePage={handleChangePage}
                loading={loading}
                filters={
                    <ReaderFilter
                        onFilterChange={setFilters}
                    />
                }
                actions={
                    <div className='reader-add-btn'>
                        <Btn text={'Agregar'} onClick={() => setAddPopup(true)} variant={'primary'} />
                    </div>

                }
            />
        </>
    )

}