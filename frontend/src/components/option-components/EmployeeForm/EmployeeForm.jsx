import './EmployeeForm.css';
import Btn from '../../common/btn/Btn';

export default function EmployeeForm({ method, createItem, updateItem, selected }) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.username);
        console.log(e.target.fullname.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        console.log(e.target.rol.value);

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
                            <label htmlFor='username'>Nombre de usuario <span className='required'>*</span></label>
                            <input name='username' type='text' className='input-form' placeholder='Nombre de usuario' />
                        </div>
                        <div className='employee-div-input input'>
                            <label htmlFor='fullname'>Nombre completo <span className='required'>*</span></label>
                            <input name='fullname' type='text' className='input-form' placeholder='Nombre completo' />
                        </div>
                    </div>
                    <div className='employee-div'>
                        <div className='employee-div-input input'>
                            <label htmlFor='email'>Correo electronico <span className='required'>*</span></label>
                            <input name='email' type='text' className='input-form' placeholder='Correo electronico' />
                        </div>
                        <div className='employee-div-input input'>
                            <label htmlFor='password'>Contraseña <span className='required'>*</span></label>
                            <input name='password' type='password' className='input-form' placeholder='Contraseña' />
                        </div>
                    </div>

                    <div className='employee-div-select input'>
                        <label htmlFor='rol'>Elige un rol <span className='required'>*</span></label>
                        <select name='rol'>
                            <option value=''>Elige un rol</option>
                            <option value='admin'>Administrador</option>
                        </select>
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