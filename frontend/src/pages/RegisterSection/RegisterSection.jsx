import './RegisterSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterSection() {


  const navigate = useNavigate();
  const { auth, login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (auth.isAuthenticated) {
    navigate('/options');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name, role: 'reader' });

  };

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

              <form onSubmit={handleSubmit}>
                <div className='register-inputs'>
                  <div className="input">
                    <label htmlFor="name">Nombre completo</label>
                    <input id="name" type="text" placeholder="Nombre completo"
                      onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="input">
                    <label htmlFor="email">Correo electrónico</label>
                    <input id="email" type="email" placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="input">
                    <label htmlFor="password">Contraseña</label>
                    <input id="password" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>

                <Btn
                  type="submit"
                  variant={'primary'}
                  text={'Registrarse'}

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