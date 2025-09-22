import './LoginSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginSection() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { auth, login } = useAuth();


    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();
        login({ name: email, role: 'admin' });
        navigate('/');
    };

    return (
        <>
            <GenericSection title={'Ingresar'}>
                {/* <form className='login-container' onSubmit={handleSubmit}>
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


                </form> */}
                <div className='register-container'>
                    <div className='register-content'>
                        <div className='register-presentation'></div>

                        <div className='register-form'>
                            <div className='register-form-title'>
                                <h3>Iniciar sesión</h3>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className='register-inputs'>
                                    <div className="input">
                                        <label htmlFor="email">Correo electrónico</label>
                                        <input id="email" type="email" placeholder="Correo eléctronico" onChange={(e) => setEmail(e.target.value)} />
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