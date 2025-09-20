import './LoginSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';
import { authMock } from '../../data/mocks/authMock';
import { Link } from 'react-router-dom';
import { useContext, useState} from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginSection() {

    const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

const navigate = useNavigate();
      const { auth, login } = useContext(AuthContext);
    if (auth.isAuthenticated) {
        navigate('/options');
        return null;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        login({ name: email, role: 'reader' }); // o 'admin'
        
    };

    return (
        <>
            <GenericSection title={'Ingresar'}>
                <form className='login-container' onSubmit={handleSubmit}>
                    <div className='login-content'>
                        <div className='login-presentation'></div>
                        <div className='login-form'>
                            <div className='login-form-title'>
                                <h3>Iniciar sesión</h3>
                            </div>
                            <div>
                                <div className="input">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input id="email" type="email" placeholder="Correo eléctronico"   onChange={(e) => setEmail(e.target.value)}/>
                                </div>
                                <div className="input">
                                    <label htmlFor="password">Contraseña</label>
                                    <input id="password" type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}  />
                                </div>
                                <Btn  type="submit" variant={'primary'} text={'Ingresar'}  />
                                <div className='no-account-msg'>
                                    <Link to='/register'>
                                        ¿No tienes una cuenta creada? <span>Registrate</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    </div>


                </form>
            </GenericSection>
        </>


    )
}