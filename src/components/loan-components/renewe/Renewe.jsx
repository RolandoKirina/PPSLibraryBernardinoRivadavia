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

export default function Renewe() {
    const [deletePopup, setDeletePopup] = useState(false);

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
            <div className='renewe-container'>
                <div className='renewe-inputs-items'>
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
                            <label>Fecha prevista devolución</label>
                            <input type='date' />
                        </div>
                             <div>
                            <label>Fecha reserva</label>
                            <input type='date' />
                        </div>   
                    </div>

                    <Table columns={columns} data={renewes}>
                        <div className='add-renew-btn'>
                            <Btn text={'Nueva reserva'}  onClick={() => redirect('add')} icon={<img src={PlusIcon} alt={PlusIcon}/>}/>
                        </div>
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
              
                
            </div>
        </>
    )
}