import './RegisterSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { authMock } from '../../data/mocks/authMock';
import { Link } from 'react-router-dom';

export default function RegisterSection() {
    if(authMock.isAuthenticated) {
        window.location.href = '/options';
        return null;       
    }

    return (
  <>
    <GenericSection title={'Registrarse'}>
      <div className='register-container'>
        <div className='register-content'>
          <div className='register-presentation'></div>

          <div className='register-form'>
            <div className='register-form-title'>
              <h3>Crear cuenta</h3>
            </div>

            <form>
                <div className='register-inputs'>
                    <div className="input">
                        <label htmlFor="name">Nombre completo</label>
                        <input id="name" type="text" placeholder="Nombre completo" />
                    </div>

                    <div className="input">
                        <label htmlFor="email">Correo electrónico</label>
                        <input id="email" type="email" placeholder="Correo electrónico" />
                    </div>

                    <div className="input">
                        <label htmlFor="password">Contraseña</label>
                        <input id="password" type="password" placeholder="Contraseña" />
                    </div>
                </div>
              
              <Btn
                variant={'primary'}
                text={'Registrarse'}
                onClick={() => window.location.href = '/'}
              />

              <div className='already-account-msg'>
                <Link to='/login'>
                  ¿Ya tenés una cuenta? <span>Iniciar sesión</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GenericSection>
  </>
);

}