import './LoanForm.css';
import ClosePopupImg from '../../assets/img/close-popup-btn.svg';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import ToggleIcon from '../../assets/img/toggle-icon.svg';


export default function LoanForm({method, closeLoanForm}) {
    function handleCloseLoanForm() {
        closeLoanForm();
    }

    function example() {
        alert("s");
    }

    return (
        <>
           <div className='add-loan-form-container'>          
                <div className='add-loan-form-title'>
                    {method==='add' ? <h2>Añadir Prestamo</h2> : <h2>Editar Prestamo</h2>}
                     <button className='add-loan-form-close-btn' onClick={handleCloseLoanForm}><img src={ClosePopupImg}/></button>
                </div>
                <div className='add-loan-form-content'>
                    <form>
                        {method==='add' && 
                            <>
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
                            </>
                        }
                        {method==='update' && 
                        <>
                            <div className='add-loan-form-inputs'>
                                <div className='edit-fields-loan'>
                                    <div>
                                        <div className='edit-fields-title'>
                                            <h4>Datos del Libro</h4>
                                            <button type='button' onClick={() => example()}>
                                                <img src={ToggleIcon}/>
                                            </button>
                                        </div>
                                        <div className='edit-field-inputs'>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='edit-fields-title'>
                                             <h4>Lector</h4>
                                            <button type='button' onClick={() => console.log("working")}>
                                                <img src={ToggleIcon}/>
                                            </button>
                                        </div>
                                        <div className='edit-field-inputs'>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='edit-fields-title'>
                                            <h4>Datos del Socio</h4>
                                            <button type='button' onClick={() => console.log("working")}>
                                                <img src={ToggleIcon}/>
                                            </button>
                                        </div>
                                        <div className='edit-field-inputs'>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='edit-fields-title'>
                                            <h4>Fechas del Prestamo</h4>
                                            <button type='button' onClick={() => console.log("working")}>
                                                <img src={ToggleIcon}/>
                                            </button>
                                        </div>
                                        <div className='edit-field-inputs'>

                                        </div>
                                    </div>
                                    <div>
                                        <div className='edit-fields-title'>
                                            <h4>Empleado Responsable</h4>
                                            <button type='button' onClick={() => console.log("working")}>
                                                <img src={ToggleIcon}/>
                                            </button>
                                        </div>
                                        <div className='edit-field-inputs'>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </>}
                        
                    </form>
                </div>
           </div>
        
        </>
    )
}