import './LoginSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { authMock } from '../../data/mocks/authMock';

export default function LoginSection() {
    if(authMock.isAuthenticated) {
        window.location.href = '/options';
        return null;       
    }

    return (
        <>
            <GenericSection title={'Ingresar'}>
                <div className='login-container'>
                     <div className='login-content'>
                        <div className='login-presentation'>
                            {/* <div className='login-info'>
                                <p>Accedé al catálogo, gestioná tus préstamos y descubrí todo lo que la biblioteca tiene para ofrecer</p>
                           
                            </div>
                            <div className='login-register-msg'>
                                <h3>¿No tienes una cuenta creada?</h3>
                                <Btn variant={'primary'} text={'Registrarte'}/>
                            </div>  */}
                        </div>
                        <div className='login-form'>
                            <div className='login-form-title'>
                                <h3>Iniciar sesión</h3>
                            </div>
                            <form>
                                <div className="input">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input id="email" type="email" placeholder="Correo eléctronico"/>
                                </div>
                                <div className="input">
                                    <label htmlFor="password">Contraseña</label>
                                    <input id="password" type="password" placeholder="Contraseña"/>
                                </div>
                                <Btn variant={'primary'} text={'Ingresar'} onClick={() => window.location.href = '/dashboard'}/>
                                <div className='no-account-msg'>
                                    <a href='/register'>¿No tienes una cuenta creada? <span>Registrate</span></a>
                                </div>
                            </form>

                        </div>
                    </div> 


                </div>
            </GenericSection>
        </>
    )
}