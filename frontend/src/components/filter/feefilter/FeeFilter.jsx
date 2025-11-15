import "./feefiltercheckbox.css";
import { useState, useEffect} from "react";
export default function BookFilter({formData, onChange}) {

  const [paidFeeCount, setPaidFeeCount] = useState(null);
  
 const fetchPaidFees = async () => {
  try {
    const response = await fetch(`http://localhost:4000/api/v1/fees/paid-count?partnerNumber=${formData.partnerNumber}`);
    const data = await response.json();
    if (response.ok) {
      setPaidFeeCount(data.count);
    } else {
      setPaidFeeCount(null);
    }
  } catch {
    setPaidFeeCount(null);
  }
};

useEffect(() => {
  if (formData.partnerNumber) {
    fetchPaidFees();
  } else {
    setPaidFeeCount(0);
  }
}, [formData.partnerNumber]);

console.log(paidFeeCount)
  return (
    <aside className="book-filter-aside">


      <div className="book-filter-form">

        <form>

          <h3 className='titleh3'>Filtro de socios</h3>

          <div className="book-form-input-group">

            <div className="feefiltercheckbox">
              <input type="checkbox"  name="unpaidfees" 
              checked={formData.unpaidfees} onChange={(e) =>
                  onChange({
                    target: {
                      name: e.target.name,
                      value: e.target.checked,
                    },
                  })}/>
              <label> Solo socios con cuotas impagas </label>
            </div>

          </div>

          <div className="book-form-input-group">
            <label>Buscar por numero de socio </label>
            <input type="number"  name="partnerNumber" min="0" value={formData.partnerNumber} onChange={onChange}/>
          </div>

          <div className="book-form-input-group">
              <label>Buscar por nombre </label>
              <input type="text"  name="name" value={formData.name} onChange={onChange}/>
            </div>

            
          <div className="book-form-input-group">
            <label>Buscar por apellido </label>
            <input type="text"  name="surname"value={formData.surname} onChange={onChange}/>
          </div>

          <div className="book-form-input-group">
            <label className="color-secondary"> Cantidad de cuotas pagas: {paidFeeCount ?? 0}</label>
          </div>

          <div className="book-form-input-group">
            <label >Fecha de pago</label>
            <input type="date" name="paymentdate" value={formData.paymentdate} onChange={onChange}/>          
    
          </div>

        </form>
      </div>
    </aside>

  )
}