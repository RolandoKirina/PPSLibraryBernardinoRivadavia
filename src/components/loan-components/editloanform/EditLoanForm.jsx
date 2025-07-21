import './EditLoanForm.css';
import SaveIcon from '../../../assets/img/save-icon.svg';
import Btn from '../../btn/Btn';

export default function EditLoanForm() {
    return (
        <>
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
                            
                                {/* <button><img src={SaveIcon}/>Guardar</button> */}
                                <Btn text={'Guardar'} icon={<img src={SaveIcon} alt="Guardar"/>} className={'save-changes'}/>
                            
                        </div>
                        
                    </div>
                
                    
                </form>
            </div>
        </>
    )
}