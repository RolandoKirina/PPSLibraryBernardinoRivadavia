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

export default function Renewe({title, isPopup}) {
    const [popUpAddRenewe, setPopUpAddRenewe] = useState(false);

    function redirect(action) {
        switch(action) {
            case 'add': {
                window.open(`${window.location.origin}/loans/renewe-add`, '_blank');
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
        key: 'addRenewes',
            title: 'Añadir reserva',
            className: 'popup-container',
            content: <PopUp  title={"Añadir reserva"} closePopup={() => setPopUpAddRenewe(false)} />,
            close: () => setPopUpAddRenewe(false),
            condition: popUpAddRenewe,
            variant: 'delete'
    }];
    const renewes = [
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
            <button className="button-table"  onClick={() => redirect('edit')}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => redirect('details')}>
                <img src={DetailsIcon} alt="Detalles" />
            </button>
            )
        }
    ];

    return (
        <>
        
        <GenericSection title={title} columns={columns} data={renewes} popups={renewespopup} actions={(<div className='add-renew-btn'>
                <Btn text={'Nueva reserva'}  onClick={() => setPopUpAddRenewe(true) }icon={<img src={PlusIcon} alt={PlusIcon}/>}/>
            </div>)}>
            
        </GenericSection>
    
        
            {/*<div className='renewe-container'>
                {title && <h2>{title}</h2>}
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
                       
                    </Table>

                    {deletePopup && (
                        <PopUp
                            className={'delete-size-popup'}
                            onClick={() => setDeletePopup(false)}
                            variant="delete"
                        >
                        <PopUpDelete title={"Reserva"} closePopup={() => setDeletePopup(false)} />
                        </PopUp>
                    )
                    }
                </div>
              
                
            </div>*/}
        </>
    )
}