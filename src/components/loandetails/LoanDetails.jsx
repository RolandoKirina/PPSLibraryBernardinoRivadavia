import './LoanDetails.css';
import ClosePopupImg from '../../assets/img/close-popup-btn.svg';
import { useState } from 'react';
import ToggleIcon from '../../assets/img/toggle-icon.svg';

export default function LoanDetails({closePopup}) {

    let detailsInfo = [
        {
            id: 1,
            title: 'Datos del Libro',
            active: false
        },
        {
            id: 2,
            title: 'Lector',
            active: false
        },
         {
            id: 3,
            title: 'Datos del Socio',
            active: false
        },
         {
            id: 4,
            title: 'Fechas del Prestamo',
            active: false
        },
         {
            id: 5,
            title: 'Empleado Responsable',
            active: false
        },
    ]

    const [detailsMenus, setDetailsMenus] = useState(detailsInfo);

    function toggleDrowMenu(id) {
        const updatedMenus = detailsMenus.map(menu => 
            menu.id === id ? {...menu, active: !menu.active } : menu
        )
        setDetailsMenus(updatedMenus);
    }


    function handleClosePopup() {
        closePopup();
    }

    return (
        <>
            <div className='loan-details-container'>
                <div className='loan-details-title'>
                    <h2>Detalles del Prestamo</h2>
                    <button className='loan-details-close-btn' onClick={handleClosePopup}><img src={ClosePopupImg}/></button>
                </div>
                <div className='loan-details-content'>
                    <div className='dropdown-details-menu'>
                         <div className='loan-dropdown-title'>
                            <h4>{detailsMenus[0].title}</h4>
                            <button type='button' onClick={() => toggleDrowMenu(1)}>
                                <img src={ToggleIcon}/>
                            </button>
                        </div>
                        {detailsMenus[0].active && 
                            <div className='detailsInfoMenu'>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Codigo de Libro</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Título</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Descripción</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='dropdown-details-menu'>
                         <div className='loan-dropdown-title'>
                            <h4>{detailsMenus[1].title}</h4>
                            <button type='button' onClick={() => toggleDrowMenu(2)}>
                                <img src={ToggleIcon}/>
                            </button>
                        </div>
                        {detailsMenus[1].active && 
                            <div className='detailsInfoMenu'>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Nombre</h4>
                                        <p>información</p>
                                    </div>
                                    <div className='item-details'>
                                        <h4>DNI</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Número de Socio</h4>
                                        <p>información</p>
                                    </div>
                                    <div className='item-details'>
                                        <h4>Telefono</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Dirección</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='dropdown-details-menu'>
                         <div className='loan-dropdown-title'>
                            <h4>{detailsMenus[2].title}</h4>
                            <button type='button' onClick={() => toggleDrowMenu(3)}>
                                <img src={ToggleIcon}/>
                            </button>
                        </div>
                        {detailsMenus[2].active && 
                            <div className='detailsInfoMenu'>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Número de Socio</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Nombre</h4>
                                        <p>información</p>
                                    </div>
                                    <div className='item-details'>
                                        <h4>Apellido</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='dropdown-details-menu'>
                         <div className='loan-dropdown-title'>
                            <h4>{detailsMenus[3].title}</h4>
                            <button type='button' onClick={() => toggleDrowMenu(4)}>
                                <img src={ToggleIcon}/>
                            </button>
                        </div>
                        {detailsMenus[3].active && 
                            <div className='detailsInfoMenu'>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Fecha de Retiro</h4>
                                        <p>informacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformación</p>
                                    </div>
                                    <div className='item-details'>
                                        <h4>Hora de Retiro</h4>
                                        <p>informacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformacióninformación</p>
                                    </div>
                                </div>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Fecha Prevista</h4>
                                        <p>información</p>
                                    </div>
                                    <div className='item-details'>
                                        <h4>Fecha Devolución</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                    <div className='dropdown-details-menu'>
                         <div className='loan-dropdown-title'>
                            <h4>{detailsMenus[4].title}</h4>
                            <button type='button' onClick={() => toggleDrowMenu(5)}>
                                <img src={ToggleIcon}/>
                            </button>
                        </div>
                        {detailsMenus[4].active && 
                            <div className='detailsInfoMenu'>
                                <div className='items-info-details'>
                                    <div className='item-details'>
                                        <h4>Empleado</h4>
                                        <p>información</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                   
                </div>
            </div>
        </>
    )
}