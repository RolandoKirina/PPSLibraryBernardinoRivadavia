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

export default function ReaderSection() {
    const [filters, setFilters] = useState({});
    const [selected, setSelected] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [booksPopup, setBooksPopup] = useState(false);

    const {
        items,
        getItems,
        createItem,
    } = useEntityManagerAPI("readers");

    const {
        updateItem: updateReaderBook,
        deleteItem: deleteReaderBook,
    } = useEntityManagerAPI("reader-books");

    useEffect(() => {
        const delay = setTimeout(() => {
            getItems(filters);
        }, 500);

        return () => clearTimeout(delay);
    }, [filters]);

    async function handleAddItem(data) {
        try {
            const res = await createItem(data);

            setAddPopup(false);

            await getItems();
        } catch (err) {
            console.error("Error al crear préstamo:", err);
        }
    }

    async function handleUpdateItem(data) {
        try {
            const res = await updateReaderBook(selected.id, data);

            setEditPopup(false);

             await getItems();
        }
        catch (err) {
            console.error(err);
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
            content: <GenericForm fields={readerFields} onSubmit={(data) => handleUpdateItem(data)}/>,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar lector',
            className: 'loans-background',
            content: <ReaderForm createReaderItem={handleAddItem} />,
            close: () => setAddPopup(false),
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
            <GenericSection title={'Listado de Lectores en sala'} columns={columns} data={items} popups={readerPopups} actions={
                <Btn text={'Agregar'} onClick={() => setAddPopup(true)} variant={'primary'} />
            } />
        </>
    )

}