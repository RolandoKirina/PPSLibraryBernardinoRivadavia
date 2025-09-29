import './Return.css';
import SearchPartner from '../searchpartner/SearchPartner';
import BackviewBtn from '../../common/backviewbtn/BackviewBtn';
import UnpaidFees from '../unpaidfees/UnpaidFees';
import ShowDetails from '../../generic/ShowDetails/ShowDetails';
import { lendBooksReturnDetails } from '../../../data/showdetails/LoanDetails';
import { useState } from 'react';
import GenericForm from '../../generic/GenericForm/GenericForm';
import { editPendingQuoteFields } from '../../../data/forms/LoanForms';
import { useEntityManager } from '../../../hooks/useEntityManager';
import { mockBooksLoans } from '../../../data/mocks/loans';
import { Table } from '../../common/table/Table';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import ReturnIcon from '../../../assets/img/return-icon.svg';
import ReneweIcon from '../../../assets/img/renewe-icon.svg';
import PopUp from '../../common/popup-table/PopUp';
import ConfirmMessage from '../../common/confirmMessage/ConfirmMessage';
import Btn from '../../common/btn/Btn';
import { useAuth } from '../../../auth/AuthContext';
import roles from '../../../auth/roles';
import { pendingbooks } from "../../../data/mocks/pendingbooks.js";


export default function Return() {
    //cuando se usan los inputs de partner se filtran las devoluciones y se pueden renovar, devolver o devolver todos

    const { auth } = useAuth();

    const [confirmReturnPopup, setConfirmReturnPopup] = useState(false);
    const [confirmRenewePopup, setConfirmRenewePopup] = useState(false);
    const [confirmReturnAllPopup, setConfirmReturnAllPopup] = useState(false);
    const [confirmSaveChangesPopup, setConfirmSaveChangesPopup] = useState(false);
    const [selected, setSelected] = useState(null);

    const [popupView, setPopupView] = useState("default");
    const [partnerData, setPartnerData] = useState({
        partnerName: '',
        partnerNumber: '',
    });

    const { items, getItem, createItem, updateItem, deleteItem } = useEntityManager(mockBooksLoans, 'booksLoans');

    const returnBooksPopups = [
        {
            key: 'confirmReturnPopup',
            title: 'Confirmar devolucion',
            className: '',
            content: <ConfirmMessage text={'¿Esta seguro de realizar la devolución?'} closePopup={() => setConfirmReturnPopup(false)} onConfirm={() => {
                deleteItem(selected.id)
                setConfirmReturnPopup(false)
            }} />,
            close: () => setConfirmReturnPopup(false),
            condition: confirmReturnPopup
        },
        {
            key: 'confirmRenewePopup',
            title: 'Confirmar Renovación',
            className: '',
            content: <ConfirmMessage text={'¿Esta seguro de realizar la renovación?'} closePopup={() => setConfirmRenewePopup(false)} onConfirm={() => {
                updateItem(selected.id, {
                    ...selected,
                    renewes: (Number(selected.renewes) + 1)
                })
                setConfirmRenewePopup(false)
            }} />,
            close: () => setConfirmRenewePopup(false),
            condition: confirmRenewePopup
        },
        {
            key: 'confirmReturnAllPopup',
            title: 'Confirmar Devolución de todos los libros',
            className: 'return-all-size',
            content: <ConfirmMessage text={'¿Esta seguro de devolver todos los libros?'} closePopup={() => setConfirmReturnAllPopup(false)} onConfirm={() => {
                items.map(item => {
                    deleteItem(item.id)
                })
                setConfirmReturnAllPopup(false)
            }} />,
            close: () => setConfirmReturnAllPopup(false),
            condition: confirmReturnAllPopup
        },
        {
            key: 'confirmSaveChangesPopup',
            title: 'Confirmar Cambios',
            className: '',
            content: <ConfirmMessage text={'¿Esta seguro de confirmar los cambios?'} closePopup={() => setConfirmSaveChangesPopup(false)} onConfirm={() => {

            }} />,
            close: () => setConfirmSaveChangesPopup(false),
            condition: confirmSaveChangesPopup
        }
    ];

    let columnsReturnForm = [];

    if (auth.role === roles.admin) {
        columnsReturnForm = [
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Renovado', accessor: 'renewes' },
            {
                header: 'Detalles',
                accessor: 'details',
                render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => {
                        setPopupView('details')
                        setSelected(row)
                    }}>
                        <img src={DetailsIcon} alt="Detalles" />
                    </button>
                )
            },
            {
                header: 'Devolver',
                accessor: 'return',
                render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => {
                        setConfirmReturnPopup(true)
                        setSelected(row)
                    }}>
                        <img src={ReturnIcon} alt="Devolver" />
                    </button>
                )
            },
            {
                header: 'Renovar',
                accessor: 'renewe',
                render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => {
                        setConfirmRenewePopup(true)
                        setSelected(row)
                    }}>
                        <img src={ReneweIcon} alt="Renovar" />
                    </button>
                )
            }
        ];
    }
    else if (auth.role === roles.user) {
        columnsReturnForm = [
            { header: 'Código del libro', accessor: 'bookCode' },
            { header: 'Título', accessor: 'bookTitle' },
            { header: 'Renovaciones', accessor: 'renewes' },
            {
                header: 'Detalles',
                accessor: 'details',
                render: (_, row) => (
                    <button type='button' className="button-table" onClick={() => {
                        setPopupView('details')
                        setSelected(row)
                    }}>
                        <img src={DetailsIcon} alt="Detalles" />
                    </button>
                )
            }
        ];
    }

    const columnsPendingBooks = [
        { header: 'Código de libro', accessor: 'bookCode' },
        { header: 'Título', accessor: 'title' },
        { header: 'Fecha de retiro', accessor: 'retiredDate' },
        { header: 'Fecha prevista', accessor: 'expectedDate' },
        { header: 'Fecha de devolución', accessor: 'returnedDate' },
        { header: 'Renovaciones', accessor: 'renewes' },
        {
            header: 'Devuelto', accessor: 'returned',
            render: (value) => value ? 'Sí' : 'No'
        }
    ]; 

    const handleExtraData = (newData) => {
        setPartnerData(prev => {
            const updated = { ...prev, ...newData };
            console.log("devolucion actualizado con datos externos:", updated);
            return updated;
        });
    };

    return (
        <>
            <div className='return-form-content'>
                {popupView === 'default' && (
                    <>
                        <form>
                            {auth.role === 'admin' && (
                                <SearchPartner menu={setPopupView} partnerData={
                                    {
                                        partnerName: partnerData.partnerName,
                                        partnerNumber: partnerData.partnerNumber,
                                        memoSearch: partnerData.memoSearch
                                    }
                                } onDataChange={handleExtraData} />
                            )}


                            <div className='lend-books-container'>
                                <h2 className='lend-books-title'>Libros Prestados</h2>

                                <Table columns={columnsReturnForm} data={items} />

                                {auth.role === 'admin' && (
                                    <div className='add-book-to-lend'>
                                        <Btn text={'Devolver todos'} onClick={() => setConfirmReturnAllPopup(true)} />
                                    </div>
                                )}


                                {returnBooksPopups.map(({ condition, title, className, content, close, variant }, idx) => (
                                    condition && (
                                        <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                                            {content}
                                        </PopUp>
                                    )
                                ))}
                            </div>
                        </form>
                    </>



                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de libro préstado'} isPopup={false} data={selected} detailsData={lendBooksReturnDetails} />
                    </>
                )}
                {popupView === 'unpaidFees' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <UnpaidFees changeView={setPopupView} />
                    </>
                )}
                {popupView === 'pendingBooks' && (
                    <>
                        <Table columns={columnsPendingBooks} data={pendingbooks}></Table>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                    </>
                )}

            </div>
        </>
    )
}