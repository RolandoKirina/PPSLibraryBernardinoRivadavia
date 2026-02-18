import './RegisterSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function RegisterSection() {
  const BASE_URL = "http://localhost:4000/api/v1/users";

  const navigate = useNavigate();

  const { auth, login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');

  if (auth.isAuthenticated) {
    navigate('/options');
    return null;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage('');

    if (formData.password !== formData.repeatPassword) {
      setErrorMessage('Las contraseñas deben coincidir');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      setErrorMessage('Debes completar todos los campos');
      return;
    }

    createUser();
  };

  async function createUser() {

    try {
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      }

      const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Error al crear");
      }

      setSucessMessage('Usuario creado correctamente!');

      setTimeout(() => {
        navigate('/login');
      }, [1000])
    }
    catch (error) {
      console.error('Error creating User: ' + error);
      setErrorMessage(error.msg);
    }

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

              <form onSubmit={handleSubmit}>
                <div className='register-inputs'>
                  <div className="input">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input">
                    <label htmlFor="repeat-password">Repetir Contraseña</label>
                    <input
                      id="repeatPassword"
                      type="password"
                      placeholder="Repetir Contraseña"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                    />
                  </div>

                </div>

                <Btn
                  type="submit"
                  variant={'primary'}
                  text={'Registrarse'}
                />

                {errorMessage && (
                  <p className='error-message'>{errorMessage}</p>
                )}

                {sucessMessage && (
                  <p className='sucess-message'>{sucessMessage}</p>
                )}

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
