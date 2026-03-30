import './EmployeeForm.css';
import Btn from '../../common/btn/Btn';

export default function EmployeeForm({ method, createItem, updateItem, selected }) {

    function handleSubmit(e) {
        e.preventDefault();

        let employeeData = {
            username: e.target.username.value,
            fullname: e.target.fullname.value,
            email: e.target.email.value,
            password: e.target.password.value,
            rol: e.target.rol.value
        };

        if (method === 'add') {
            createItem(employeeData);
        }
        else if (method === 'update') {
            updateItem(selected.id, employeeData);
        }

    }

    return (
        <>
            <div className='employee-form'>
                <form onSubmit={handleSubmit}>
                    <div className='employee-div'>

                        <div className='employee-div-input input'>
                            <label htmlFor='fullname'>Nombre completo <span className='required'>*</span></label>
                            <input name='fullname' type='text' className='input-form' placeholder='Nombre completo' />
                        </div>
                    </div>
                    

                    <div className='form-button'>
                        <Btn variant={'primary'} type={'submit'} text={'Crear empleado'} />
                    </div>
                    {/* <div className='message'>
                <a>¿ Ya tienes una cuenta ?</a>
            </div> */}
                </form>
            </div>
        </>
    );
}