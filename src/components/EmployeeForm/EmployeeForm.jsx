import './EmployeeForm.css';

export default function EmployeeForm() {

    function handleSubmit(e) { 
        e.preventDefault();
        console.log(e.target.username);
        console.log(e.target.fullname.value);
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        console.log(e.target.rol.value);

        let employeeDataInputs = { 
            username: e.target.username,
            fullname: e.target.fullname,
            email: e.target.email,
            password: e.target.password,
            rol: e.target.rol
        };

        const empties = Object.values(employeeDataInputs).filter((element) => element.value === '');
        
       

        

    }

    return(
    <>
        <div className='employee-form'>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Nombre de usuario <span className='required'>*</span></label>
                <input name='username' type='text' className='input-form' placeholder='Nombre de usuario' />
                <label htmlFor='fullname'>Nombre completo <span className='required'>*</span></label>
                <input name='fullname' type='text' className='input-form' placeholder='Nombre completo' />
                <label htmlFor='email'>Correo electronico <span className='required'>*</span></label>
                <input name='email' type='text' className='input-form' placeholder='Correo electronico' />
                <label htmlFor='password'>Contraseña <span className='required'>*</span></label>
                <input name='password' type='password' className='input-form' placeholder='Contraseña' />
                <label htmlFor='rol'>Elige un rol <span className='required'>*</span></label>
                <select name='rol'>
                    <option value=''>Elige un rol</option>
                    <option value='admin'>Administrador</option>
                </select>
                <div className='form-button'>
                    <button className='register-button' type='submit'>Registrarte</button>
                </div>
                <div className='message'>
                    <a>¿ Ya tienes una cuenta ?</a>
                </div>
            </form>
        </div>
    </>
    );
}