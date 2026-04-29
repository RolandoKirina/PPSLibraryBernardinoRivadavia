import { useState, useEffect } from 'react';
import './PayPopup.css';

export default function PopUp({ item = {} }) {
    // Inicializamos el estado vacío para evitar errores de "controlled vs uncontrolled"
    const [formData, setFormData] = useState({
        paymentDate: '',
        amount: ''
    });

    // useEffect para cargar los datos del item cuando el componente se monta o cambia el item
    useEffect(() => {
        if (item && Object.keys(item).length > 0) {
            // Seteamos la fecha de hoy por defecto para el pago y el importe que viene del item
            const today = new Date().toISOString().split('T')[0];
            
            setFormData({
                paymentDate: today, 
                amount: item.amount || ''
            });
        }
    }, [item]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="pay-popup-content">
            <div className="pay-fee-info">
                <p><strong>Cuota:</strong> {item.month} {item.year}</p>
                <p><strong>Socio N°:</strong> {item.partnerNumber}</p>
            </div>

            <div className='unpaid-fees-grid'>
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
            </div>
            
            {/* Aquí irían tus botones de Confirmar / Cancelar usando formData */}
        </div>
    );
}