import { Table } from '../../table/Table';
import './Renewe.css';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import Btn from '../../btn/Btn';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import PopUp from '../../popup-table/PopUp2';
import PopUpDelete from '../../deletebtnComponent/PopUpDelete';
import { useState } from 'react';
import GenericSection from '../../generic/GenericSection/GenericSection.jsx';
import BackviewBtn from '../../backviewbtn/BackviewBtn.jsx';
import GenericForm from '../../generic/GenericForm/GenericForm.jsx';
import { reneweLoanFields } from '../../../data/loan/LoanForms.js';
import ShowDetails from '../../generic/ShowDetails/ShowDetails.jsx';
import { reneweDetails } from '../../../data/loan/LoanDetails.js';
import AddRenewe from '../addrenewe/AddRenewe.jsx';
import { useEntityManager } from '../../../hooks/useEntityManager.js';
import { mockRenewes } from '../../../data/mocks/loans.js';


export default function Renewe({title, isPopup}) {
    const [deletePopup, setDeletePopup] = useState(false);
    const [popupView, setPopupView] = useState("default");
    const [selected, setSelected] = useState(null);
    const {
    items: reneweItems,
    getItem: getReneweItem,
    createItem: createReneweItem,
    updateItem: updateReneweItem,
    deleteItem: deleteReneweItem
    } = useEntityManager(mockRenewes, 'renewes');


    const renewespopup= [
        {
            key: 'deletePopup',
            title: 'Borrar reserva',
            className: 'delete-size-popup',
            content: <PopUpDelete title={"Reserva"} closePopup={() => setDeletePopup(false)} onConfirm={
                () => {
                    deleteReneweItem(selected.id)
                    setDeletePopup(false)
                }
            } />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
    ];
    
        const columns = [
        { header: 'Número socio', accessor: 'partnerNumber' },
        { header: 'Socio', accessor: 'partnerFullName' },
        { header: 'Titulo libro', accessor: 'bookTitle' },
        {
            header: 'Borrar',
            accessor: 'delete',
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
    
            render: (_, row) => (
            <button className="button-table"  onClick={() => {
                setSelected(row)
                setPopupView('editForm')
                }}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => {
                setPopupView('details')
                setSelected(row);
                }}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        }
    ];

    return (
        <>
            <div className='renewe-container'>
                {popupView === 'default' && (
                    <div className='renewe-inputs-items'>
                        <div className='renewe-inputs-container'>
                            <div className='renewe-title'>
                                <h2>Filtros</h2>
                            </div>
                            <div className='renewe-input'>
                            <div>
                                <label>Codigo libro</label>
                                <input type='number' />
                            </div>
                                <div>
                                <label>Título libro</label>
                                <input type='text' />
                            </div>   
                        </div>
                        <div className='renewe-input'>
                            <div>
                                <label>Fecha de devolución</label>
                                <input type='date' />
                            </div>
                            <div>
                                <label>Fecha reserva</label>
                                <input type='date' />
                            </div>   
                        </div>
                        </div>
                    

                        <div className='renewe-table-size'>
                            <div className='type-loan-title'>
                                <h2>Reservas
                                </h2>
                            </div>
                            <Table columns={columns} data={reneweItems}> 
                                <div className='add-renew-btn'>
                                    <Btn variant={'primary'} text={'Nueva reserva'}  onClick={() => setPopupView('addRenewe')} icon={<img src={PlusIcon} alt={PlusIcon}/>}/>
                                </div>
                            </Table>
                        </div>

                        {renewespopup.map(({ condition, title, className, content, close, variant }, idx) => (
                        condition && (
                            <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                            {content}
                            </PopUp>
                        )
                        ))}


                    </div>
                )}
                {popupView === 'addRenewe' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView} />
                    <AddRenewe method={'add'} createReneweItem={createReneweItem} />
                    </>
                )}
                {popupView === 'editForm' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView} />
                    <GenericForm fields={reneweLoanFields} onSubmit={(data) => {
                        updateReneweItem(selected.id, {
                            bookTitle: selected.bookTitle,
                            partnerNumber: selected.partnerNumber,
                            reneweDate: data.reneweDate,
                            expectedDate: data.expectedDate,
                            books: selected.books
                        })
                        setPopupView('default');
                    }} title={'Editar reserva'} className={'renewe-edit-form-size'}/>
                    </>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails data={selected} insidePopup={true} titleText={'Detalles de reserva'} isPopup={false} detailsData={reneweDetails} />
                    </>
                )}
                
            </div>
            
        </>
    )
}