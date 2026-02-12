import './LoginSection.css';
import GenericSection from '../../components/generic/GenericSection/GenericSection';
import Btn from '../../components/common/btn/Btn';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginSection() {
    const BASE_URL = "http://localhost:4000/api/v1/users";

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { auth, login } = useAuth();

    const [errorMessage, setErrorMessage] = useState('');
    const [sucessMessage, setSucessMessage] = useState('');

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

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

        if (!formData.email || !formData.password) {
            setErrorMessage('Debes completar todos los campos');
            return;
        }

        loginUser();
    };

    async function loginUser() {

        try {
            const user = {
                email: formData.email,
                password: formData.password
            }

            const res = await fetch(`${BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await res.json();

            console.log(data); //trae el token

            if (!res.ok) {
                throw new Error(data.msg || "Error al ingresar");
            }

            setSucessMessage('Usuario logueado correctamente!');

            // setTimeout(() => {
            //     navigate('/');
            // }, [1000])
        }
        catch (error) {
            console.error('Error logging User: ' + error);
            setErrorMessage(error.msg);
        }

    }

    return (
        <>
            <GenericSection title={'Ingresar'}>
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
                                </div>

                                <Btn
                                    type="submit"
                                    variant={'primary'}
                                    text={'Ingresar'}
                                />

                                {errorMessage && (
                                    <p className='error-message'>{errorMessage}</p>
                                )}

                                {sucessMessage && (
                                    <p className='sucess-message'>{sucessMessage}</p>
                                )}

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
    );
}
