import LoanFilter from "../../components/filter/loanfilter/LoanFilter";
import './LoanSection.css';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import BookIcon from '../../assets/img/add-book-icon.svg';
import LoanButtons from "../../components/loan-components/loanbuttons/LoanButtons";
import { useState } from "react";
import LoanForm from "../../components/loan-components/loanform/LoanForm";
import LoanListings from "../../components/loan-components/loanlistings/LoanListings";
import Return from "../../components/loan-components/return/Return";
import Renewe from "../../components/loan-components/renewe/Renewe";
import ShowDetails from "../../components/generic/ShowDetails/ShowDetails";
import GenericSection from "../../components/generic/GenericSection/GenericSection";
import GenericForm from "../../components/generic/GenericForm/GenericForm";
import { editLoanformFields } from "../../data/forms/LoanForms";
import { loanDetailsInfo } from '../../data/showdetails/LoanDetails';
import PopUpDelete from '../../components/common/deletebtnComponent/PopUpDelete';
import { useEffect } from "react";
import { mockLoans } from "../../data/mocks/loans";
import { useEntityManager } from "../../hooks/useEntityManager";
import { useAuth } from "../../auth/AuthContext";
import { useEntityManagerAPI } from "../../hooks/useEntityManagerAPI";
import LoanBooks from "../../components/loan-components/loanbooks/LoanBooks";

export default function LoanSection({ openRenewes, pendientBooks }) {
    //const { items: loanItems, getItem: getLoanItem, createItem: createLoanItem, updateItem: updateLoanItem, deleteItem: deleteLoanItem } = useEntityManager(mockLoans, 'loans');
    const [selected, setSelected] = useState(null);
    const [deletePopup, setDeletePopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [returnsPopup, setReturnsPopup] = useState(false);
    const [listingsPopup, setListingsPopup] = useState(false);
    const [renewePopup, setRenewePopup] = useState(false);
    const [booksPopup, setBooksPopup] = useState(false);

    const [filters, setFilters] = useState({});

    const { auth, logout } = useAuth();

    const {
        items,
        getItems,
        deleteItem,
        createItem,
        updateItem
    } = useEntityManagerAPI("loans");


    useEffect(() => {
        if (openRenewes) {
            setRenewePopup(true);
        }
        localStorage.removeItem('loans');

    }, [openRenewes]);

    useEffect(() => {
    const delay = setTimeout(() => {
        getItems(filters);
    }, 500);

    return () => clearTimeout(delay);
    }, [filters]);


    useEffect(() => {
        getItems();
    }, [items]);

async function handleAddItem(data) {
  try {
    const res = await createItem(data);
    console.log("Respuesta:", res);

    setAddPopup(false);
    console.log("Préstamo creado con éxito");
  } catch (err) {
    console.error("Error al crear préstamo:", err);
  }
}

    async function handleUpdateItem(data) {
        try {
            const res = await updateItem(selected.loanId, data);

            if (!res.ok) {
                throw new Error("Error al actualizar datos");
            }
            else {
                setEditPopup(false);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    let columns = [];

    if (auth.role === 'admin') {
        columns = [
            { header: 'CodigoPrestamo', accessor: 'loanId' },
            { header: 'Nombre Socio', accessor: 'name' },
            { header: 'Fecha retiro', accessor: 'retiredDate' },
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
                        // getLoanDetails(row)
                    }}>
                        <img src={DetailsIcon} alt="Detalles" />
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
    else if (auth.role === 'user') {
        columns = [
            { header: 'Nombre Socio', accessor: 'name' },
            { header: 'Fecha retiro', accessor: 'retiredDate' },
            { header: 'Fecha limite', accessor: 'plannedDate' },
            { header: 'Fecha devolución', accessor: 'returnedDate' },
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
        ]
    }

    //data para crear todos los popups que existen en la seccion
    const loanPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar prestamo',
            className: 'delete-size-popup',
            content: 
            // <PopUpDelete title={"Prestamo"} onConfirm={
            //     () => {
            //         deleteItem(selected.loanId);
            //         setDeletePopup(false)
            //     }
            // } closePopup={() => setDeletePopup(false)} 
            // />,

            <PopUpDelete
                title="Prestamo"
                onConfirm={() => deleteItem(selected.loanId)} 
                closePopup={() => setDeletePopup(false)}
                refresh={() => getItems()} 
            />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar préstamo',
            className: '',
            content: <LoanForm method="update" createLoanItem={handleUpdateItem} loanSelected={selected} />,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar préstamo',
            className: 'loans-background',
            content: <LoanForm createLoanItem={handleAddItem} />,
            close: () => setAddPopup(false),
            condition: addPopup
        },
        {
            key: 'detailsPopup',
            title: 'Detalles del préstamo',
            className: '',
            content: <ShowDetails data={selected} detailsData={loanDetailsInfo} isPopup={true} />,
            close: () => setDetailsPopup(false),
            condition: detailsPopup
        },
        {
            key: 'booksPopup',
            title: 'Libros del préstamo',
            className: '',
            content: <LoanBooks loanSelected={selected} />,
            close: () => setBooksPopup(false),
            condition: booksPopup   
        },
        {
            key: 'returnsPopup',
            title: 'Devoluciones',
            className: '',
            content: <Return />,
            close: () => setReturnsPopup(false),
            condition: returnsPopup
        },
        {
            key: 'listingsPopup',
            title: 'Imprimir listados',
            className: 'loan-listings-size',
            content: <LoanListings />,
            close: () => setListingsPopup(false),
            condition: listingsPopup
        },
        {
            key: 'renewePopup',
            title: 'Listado de reservas',
            className: 'loan-renews-size',
            content: <Renewe isPopup={true} />,
            close: () => setRenewePopup(false),
            condition: renewePopup
        }
    ];

    return (
        <>
            <GenericSection title={auth.role === 'admin' ? 'Listado de préstamos' : 'Listado de tus préstamos'} filters={<LoanFilter onFilterChange={setFilters} />} columns={columns} data={items} popups={loanPopups}
                actions={
                    <LoanButtons
                        displayLoanform={() => setAddPopup(true)}
                        displayReturnForm={() => setReturnsPopup(true)}
                        displayListingsPopup={() => setListingsPopup(true)}
                        displayRenewe={() => setRenewePopup(true)}
                    />
                } />
        </>
    );

}