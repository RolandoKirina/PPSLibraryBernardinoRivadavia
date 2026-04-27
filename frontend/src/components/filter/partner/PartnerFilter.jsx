import { useEffect } from "react";
import "./PartnerFilter.css"

export default function PartnerFilter({ formData, onChange }) {

  return (
    <aside className="filter-aside">
      <div className="filter-form">
        <form onSubmit={(e) => e.preventDefault()}>
          <h3 className="titleh3">Filtro de socios</h3>
          <div className="form-input-group">
            <label htmlFor="sortBy">Ordenar por</label>
            <select
              id="sortBy"
              name="sortBy"
              value={formData.sortBy}
              onChange={onChange}
            >
              <option value="name">Nombre</option>
              <option value="surname">Apellido</option>
              <option value="partnerNumber">Número de Socio</option>
            </select>
          </div>

          <div className="form-input-group">
            <label htmlFor="direction">Dirección</label>
            <select
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={onChange}
            >
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>

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
            <label>Apellido</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={onChange}
              placeholder="Ej: Pérez"
            />
          </div>

          <div className="form-input-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Ej: Juan"
            />
          </div>

          <div className="form-input-group">
            <label>Número de socio</label>
            <input
              type="number"
              name="partnerNumber"
              min="0"
              value={formData.partnerNumber}
              onChange={onChange}
            />
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
