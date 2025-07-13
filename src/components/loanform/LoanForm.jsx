import './LoanForm.css';
import ClosePopupImg from '../../assets/img/close-popup-btn.svg';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';

export default function LoanForm({closeLoanForm}) {
    function handleCloseLoanForm() {
        closeLoanForm();
    }

    return (
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
    )
}