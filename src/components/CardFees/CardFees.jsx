import { paidFees } from '../../data/mocks/fees.js';
import { unpaidFees } from '../../data/mocks/fees.js';
import { newFees } from '../../data/mocks/fees.js';
import Btn from '../btn/Btn.jsx';
import './CardFees.css';
import { useState } from 'react';
export default function CardFees (){

     const [selectedId, setSelectedId] = useState(null);

    return (
        <div className='cardfees-container'>
           
            <div className='cardfee'>
                <div className='title-fee'>
                 <h2>Cuotas pagadas</h2>

                </div>

                <div className='container-form-fee'>
                    <div className='form-fee'>
                    <label htmlFor="partner">Buscar por nombre de socio</label>
                    <input text="text" name="partner"></input> 

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
                   
              
                    {paidFees.map((fee,index) => (
                    <li key={index} className='fee'> 
                    
                       <p><strong>Socio:</strong> {fee.id}</p>
                       <p><strong>Monto:</strong> {fee.amount}</p>
                       <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                                    
                    </li>


                    ))}
                </ul>
            </div>
           
         <div className='cardfee'>
                <div className='title-fee'>
                 <h2>Cuotas impagas</h2>

                </div>
                 
                <ul className='info-fee'>
                   
              
                   {unpaidFees.map((fee, index) => (
                    <div 
                        key={index} 
                        className={`fee ${selectedId === fee.id ? "selected" : ""}`}
                        onClick={() => setSelectedId(fee.id)}
                    >
                        <p><strong>Socio:</strong> {fee.id}</p>
                        <p><strong>Monto:</strong> {fee.amount}</p>
                        <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                    </div>
                    ))}
                </ul>
                <Btn text="Pagar cuota" variant="primary"></Btn>
            </div>
          

        <div className='cardfee'>
                <div className='title-fee'>
                 <h2>Cuotas nuevas</h2>

                </div>
                 
                <ul className='info-fee'>
                   
              
                    {newFees.map((fee,index) => (
                    <li key={index} className='fee'> 
                    
                       <p><strong>Socio:</strong> {fee.id}</p>
                       <p><strong>Monto:</strong> {fee.amount}</p>
                       <p><strong>Fecha:</strong> {fee.date_of_paid}</p>
                                    
                    </li>


                    ))}
                </ul>
                
            </div>


        </div>



        )
}