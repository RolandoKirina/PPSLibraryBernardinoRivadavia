import { useEffect } from "react";
import "./PartnerFilter.css"

export default function PartnerFilter({ formData, onChange }) {


console.log(formData)

  return (
    <aside className="filter-aside">
      <div className="filter-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="titleh3">Filtro de socios</h3>

          <div className="form-input-group">
            <h4>Estado del socio</h4>
            <select
              name="idState"
              value={formData.idState}
              onChange={onChange}
            >
              <option value="0">Todos</option>
              <option value="1">Activos</option>
              <option value="2">Inactivos</option>
            </select>
          </div>

          <div className="form-input-group">
            <label>Cuotas impagas</label>
            <input
              type="number"
              name="unpaidFees"
              min="0"
              max="15"
              value={formData.unpaidFees}
              onChange={onChange}
            />
          </div>

          <div className="form-input-group">
            <label>Libros pendientes</label>
            <input
              type="number"
              name="pendingBooks"
              min="0"
              max="15"
              value={formData.pendingBooks}
              onChange={onChange}
            />
          </div>
        </form>
      </div>
    </aside>
  );
}
