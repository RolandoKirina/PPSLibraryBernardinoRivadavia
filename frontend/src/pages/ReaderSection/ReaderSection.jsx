import './ReaderSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import { useEntityManagerAPI } from '../../hooks/useEntityManagerAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import BookIcon from '../../assets/img/add-book-icon.svg';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete';
import Btn from '../../components/common/btn/Btn';
import ReaderForm from '../../components/reader-components/readerform/ReaderForm';

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
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("readers");

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

    const readerPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar lector',
            className: 'delete-size-popup',
            content:
                <PopUpDelete
                    title="Lector"
                    onConfirm={() => deleteItem(selected.dni)}
                    closePopup={() => setDeletePopup(false)}
                    refresh={() => getItems()}
                />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        // {
        //     key: 'editPopup',
        //     title: 'Editar lector',
        //     className: '',
        //     content: <LoanForm method="update" createLoanItem={handleUpdateItem} loanSelected={selected} />,
        //     close: () => setEditPopup(false),
        //     condition: editPopup
        // },
        {
            key: 'addPopup',
            title: 'Agregar lector',
            className: 'loans-background',
            content: <ReaderForm createReaderItem={handleAddItem} />,
            close: () => setAddPopup(false),
            condition: addPopup
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
            header: 'Add',
            accessor: 'add',
            className: "action-buttons",
            render: (_, row) => (
                <button className="button-table" onClick={() => {
                    setAddPopup(true)
                }}>
                    <img src={EditIcon} alt="Agregar" />
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


    return (
        <>
            <GenericSection title={'Listado de Lectores en sala'} columns={columns} data={items} popups={readerPopups} actions={
                <Btn text={'Agregar'} onClick={() => setAddPopup(true)} variant={'primary'} />
            } />
        </>
    )

}