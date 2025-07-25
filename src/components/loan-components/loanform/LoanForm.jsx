import './LoanForm.css';
import SearchPartner from '../searchpartner/SearchPartner';
import LendBooks from '../lendbooks/LendBooks';
import { useState } from 'react';

export default function LoanForm() {
    const [loanType, setLoanType] = useState('in_room');

    return (
        <>      
            <div className='add-loan-form-content'>
                <form>
                        <div className='add-loan-form-inputs'>
                            <div>
                                <h4>Tipo de Prestamo</h4>
                                <div>
                                    <label>
                                    <input type='radio' name='laon-type' value={'in_room'} checked={loanType === 'in_room'}  onChange={(e) => setLoanType(e.target.value)}/>
                                    En sala
                                    </label>
                                    <label>
                                        <input type='radio' name='laon-type' value={'retired'} checked={loanType === 'retired'} onChange={(e) => setLoanType(e.target.value)}/>
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