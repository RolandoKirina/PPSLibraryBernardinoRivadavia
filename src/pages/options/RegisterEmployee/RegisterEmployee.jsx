import './RegisterEmployee.css'
import EmployeeForm from "../../../components/EmployeeForm/EmployeeForm";
import PopUp from '../../../components/popup-table/PopUp2';

export default function RegisterEmployee({mode}) {
    return (
        <>
            <section className='employee-section'>
                <h2 className='form-title'>{mode === 'add' ? 'Crear Empleado' : 'Editar Información Empleado'}</h2>               
                <PopUp className={'form-employee-size'}>
                    <EmployeeForm/>
                </PopUp>
            </section>
        </>
    );
}