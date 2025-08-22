import './LoginSection.css';
import GenericSection from '../../../components/generic/GenericSection/GenericSection';
import Btn from '../../../components/btn/Btn';
import Logo from '../../../assets/img/logo_biblioteca_rivadavia.svg';
import { authMock } from '../../../data/mocks/authMock';

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
                            <div className='login-title'>
                                <h2>Bienvenido a Biblioteca Rivadavia</h2>
                            </div>
                            <div className='login-info'>
                                <p>Accedé al catálogo, gestioná tus préstamos y descubrí todo lo que la biblioteca tiene para ofrecer</p>
                                <p className='haveAccount'>¿Aún no sos parte? <a href='/employee/register'>Crea tu cuenta en segundos</a></p>
                                <div className='login-info-img'>
                                    <img src={Logo} alt='books'/>
                                </div>
                            </div>
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
                            </form>

                        </div>
                    </div> 


                </div>
            </GenericSection>
        </>
    )
}