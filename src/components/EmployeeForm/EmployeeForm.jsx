import './EmployeeForm.css';

export default function EmployeeForm() {

    return(
    <>
     <div className='employee-form'>
        <form>
            <input type='text' className='input-form' placeholder='Nombre de usuario'/>
            <input type='text' className='input-form' placeholder='Nombre completo' />
            <input type='email' className='input-form' placeholder='Correo electronico'/>
            <input type='password' className='input-form' placeholder='Contraseña'/>
            <input type='text' className='input-form' placeholder='Elegir rol'/>
           

            <button className='register-button' type='button'>Registrarte</button>

            <a>¿ Ya tienes una cuenta ?</a>
        </form>
     </div>

    </>
    );
}