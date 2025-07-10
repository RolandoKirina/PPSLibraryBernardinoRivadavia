
export default function Bookstable() {

    return(
    <>
        <div className='employee-form'>
            <form>
                <input type='text' className='input-form' placeholder='Nombre de usuario'/>
                <input type='text' className='input-form' placeholder='Nombre completo' />
                <input type='email' className='input-form' placeholder='Correo electronico'/>
                <input type='password' className='input-form' placeholder='Contraseña'/>
                <select>
                    <option value=''>Elige un rol</option>
                    <option value='admin'>Administrador</option>
                </select>
            

                <button className='register-button' type='button'>Registrarte</button>

                <a>¿ Ya tienes una cuenta ?</a>
            </form>
        </div>
    </>
    );
}