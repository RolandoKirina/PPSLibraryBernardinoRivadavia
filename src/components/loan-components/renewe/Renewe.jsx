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

export default function Renewe({title, isPopup}) {
    const [addRenewe, setAddRenewe] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [popupView, setPopupView] = useState("default");

    function redirect(action) {
        switch(action) {
            case 'add': {
                let title = 'Añadir reserva'
                window.open(`${window.location.origin}/loans/renewe-add`, '_blank',title);
                break;
            }
            case 'edit': {  
                window.open(`${window.location.origin}/loans/renewe-edit`, '_blank');
                break;
            }
            case 'details': {
                window.open(`${window.location.origin}/loans/renewe-details`, '_blank');
                break;
            }
        }
    }


    const renewespopup= [
        {
            key: 'deletePopup',
            title: 'Borrar reserva',
            className: 'delete-size-popup',
            content: <PopUpDelete  title={"Reserva"} closePopup={() => setDeletePopup(false)} />,
            close: () => setDeletePopup(false),
            condition: deletePopup,
            variant: 'delete'
        },
    ];

    const renewes = [
        { id: 1, partner_number: 123, partner: 'Carlos ruíz' },
        { id: 1, partner_number: 123, partner: 'Carlos ruíz' },
        { id: 1, partner_number: 123, partner: 'Carlos ruíz' },
        { id: 1, partner_number: 123, partner: 'Carlos ruíz' },
        { id: 1, partner_number: 123, partner: 'Carlos ruíz' },
    ];
    
        const columns = [
        { header: 'Número socio', accessor: 'partner_number' },
        { header: 'Socio', accessor: 'partner' },
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
            <button className="button-table"  onClick={() => setPopupView('editForm')}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => setPopupView('details')}>
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
                    

                        <Table columns={columns} data={renewes}>
                        <div className='add-renew-btn'>
                            <Btn text={'Nueva reserva'}  onClick={() => setPopupView('addRenewe')} icon={<img src={PlusIcon} alt={PlusIcon}/>}/>
                        </div>
                        </Table>

                        {renewespopup.map(({ condition, title, className, content, close, variant }, idx) => (
                        condition && (
                            <PopUp key={idx} title={title} className={className || ''} onClick={close} {...(variant === 'delete' && { variant: 'delete' })}>
                            {content}
                            </PopUp>
                        )
                        ))}


                    </div>
                )}
                {popupView === 'editForm' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView} />
                    {/* CAMBIAR - AÑADIR TABLA */}
                    <GenericForm title={'Editar Reserva'} fields={reneweLoanFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>
                    </>
                )}
                {popupView === 'addRenewe' && (
                    <>
                    <BackviewBtn menu={'default'} changeView={setPopupView} />
                    
                    {/* CAMBIAR - AÑADIR TABLA */}
                    <GenericForm title={'Agregar Reserva'} fields={reneweLoanFields} onSubmit={(data) => console.log('Formulario enviado:', data)}/>
                    </>
                )}
                {popupView === 'details' && (
                    <>
                        <BackviewBtn menu={'default'} changeView={setPopupView} />
                        <ShowDetails insidePopup={true} titleText={'Detalles de reserva'} isPopup={false} detailsData={reneweDetails} />
                    </>
                )}
                
            </div>
            
        </>
    )
}