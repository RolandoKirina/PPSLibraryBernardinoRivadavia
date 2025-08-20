import { paidFees } from '../../data/mocks/fees.js';
import { unpaidFees } from '../../data/mocks/fees.js';
import { newFees } from '../../data/mocks/fees.js';
import Btn from '../btn/Btn.jsx';
import './CardFees.css';
import { useState } from 'react';

export default function CardFees() {
    //tuve que poner un use state de los arreglos porque modificarlos directamente no permite la re renderizacion de los componentes
    
    const [unpaidFeeList, unsetPaidFeeList] = useState([...unpaidFees]);
    const [paidFeeList, setPaidFeeList] = useState([...paidFees]);
    const [newFeeList, setNewFeeList] = useState([...newFees]);
    const [selectedUnpaidId, setSelectedUnpaidId] = useState(null);
    const [selectedNewId, setSelectedNewId] = useState(null);
  function payfee(id) {
    if (!id) return;

    const index = newFeeList.findIndex(obj => obj.id === id);
    if (index !== -1) {
        const removedObject = newFeeList[index];

        // Actualizar listas
        setNewFeeList(prev => prev.filter(fee => fee.id !== id));
        setPaidFeeList(prev => [...prev, removedObject]);
       
    }
}
    return (
        <div className='cardfees-container'>

            {/* Cuotas Pagadas */}
            <div className='cardfee'>
                <div className='title-fee'>
                    <h2>Cuotas pagadas</h2>
                </div>

                <div>
                    <div className='form-fee'>
                        <label htmlFor="partner">Buscar por nombre de socio</label>
                        <input type="text" name="partner" />
                    </div>
                    <div className='form-fee'>
                        <label htmlFor="date">Buscar por fecha de cuota</label>
                        <input
                            type="date"
                            id="datefilter"
                            name="datefilter"
                        />
                    </div>
                </div>

                <ul className='info-fee'>
                    {paidFeeList.map((fee, index) => (
                        <li key={index} className='fee'>
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cuotas Impagas */}
            <div className='cardfee'>
                <div className='title-fee'>
                    <h2>Cuotas impagas</h2>
                </div>

                <ul className='info-fee'>
                    {unpaidFees.map((fee, index) => (
                        <li
                            key={index}
                            className={`fee ${selectedUnpaidId === fee.id ? "selected" : ""}`}
                            onClick={() => setSelectedUnpaidId(fee.id)}
                        >
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    ))}
                </ul>

                <Btn
                text="Pagar cuota"
                variant="primary"
                onClick={() => console.log("Pagar cuota impaga:", selectedUnpaidId)}
                />
            </div>

            {/* Cuotas Nuevas */}
            <div className='cardfee'>
                <div className='title-fee'>
                    <h2>Cuotas nuevas</h2>
                </div>
            
                <ul className='info-fee'>
                    {newFeeList.map((fee, index) => (
                       <li
                            key={index}
                            className={`fee ${selectedNewId === fee.id ? "selected" : ""}`}
                            onClick={() => setSelectedNewId(fee.id)}
                        >
                            <p><strong>Socio:</strong> {fee.id}</p>
                            <p><strong>Monto:</strong> {fee.amount}</p>
                            <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                        </li>
                    ))}
                </ul>

                <Btn text="Pagar cuota" variant="primary" className="btnpay" onClick={() => payfee(selectedNewId)} 
                    
                    disabled={!selectedNewId || newFeeList.length === 0}/>
            </div>
        </div>
    );
}
