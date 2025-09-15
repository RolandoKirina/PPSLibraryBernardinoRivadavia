import './LoginSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { authMock } from '../../data/mocks/authMock';
import { Link } from 'react-router-dom';

export default function LoginSection() {
    if (authMock.isAuthenticated) {
        window.location.href = '/options';
        return null;
    }

    return (
        <>
            <GenericSection title={'Ingresar'}>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='login-presentation'></div>
                        <div className='login-form'>
                            <div className='login-form-title'>
                                <h3>Iniciar sesión</h3>
                            </div>
                            <form>
                                <div className="input">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input id="email" type="email" placeholder="Correo eléctronico" />
                                </div>
                                <div className="input">
                                    <label htmlFor="password">Contraseña</label>
                                    <input id="password" type="password" placeholder="Contraseña" />
                                </div>
                                <Btn variant={'primary'} text={'Ingresar'} onClick={() => window.location.href = '/'} />
                                <div className='no-account-msg'>
                                    <Link to='/register'>
                                        ¿No tienes una cuenta creada? <span>Registrate</span>
                                    </Link>
                                </div>
                            </form>

                        </div>
                    </div>


                </div>
            </GenericSection>
        </>
    )
}