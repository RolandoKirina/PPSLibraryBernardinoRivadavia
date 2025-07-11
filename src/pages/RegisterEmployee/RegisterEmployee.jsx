import './RegisterEmployee.css'
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";

export default function RegisterEmployee() {
    return (
        <>
            <section className='employee-section'>
                <h2 className='form-title'>Crear Empleado</h2>
                <EmployeeForm/>
            </section>
        </>
    );
}