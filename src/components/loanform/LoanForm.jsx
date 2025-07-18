import './LoanForm.css';
import ClosePopupImg from '../../assets/img/close-popup-btn.svg';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import ToggleIcon from '../../assets/img/toggle-icon.svg';
import SaveIcon from '../../assets/img/save-icon.svg';
import { useState } from 'react';

export default function LoanForm({method, closeLoanForm}) {

    let inputMenusInitial = [
        { id: 1, active: false },
        { id: 2, active: false },
        { id: 3, active: false },
        { id: 4, active: false },
        { id: 5, active: false },
    ]

    const [inputMenus, setInputMenus] = useState(inputMenusInitial);


    function toggleDrowMenu(id) {
        const updatedMenus = inputMenus.map(menu => 
            menu.id === id ? {...menu, active: !menu.active } : menu
        )
        setInputMenus(updatedMenus);
    }

    function handleCloseLoanForm() {
        closeLoanForm();
    }

    return (
        <>
            {method==='add' &&
                    <>  
                    <div className='add-loan-form-container'>   
                        <div className='add-loan-form-title'>
                            <h2>Añadir Prestamo</h2>
                            <button className='add-loan-form-close-btn' onClick={handleCloseLoanForm}><img src={ClosePopupImg}/></button>
                        </div>
                        <div className='add-loan-form-content'>
                          <form>
                                    <div className='add-loan-form-inputs'>
                                        <div>
                                            <h4>Tipo de Prestamo</h4>
                                            <div>
                                                <label>
                                                <input type='radio'/>
                                                En sala
                                                </label>
                                                <label>
                                                    <input type='radio'/>
                                                    Retirado
                                                </label>
                                            </div>
                                        </div>
                                        <div className='add-loan-code-employee'>
                                            <label>Codigo Empleado</label>
                                            <input type='number'/>
                                        </div>
                                        <div className='add-loan-retire-date'>
                                            <label>Fecha de retiro</label>
                                            <input type='date'/>
                                        </div>
                                        
                                    </div>
                                    <SearchPartner />
                                    <LendBooks />
                            </form>
                        </div> 
                     </div>
                    </>
                 }     
                {method==='update' && 
                    <>
                    <div className='edit-loan-form-container'>  
                        <div className='edit-loan-form-title'>
                            <h2>Editar Prestamo</h2>
                            <button className='edit-loan-form-close-btn' onClick={handleCloseLoanForm}><img src={ClosePopupImg}/></button>
                        </div>
                        <div className='edit-loan-form-content'>
                          <form>
                            <div className='edit-loan-form-inputs'>
                                <div className='edit-fields-loan'>
                                    <div>
                                            <div className="edit-field-input">
                                                <label>Fecha de Retiro</label>
                                                <input type="date" name="date_out" />
                                            </div>

                                            <div className="edit-field-input">
                                            <label>Fecha Prevista</label>
                                            <input type="date" name="expected_return" />
                                            </div>

                                            <div className="edit-field-input">
                                            <label>Fecha de Devolución</label>
                                            <input type="date" name="actual_return" />
                                            </div>

                                            <div className="edit-field-input">
                                            <label>Empleado Responsable</label>
                                            <input type="text" name="employee" />
                                            </div>
                                    </div>
                                </div>

                                <div className='save-edits'>
                                    <div className='save-changes-lend-books'>
                                        <button><img src={SaveIcon}/><a href='/save' target='_blank'>Guardar</a></button>
                                    </div>
                                </div>
                                
                            </div>
                        
                            
                        </form>
                      </div>
                    </div>
                </>}
        
        </>
    )
}