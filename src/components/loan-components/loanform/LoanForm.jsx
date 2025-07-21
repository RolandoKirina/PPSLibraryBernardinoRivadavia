import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';

export default function LoanForm() {
    return (
        <>      
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
                        <LendBooks method={'add'}/>
                </form>
            </div> 
                     
        </>
    )
}