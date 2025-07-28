import LoanFilter from "../../components/loan-components/loanfilter/LoanFilter";
import './LoanSection.css';
import DeleteIcon from '../../assets/img/delete-icon.svg';
import EditIcon from '../../assets/img/edit-icon.svg';
import DetailsIcon from '../../assets/img/details-icon.svg';
import LoanButtons from "../../components/loan-components/loanbuttons/LoanButtons";
import { useState } from "react";
import LoanForm from "../../components/loan-components/loanform/LoanForm";
import {loanDetailsMenus} from '../../data/loan/LoanDetails';
import LoanListings from "../../components/loan-components/loanlistings/LoanListings";
import Return from "../../components/loan-components/return/Return";
import Renewe from "../../components/loan-components/renewe/Renewe";
import ShowDetails from "../../components/generic/ShowDetails/ShowDetails";
import GenericSection from "../../components/generic/GenericSection/GenericSection";
import GenericForm from "../../components/generic/GenericForm/GenericForm";
import { editLoanformFields } from "../../data/loan/LoanForms";
import PopUpDelete from '../../components/deletebtnComponent/PopUpDelete';

export default function LoanSection() {
    const [deletePopup, setDeletePopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);
    const [detailsPopup, setDetailsPopup] = useState(false);
    const [returnsPopup, setReturnsPopup] = useState(false);
    const [listingsPopup, setListingsPopup] = useState(false);
    const [renewePopup, setRenewePopup] = useState(false);

    //data tabla principal prestamos
    const loans = [
    { id: 1, reader_name: 'Carolina Gómez', title: 'La sombra del viento' },
    { id: 2, reader_name: 'Martín Rodríguez', title: 'El Principito' },
    { id: 3, reader_name: 'Lucía Méndez', title: 'Rayuela' },
    { id: 4, reader_name: 'Gabriel Pérez', title: 'Cien años de soledad' },
    { id: 5, reader_name: 'Ana Torres', title: 'Fahrenheit 451' }
    ];

    //columnas y acciones - tabla principal prestamos
    const columns = [
    { header: 'Nombre Lector', accessor: 'reader_name' },
    { header: 'Titulo', accessor: 'title' },
    {
        header: 'Borrar',
        accessor: 'delete',
        render: (_, row) => (
        <button className="button-table" onClick={() => setDeletePopup(true)}>
            <img src={DeleteIcon} alt="Borrar" />
        </button>
        )
    },
    {
        header: 'Editar',
        accessor: 'edit',

        render: (_, row) => (
        <button className="button-table"  onClick={() => setEditPopup(true)}>
            <img src={EditIcon} alt="Editar" />
        </button>
        )
    },
    {
        header: 'Ver detalle',
        accessor: 'details',
        render: (_, row) => (
        <button className="button-table" onClick={() => setDetailsPopup(true)}>
            <img src={DetailsIcon} alt="Detalles" />
        </button>
        )
    }
    ];

    //data para crear todos los popups que existen en la seccion
    const loanPopups = [
        {
            key: 'deletePopup',
            title: 'Borrar prestamo',
            className: 'delete-size-popup',
            content: <PopUpDelete  title={"Prestamo"} closePopup={() => setDeletePopup(false)} />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
        {
            key: 'editPopup',
            title: 'Editar préstamo',
            className: '',
            content: <GenericForm fields={editLoanformFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
            close: () => setEditPopup(false),
            condition: editPopup
        },
        {
            key: 'addPopup',
            title: 'Agregar préstamo',
            className: '',
            content: <LoanForm />,
            // content: <GenericForm fields={formFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>,
            close: () => setAddPopup(false),
            condition: addPopup
        },
        {
            key: 'detailsPopup',
            title: 'Detalles del préstamo',
            className: '',
            content: <ShowDetails detailsData={loanDetailsMenus} isPopup={true} />,
            close: () => setDetailsPopup(false),
            condition: detailsPopup
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
            className: 'loan-listings-size',
            content: <Renewe isPopup={true}/>,
            close: () => setRenewePopup(false),
            condition: renewePopup
        }
    ];

    return (     
        <>
            <GenericSection title={'Listado de préstamos'} filters={<LoanFilter />} columns={columns} data={loans} popups={loanPopups}
            actions={
                 <LoanButtons
                  displayLoanform={() => setAddPopup(true)}
                  displayReturnForm={() => setReturnsPopup(true)}
                  displayListingsPopup={() => setListingsPopup(true)}
                  displayRenewe={() => setRenewePopup(true)}
                 />
            }/>
        </>
    );

}