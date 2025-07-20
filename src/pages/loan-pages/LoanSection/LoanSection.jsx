import LoanFilter from "../../../components/loan-components/loanfilter/LoanFilter";
import './LoanSection.css';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import { Table } from "../../../components/table/Table";
import LoanButtons from "../../../components/loan-components/loanbuttons/LoanButtons";
import { useState } from "react";
import LoanForm from "../../../components/loan-components/loanform/LoanForm";
import LoanDelete from "../../../components/loan-components/loandelete/LoanDelete";
import ShowDetails from "../../../components/showdetails/ShowDetails";
import {loanDetailsMenus} from '../../../data/LoanDetails';
import LoanListings from "../../../components/loan-components/loanlistings/LoanListings";

export default function LoanSection() {
    const [openLoanForm, setOpenLoanForm] = useState(false);
    const [openEditLoanForm, setOpenEditLoanForm] = useState(false);
    const [openLoanDetails, setOpenLoanDetails] = useState(false);
    const [openLoanDelete, setOpenLoanDelete] = useState(false);
    const [openReturnForm, setOpenReturnForm] = useState(false);
    const [openListingsPopup, setOpenListingsPopup] = useState(false);

    const loans = [
    { id: 1, reader_name: 'Carolina Gómez', title: 'La sombra del viento' },
    { id: 2, reader_name: 'Martín Rodríguez', title: 'El Principito' },
    { id: 3, reader_name: 'Lucía Méndez', title: 'Rayuela' },
    { id: 4, reader_name: 'Gabriel Pérez', title: 'Cien años de soledad' },
    { id: 5, reader_name: 'Ana Torres', title: 'Fahrenheit 451' }
    ];

    const columns = [
    { header: 'Nombre Lector', accessor: 'reader_name' },
    { header: 'Titulo', accessor: 'title' },
    {
        header: 'Borrar',
        accessor: 'delete',
        render: (_, row) => (
        <button className="button-table"onClick={() => setOpenLoanDelete(true)}>
            <img src={DeleteIcon} alt="Borrar" />
        </button>
        )
    },
    {
        header: 'Editar',
        accessor: 'edit',

        render: (_, row) => (
        <button className="button-table"  onClick={() => setOpenEditLoanForm(true)}>
            <img src={EditIcon} alt="Editar" />
        </button>
        )
    },
    {
        header: 'Ver detalle',
        accessor: 'details',
        render: (_, row) => (
        <button className="button-table" onClick={() => setOpenLoanDetails(true)}>
            <img src={DetailsIcon} alt="Detalles" />
        </button>
        )
    }
    ];

    return (     
        <>
            <main>
               <LoanFilter />
               <section className="loan-section">
                <div className="loan-title">
                    <h2>Listado de préstamos</h2>
                </div>
                <div className="loans">
                    <Table columns={columns} data={loans}>
                        <LoanButtons displayLoanform={setOpenLoanForm} displayReturnForm={setOpenReturnForm} displayListingsPopup={setOpenListingsPopup}/>

                        {openLoanForm && <LoanForm method={'add'} closeLoanForm={setOpenLoanForm} />}

                        {openEditLoanForm && <LoanForm method={'update'} closeLoanForm={setOpenEditLoanForm} />}

                        {openLoanDelete && <LoanDelete isPopup={true} closePopup={setOpenLoanDelete}/>}

                         {openLoanDetails && <ShowDetails closePopupFunction={setOpenLoanDetails} titleText={'Detalles del préstamo'} isPopup={true} detailsData={loanDetailsMenus}/> }

                         {openReturnForm && <LoanForm method={'return'} closeLoanForm={setOpenReturnForm} />}

                         {openListingsPopup && <LoanListings closePopup={setOpenListingsPopup}/>}

                    
                    </Table>
                    
                </div>
               </section>
            </main>
        
        </>

    );
}