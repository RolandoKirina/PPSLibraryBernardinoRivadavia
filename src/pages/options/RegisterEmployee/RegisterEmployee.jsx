import './RegisterEmployee.css'
import EmployeeForm from "../../../components/EmployeeForm/EmployeeForm";

export default function RegisterEmployee({mode}) {
    return (
        <>
            <section className='employee-section'>
                <h2 className='form-title'>{mode === 'add' ? 'Crear Empleado' : 'Editar Información Empleado'}</h2>
                <EmployeeForm/>
            </section>
        </>
    );
}