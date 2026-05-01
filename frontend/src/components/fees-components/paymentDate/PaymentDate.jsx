import { useState, useEffect } from 'react';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import './PaymentDate.css';
import { useAuth } from '../../../auth/AuthContext';

export default function PaymentDate() {
    const { auth } = useAuth();
    
    const [formData, setFormData] = useState({
        paymentDate: '',
    });
    const [loading, setLoading] = useState(false);
    // Cambiamos a string para guardar el texto del error o éxito
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchCurrentConfig = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/fee-configs/1', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                const data = await response.json();
                if (data.defaultPaymentDate) {
                    setFormData({ paymentDate: data.defaultPaymentDate });
                }
            } catch (error) {
                console.error("Error cargando configuración:", error);
                setError("No se pudo cargar la configuración inicial.");
            }
        };
        fetchCurrentConfig();
    }, [auth.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:4000/api/v1/fee-configs/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                // Enviamos la clave que el backend espera (defaultPaymentDate)
                body: JSON.stringify({ defaultPaymentDate: formData.paymentDate })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Configuración actualizada con éxito.");
            } else {
                // Si el backend manda un { msg: "..." }, lo usamos
                setError(data.msg || "Error al intentar actualizar.");
            }
        } catch (err) {
            console.error("Error en la petición:", err);
            setError("Error de conexión con el servidor.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pay-popup-content">
            <div className='unpaid-fees-grid'>
                <div className='unpaid-fee-input'>
                    <label>Fecha de pago por defecto</label>
                    <input
                        name="paymentDate"
                        type='date'
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <Btn
                type={'button'}
                variant={'primary'}
                text={loading ? 'Guardando...' : 'Guardar'}
                onClick={handleSave}
                disabled={loading}
                icon={<img src={SaveIcon} alt='saveIconButton' />}
            />

            {/* Mensajes de feedback dinámicos */}
            <div className="feedback-container" style={{ marginTop: '1rem', textAlign: 'center' }}>
                {error && (
                    <p style={{ color: '#ff4d4d', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {error}
                    </p>
                )}
                {message && (
                    <p style={{ color: '#2ecc71', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}