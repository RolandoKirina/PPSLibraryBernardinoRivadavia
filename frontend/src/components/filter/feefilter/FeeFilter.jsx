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

 return (
    <aside className="book-filter-aside">
      <div className="book-filter-form">
        <form>
          <h3 className="titleh3">Filtro de socios</h3>

          <div className="book-form-input-group">
           <div className="feefiltercheckbox">
              <label htmlFor="status" className="feefiltercheckbox-label">
                Socios con cuotas
              </label>

              <select
                id="status"
                name="status"
                value={formData.status ?? ""}
                onChange={onChange}
                className="feefiltercheckbox-select"
              >
                <option value="">Todas</option>
                <option value="paid">Pagas</option>
                <option value="unpaid">Impagas</option>
              </select>
            </div>
          </div>

          <div className="book-form-input-group">
            <label>Fecha de pago</label>
            <input
              type="date"
              name="paymentdate"
              value={formData.paymentdate ?? ""}
              onChange={onChange}
              disabled={formData.status === "unpaid"} 
            />
          </div>

          <div className="book-form-input-group">
            <label>Buscar por número de socio</label>
            <input
              type="number"
              name="partnerNumber"
              min="0"
              value={formData.partnerNumber ?? ""}
              onChange={onChange}
            />
          </div>

          <div className="book-form-input-group">
            <label>Buscar por nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name ?? ""}
              onChange={onChange}
            />
          </div>

          <div className="book-form-input-group">
            <label>Buscar por apellido</label>
            <input
              type="text"
              name="surname"
              value={formData.surname ?? ""}
              onChange={onChange}
            />
          </div>

          <div className="book-form-input-group">
            <label className="color-secondary">
               Total de cuotas pagas del socio N° {formData.partnerNumber} = {paidFeeCount ?? 0}
            </label>
          </div>
        </form>
      </div>
    </aside>
  );
}