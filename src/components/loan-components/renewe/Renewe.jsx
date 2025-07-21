import { Table } from '../../table/Table';
import './Renewe.css';
import DeleteIcon from '../../../assets/img/delete-icon.svg';
import EditIcon from '../../../assets/img/edit-icon.svg';
import DetailsIcon from '../../../assets/img/details-icon.svg';
import Btn from '../../btn/Btn';
import PlusIcon from '../../../assets/img/plus-icon.svg';
import { useState } from 'react';

export default function Renewe() {
    const [renewDetails, setReneweDetails] = useState(false);

    function redirectToAddRenewe() {
        window.open(`${window.location.origin}/loans/add-renewe`, '_blank');
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
            <button className="button-table" onClick={() => redirectToAddRenewe()}>
                <img src={DeleteIcon} alt="Borrar" />
            </button>
            )
        },
        {
            header: 'Editar',
            accessor: 'edit',
    
            render: (_, row) => (
            <button className="button-table"  onClick={() => setReneweDetails(true)}>
                <img src={EditIcon} alt="Editar" />
            </button>
            )
        },
        {
            header: 'Ver detalle',
            accessor: 'details',
            render: (_, row) => (
            <button className="button-table" onClick={() => window.open(`${window.location.origin}/loans/renewe-details`, '_blank')}>
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
                            <Btn text={'Nueva reserva'} icon={<img src={PlusIcon} alt={PlusIcon} onClick={() => redirectToAddRenewe()}/>}/>
                        </div>
                    </Table>
                </div>
              
                
            </div>
        </>
    )
}