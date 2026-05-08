import { useState, useEffect } from 'react';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import './PayPopup.css';
import { useAuth } from '../../../auth/AuthContext';

export default function PayPopup({ item = {}, onSuccess }) {
    const { auth } = useAuth();

    const parseMonth = (month) => {
        if (!month) return '';

        if (typeof month === 'number') return month;

        const months = {
            enero: 1,
            febrero: 2,
            marzo: 3,
            abril: 4,
            mayo: 5,
            junio: 6,
            julio: 7,
            agosto: 8,
            septiembre: 9,
            setiembre: 9,
            octubre: 10,
            noviembre: 11,
            diciembre: 12
        };

        return months[month.toLowerCase()] || '';
    };

    const [formData, setFormData] = useState({
        paymentDate: '',
        amount: '',
        month: '',
        year: '',
        observation: ''
    });

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', msg: '' });

    useEffect(() => {
        const fetchData = async () => {
            let initialDate = new Date().toISOString().split('T')[0];

            try {
                const response = await fetch('http://localhost:4000/api/v1/fee-configs/1', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.defaultPaymentDate) {
                        initialDate = data.defaultPaymentDate.split('T')[0];
                    }
                }
            } catch (error) {
                console.error("Error cargando configuración:", error);
            }

            if (item && Object.keys(item).length > 0) {
                setFormData({
                    paymentDate: initialDate,
                    amount: item.amount || '',
                    month: parseMonth(item.month),
                    year: item.year || '',
                    observation: ''
                });
            }
        };

        fetchData();
    }, [item, auth.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePayment = async () => {
        setLoading(true);
        setStatus({ type: '', msg: '' });

        try {
            const response = await fetch(`http://localhost:4000/api/v1/fees/${item.feeid}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                },
                body: JSON.stringify({
                    date_of_paid: formData.paymentDate,
                    amount: formData.amount,
                    paid: true,
                    month: formData.month,
                    year: formData.year,
                    observation: formData.observation
                })
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Pago registrado con éxito' });

                // IMPORTANTE: Ejecutar el callback que definimos en el padre
                if (onSuccess) {
                    // Damos un breve respiro para que el usuario vea el mensaje de éxito
                    setTimeout(() => {
                        onSuccess();
                    }, 1000);
                }
            } else {
                setStatus({ type: 'error', msg: data.msg || 'Error al procesar el pago' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Error de conexión con el servidor' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pay-popup-content">
            <div className="pay-fee-info">
                <p><span>Cuota:</span> {item.month} {item.year}</p>
                <p><span>Socio N°:</span> {item.partnerNumber}</p>
            </div>

            <div className='unpaid-fees-grid'>
                <div className='unpaid-fee-input'>
                    <label>Mes</label>
                    <input
                        name="month"
                        type='number'
                        value={formData.month}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='unpaid-fee-input'>
                    <label>Año</label>
                    <input
                        name="year"
                        type='number'
                        value={formData.year}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='unpaid-fee-input'>
                    <label>Fecha de pago</label>
                    <input
                        name="paymentDate"
                        type='date'
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='unpaid-fee-input'>
                    <label>Importe a Cobrar ($)</label>
                    <input
                        name="amount"
                        type='number'
                        step="0.01"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='unpaid-fee-input'>
                    <label>Observación</label>
                    <input
                        name="observation"
                        type='text'
                        placeholder="Opcional..."
                        value={formData.observation}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            {status.msg && (
                <p className={`status-msg ${status.type}`} style={{
                    color: status.type === 'success' ? '#2ecc71' : '#e74c3c',
                    textAlign: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    margin: '10px 0'
                }}>
                    {status.msg}
                </p>
            )}

            <div className='pay-popup-button'>
                <Btn
                    type={'button'}
                    variant={'primary'}
                    text={loading ? 'Procesando...' : 'Guardar Pago'}
                    onClick={handlePayment}
                    disabled={loading}
                    icon={<img src={SaveIcon} alt='saveIconButton' />}
                />
            </div>
        </div>
    );
}